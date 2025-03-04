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
