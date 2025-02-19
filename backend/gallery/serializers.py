from rest_framework import serializers
from .models import Image


class ImageSerializer(serializers.ModelSerializer):
    tags = serializers.SerializerMethodField()  # Convert tags to a list

    def get_tags(self, obj):
        return obj.tags.names()  # Returns list of tag names

    class Meta:
        model = Image
        fields = ['id', 'title', 'image', 'tags', 'created_at']
