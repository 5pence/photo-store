from rest_framework import generics
from .models import Image
from .serializers import ImageSerializer


class ImageListView(generics.ListAPIView):
    serializer_class = ImageSerializer

    def get_queryset(self):
        queryset = Image.objects.all()
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(tags__name__in=[category])  # Filter by tag
        return queryset
