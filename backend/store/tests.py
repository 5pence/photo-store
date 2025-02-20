from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from store.models import Product, Category, Cart, CartItem

User = get_user_model()


class CartAPITest(TestCase):
    def setUp(self):
        """Set up test data and API client"""
        self.client = APIClient()

        # Create a test user
        self.user = User.objects.create_user(username="testuser", password="testpass")
        self.client.force_authenticate(user=self.user)  # Authenticate user

        # Create a category
        self.category = Category.objects.create(name="photos", slug="photos")

        # Create a test product
        self.product = Product.objects.create(
            category=self.category,
            name="Test Product",
            slug="test-product",
            product_type="digital",
            price=10.99,
            available=True
        )

        # Get or create cart for the user
        self.cart, _ = Cart.objects.get_or_create(user=self.user)

    def test_cart_creation(self):
        """Test that a cart is created automatically for a new user"""
        response = self.client.get("/api/cart/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["user"], self.user.id)

    def test_add_product_to_cart(self):
        """Test adding a product to the cart"""
        response = self.client.post(
            "/api/cart/add/",
            {"product_id": self.product.id, "quantity": 2},
            format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(CartItem.objects.count(), 1)
        cart_item = CartItem.objects.first()
        self.assertEqual(cart_item.product, self.product)
        self.assertEqual(cart_item.quantity, 2)

    def test_update_cart_item_quantity(self):
        """Test updating the quantity of an existing cart item"""
        # First, add product to cart
        self.client.post("/api/cart/add/", {"product_id": self.product.id, "quantity": 2}, format="json")

        # Now update the quantity
        response = self.client.post(
            "/api/cart/add/",
            {"product_id": self.product.id, "quantity": 5},
            format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check if the quantity is updated instead of duplicated
        cart_item = CartItem.objects.first()
        self.assertEqual(cart_item.quantity, 5)

    def test_remove_product_from_cart(self):
        """Test removing a product from the cart"""
        # First, add product to cart
        self.client.post("/api/cart/add/", {"product_id": self.product.id, "quantity": 2}, format="json")

        # Now remove the product
        response = self.client.delete(
            "/api/cart/remove/",
            {"product_id": self.product.id},
            format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(CartItem.objects.count(), 0)  # Ensure item is removed

    def test_remove_nonexistent_product_from_cart(self):
        """Test removing a product that is not in the cart"""
        response = self.client.delete(
            "/api/cart/remove/",
            {"product_id": 999},  # Invalid product ID
            format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data["error"], "Item not found in cart")

    def test_add_nonexistent_product_to_cart(self):
        """Test adding a non-existent product"""
        response = self.client.post(
            "/api/cart/add/",
            {"product_id": 999, "quantity": 1},  # Invalid product ID
            format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data["error"], "Product not found")
