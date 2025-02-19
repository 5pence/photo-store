from rest_framework import generics
from .models import Image
from .serializers import ImageSerializer


class ImageListCreateView(generics.ListCreateAPIView):
    serializer_class = ImageSerializer

    def get_queryset(self):
        queryset = Image.objects.all()
        tag = self.request.query_params.get("tag")
        if tag:
            # Case-insensitive match
            queryset = queryset.filter(tags__name__iexact=tag)
        return queryset
