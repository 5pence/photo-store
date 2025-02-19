from django.urls import path
from .views import ImageListCreateView

urlpatterns = [
    path("images/", ImageListCreateView.as_view(), name="image-list-create"),
]
