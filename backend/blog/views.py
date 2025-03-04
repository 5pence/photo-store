from rest_framework import generics
from .models import BlogPost
from .serializers import BlogPostSerializer


class BlogPostListView(generics.ListAPIView):
    queryset = BlogPost.objects.filter(draft=False).order_by("-published_date")
    serializer_class = BlogPostSerializer
