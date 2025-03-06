from rest_framework import generics
from .models import BlogPost
from .serializers import BlogPostSerializer, BlogPostDetailSerializer
from django.shortcuts import get_object_or_404


class BlogPostListView(generics.ListAPIView):
    queryset = BlogPost.objects.filter(draft=False).order_by("-published_date")
    serializer_class = BlogPostSerializer


class BlogPostDetailView(generics.RetrieveAPIView):
    queryset = BlogPost.objects.filter(draft=False)
    serializer_class = BlogPostDetailSerializer
    lookup_field = "slug"
