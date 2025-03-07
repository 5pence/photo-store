from django.db import models
from taggit.managers import TaggableManager
from cloudinary.models import CloudinaryField


class Image(models.Model):
    title = models.CharField(max_length=255)
    image = CloudinaryField('image')  # Uploads to MEDIA/photos/
    tags = TaggableManager()  # This will allow flexible category assignment
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
