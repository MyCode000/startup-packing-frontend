from django.urls import path
from . import handlers


urlpatterns = [
    path("create-custom-design", handlers.make_custom_design),
]
