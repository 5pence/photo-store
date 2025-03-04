from django.contrib import admin
from .models import BlogPost
from ckeditor.widgets import CKEditorWidget
from django.db import models


class BlogPostAdmin(admin.ModelAdmin):
    list_display = ("title", "published_date", "draft")
    prepopulated_fields = {"slug": ("title",)}
    formfield_overrides = {models.TextField: {"widget": CKEditorWidget()}}


admin.site.register(BlogPost, BlogPostAdmin)
