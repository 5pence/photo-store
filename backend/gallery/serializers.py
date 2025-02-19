from rest_framework import serializers
from .models import Image


class ImageSerializer(serializers.ModelSerializer):
    tags = serializers.SerializerMethodField()  # Convert tags to a list
    image_url = serializers.SerializerMethodField()

    def get_image_url(self, obj):
        request = self.context.get("request")
        return request.build_absolute_uri(obj.image.url) if obj.image else None

    def get_tags(self, obj):
        return obj.tags.names()  # Returns list of tag names

    class Meta:
        model = Image
        fields = ['id', 'title', 'image_url', 'tags', 'created_at']
