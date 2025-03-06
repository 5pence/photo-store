from django.urls import path
from .views import BlogPostListView, BlogPostDetailView

urlpatterns = [
    path("blog/", BlogPostListView.as_view(), name="blog-list"),
    path("blog/<slug:slug>/", BlogPostDetailView.as_view(), name="blog-detail"),
]
