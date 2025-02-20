from rest_framework import generics
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer


# Category List View (GET All Categories)
class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


# Product List View (GET All Products)
class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
