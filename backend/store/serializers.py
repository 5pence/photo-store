from rest_framework import serializers
from .models import Category, Product, ProductImage


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
            'description', 'price', 'available', 'created_at', 'updated_at', 'images'
        ]
