from rest_framework import serializers
from .models import Category, Product, ProductImage
from .models import Cart, CartItem, Order, OrderItem


# Category Serializer
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']


# Product Image Serializer (for multiple images)
class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'alt_text']


# Product Serializer
class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()  # Nested category details
    images = ProductImageSerializer(
        many=True, read_only=True)  # Fetch multiple images

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'category', 'product_type',
            'description', 'price', 'available', 'created_at', 'updated_at',
            'images'
        ]


class CartItemSerializer(serializers.ModelSerializer):
    cart_item_id = serializers.IntegerField(source='id', read_only=True)
    product_name = serializers.ReadOnlyField(source="product.name")
    product_price = serializers.ReadOnlyField(source="product.price")
    total_price = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ["cart_item_id", "product", "product_name", "product_price",
                  "quantity", "total_price", "image"]

    def get_total_price(self, obj):
        return obj.get_total_price()

    def get_image(self, obj):  # ✅ Return only one image
        first_image = obj.product.images.first()
        return first_image.image.url if first_image else None


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ["id", "user", "items", "created_at"]

    def clear_cart(self):
        """Helper method to clear all cart items."""
        self.instance.items.all().delete()  # ✅ Deletes all items in the cart
        return {"message": "Cart cleared successfully"}


class OrderItemSerializer(serializers.ModelSerializer):
    """ Serializer for Order Items """
    product = ProductSerializer()

    class Meta:
        model = OrderItem
        fields = ["id", "order", "product", "price", "quantity"]
        # ID and price should not be manually set
        read_only_fields = ["id", "order", "price"]


class OrderSerializer(serializers.ModelSerializer):
    """ Serializer for Orders """
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ["id", "user", "total_price", "payment_status",
                  "created_at", "items"]
        read_only_fields = ["id", "user",
                            "total_price", "created_at"]
