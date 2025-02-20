import stripe
from django.conf import settings
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Category, Product, Cart, CartItem, Order, OrderItem
from .serializers import CategorySerializer, OrderSerializer, ProductSerializer
from .serializers import CartSerializer, CartItemSerializer


stripe.api_key = settings.STRIPE_SECRET_KEY


# Category List View (GET All Categories)
class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


# Product List View (GET All Products)
class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class CartDetailView(generics.RetrieveAPIView):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        cart, created = Cart.objects.get_or_create(user=self.request.user)
        return cart


class AddToCartView(generics.CreateAPIView):
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        cart, created = Cart.objects.get_or_create(user=request.user)
        product_id = request.data.get("product_id")
        quantity = int(request.data.get("quantity", 1))

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response(
                {"error": "Product not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        cart_item, created = CartItem.objects.get_or_create(
            cart=cart, product=product,
            defaults={"quantity": quantity}
        )

        if not created:
            cart_item.quantity = quantity
            cart_item.save()

        return Response(CartSerializer(cart).data, status=status.HTTP_200_OK)


class RemoveFromCartView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        cart, created = Cart.objects.get_or_create(user=request.user)
        product_id = request.data.get("product_id")

        try:
            cart_item = CartItem.objects.get(cart=cart, product_id=product_id)
            cart_item.delete()
            return Response({"message": "Item removed from cart"},
                            status=status.HTTP_200_OK)
        except CartItem.DoesNotExist:
            return Response({"error": "Item not found in cart"},
                            status=status.HTTP_404_NOT_FOUND)


class CreateCheckoutSession(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        cart_items = request.data.get("cart", [])

        if not cart_items:
            return Response({"error": "Cart is empty"}, status=400)

        # Create order
        order = Order.objects.create(user=user, total_price=0)

        line_items = []
        total_price = 0

        for item in cart_items:
            product = Product.objects.get(id=item["id"])
            order_item = OrderItem.objects.create(
                order=order, product=product, quantity=item["quantity"],
                price=product.price
            )
            total_price += product.price * item["quantity"]

            line_items.append({
                "price_data": {
                    "currency": "gbp",
                    "product_data": {
                        "name": product.name,
                    },
                    "unit_amount": int(product.price * 100),
                },
                "quantity": item["quantity"],
            })

        order.total_price = total_price
        order.save()

        checkout_session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=line_items,
            mode="payment",
            success_url="http://localhost:5173/checkout/success",
            cancel_url="http://localhost:5173/checkout/cancel",
        )

        return Response(
            {"id": checkout_session.id, "url": checkout_session.url})


class ConfirmOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user

        try:
            # ✅ Get the most recent unpaid order and mark as paid
            order = Order.objects.filter(
                user=user, payment_status="pending").latest("created_at")
            order.payment_status = "paid"
            order.save()

            # ✅ Clear the cart after payment
            cart = Cart.objects.filter(user=user).first()
            if cart:
                cart.items.all().delete()  # ✅ Remove all cart items
                cart.save()

            return Response({"message": "Order confirmed and cart cleared!"}, status=200)

        except Order.DoesNotExist:
            return Response({"error": "No pending order found"}, status=404)


# Fetch all orders for the logged-in user
class UserOrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(
            user=self.request.user).order_by('-created_at')


# Fetch details for a specific order
class OrderDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, order_id):
        try:
            order = Order.objects.get(id=order_id, user=request.user)
            serializer = OrderSerializer(order)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Order.DoesNotExist:
            return Response(
                {"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)
