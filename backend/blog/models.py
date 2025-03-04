from django.db import models
from ckeditor.fields import RichTextField
from taggit.managers import TaggableManager


class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    content = RichTextField()
    cover_image = models.ImageField(upload_to="blog_covers/")
    tags = TaggableManager()
    meta_title = models.CharField(max_length=200, blank=True, null=True)
    meta_description = models.TextField(blank=True, null=True)
    published_date = models.DateTimeField(auto_now_add=True)
    draft = models.BooleanField(default=True)

    def __str__(self):
        return self.title
