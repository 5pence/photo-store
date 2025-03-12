from rest_framework import serializers
from .models import BlogPost
import re


class BlogPostSerializer(serializers.ModelSerializer):
    tags = serializers.SerializerMethodField()
    cover_image = serializers.SerializerMethodField()

    class Meta:
        model = BlogPost
        fields = ["id", "title", "slug", "cover_image", "meta_description",
                  "published_date", "tags"]

    def get_tags(self, obj):
        return [tag.name for tag in obj.tags.all()]

    def get_cover_image(self, obj):
        if obj.cover_image:
            return obj.cover_image.url
        return None


class BlogPostDetailSerializer(serializers.ModelSerializer):
    tags = serializers.SerializerMethodField()
    cover_image = serializers.SerializerMethodField()

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

    def clean_content(self, content):
        """Remove unwanted CKEditor attributes using regex."""
        clean_html = re.sub(r'\sdata-(start|end)="\d+"', '', content)
        return clean_html

    def to_representation(self, instance):
        """Modify the response before sending it to the frontend."""
        ret = super().to_representation(instance)
        ret["content"] = self.clean_content(instance.content)
        return ret
