from django.urls import path
from .views import CategoryListView, ProductListView
from .views import CartDetailView, AddToCartView, RemoveFromCartView
from .views import CreateCheckoutSession, ConfirmOrderView
from .views import UserOrderListView, OrderDetailView


urlpatterns = [
    path("categories/", CategoryListView.as_view(), name="category-list"),
    path("products/", ProductListView.as_view(), name="product-list"),
    path("cart/", CartDetailView.as_view(), name="cart-detail"),
    path("cart/add/", AddToCartView.as_view(), name="cart-add"),
    path("cart/remove/", RemoveFromCartView.as_view(), name="cart-remove"),
    path("checkout/", CreateCheckoutSession.as_view(), name="checkout"),
    path("orders/", UserOrderListView.as_view(), name="user-orders"),
    path("orders/<int:order_id>/", OrderDetailView.as_view(), name="order-detail"),
    path("orders/confirm/", ConfirmOrderView.as_view(), name="confirm-order"),
]
