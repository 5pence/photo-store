from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Cart


class ClearCartView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        """Clears all items from the user's cart in the database."""
        cart = Cart.objects.filter(user=request.user).first()

        if cart:
            cart.items.all().delete()  # ✅ Remove all cart items
            return Response({"message": "Cart cleared successfully"}, status=200)

        return Response({"message": "Cart already empty"}, status=200)
