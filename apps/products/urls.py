from django.urls import path
from . import handlers


urlpatterns = [
    path("products-handler", handlers.products_handler),
    path("info-handler", handlers.info_handler),
]
