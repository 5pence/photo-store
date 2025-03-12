from rest_framework import serializers
from .models import BlogPost


class BlogPostSerializer(serializers.ModelSerializer):
    tags = serializers.SerializerMethodField()

    class Meta:
        model = BlogPost
        fields = ["id", "title", "slug", "cover_image", "meta_description",
                  "published_date", "tags"]

    def get_tags(self, obj):
        return [tag.name for tag in obj.tags.all()]


class BlogPostDetailSerializer(serializers.ModelSerializer):
    tags = serializers.SerializerMethodField()

    class Meta:
        model = BlogPost
        fields = ["id", "title", "slug", "content", "cover_image",
                  "meta_title", "meta_description", "published_date", "tags"]

    def get_tags(self, obj):
        return [tag.name for tag in obj.tags.all()]

    def get_cover_image(self, obj):
        if obj.cover_image:
            return obj.cover_image.url
        return None
