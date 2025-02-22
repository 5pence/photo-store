import json
import stripe
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.contrib.auth import get_user_model
from .models import Order, Cart

User = get_user_model()
stripe.api_key = settings.STRIPE_SECRET_KEY


@csrf_exempt
def stripe_webhook(request):
    print("HELLO!")
    payload = request.body
    sig_header = request.META.get("HTTP_STRIPE_SIGNATURE")
    event = None

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except ValueError as e:
        print("⚠️ Invalid payload:", e)
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError as e:
        print("⚠️ Invalid signature:", e)
        return HttpResponse(status=400)

    print(f"🚀 Received event: {event['type']}")

    # ✅ Handle successful checkout
    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        print(f"🚀 Full session data:\n{json.dumps(session, indent=2)}")

        # Get email from session or customer details
        customer_email = session.get("customer_email")
        if not customer_email:
            customer_email = session.get("customer_details", {}).get("email")

        user_id = session.get("metadata", {}).get("user_id")

        print(
            f"🔍 Searching for pending order for email: {customer_email} or user_id: {user_id}")

        order = None
        if user_id:
            order = Order.objects.filter(
                user_id=user_id, payment_status="pending").first()
        elif customer_email:
            order = Order.objects.filter(
                user__email=customer_email, payment_status="pending").first()

        if order:
            print(f"✅ Order {order.id} found! Marking as PAID.")
            order.payment_status = "paid"
            order.save()

            # ✅ Clear cart after successful payment
            cart = Cart.objects.filter(user=order.user).first()
            if cart:
                print(f"🛒 Clearing cart for user {order.user}")
                cart.items.all().delete()
                cart.save()
        else:
            print("⚠️ No pending order found for this user.")

    # ✅ Handle expired checkout
    elif event["type"] == "checkout.session.expired":
        session = event["data"]["object"]
        customer_email = session.get("customer_email")

        if not customer_email and session.get("customer"):
            try:
                stripe_customer = stripe.Customer.retrieve(session["customer"])
                customer_email = stripe_customer.get("email")
            except stripe.error.InvalidRequestError:
                print("⚠️ Could not retrieve customer email from Stripe.")

        print(f"🚫 Checkout expired for: {customer_email}")

        if not customer_email:
            print("⚠️ No customer email found, cannot clear cart.")
            return HttpResponse(status=400)

        # ✅ Find and clear the user's cart
        user_cart = Cart.objects.filter(user__email=customer_email).first()
        if user_cart:
            print(
                f"🗑️ Clearing cart for user {customer_email} due to checkout cancellation.")
            user_cart.items.all().delete()  # ✅ Remove items from backend
            user_cart.save()

    return HttpResponse(status=200)
