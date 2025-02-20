from django.contrib import admin
from .models import Category, Product, ProductImage


class ProductImageInline(admin.TabularInline):  # Inline for Product Images
    model = ProductImage
    extra = 1  # Allows adding multiple images at once


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'available', 'created_at']
    list_filter = ['category', 'available', 'created_at']
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ProductImageInline]  # Attach images inline
