from django.urls import path
from . import handlers


urlpatterns = [
    path("products-handler", handlers.products_handler),
    path("info-handler", handlers.info_handler),
    path("update-product", handlers.update_product),
    path("delete-product", handlers.delete_product),
    path("create-product", handlers.create_product),
]
