from django.urls import path
from . import handlers


urlpatterns = [
    path("order-handler", handlers.order_handler),
    path("create-order", handlers.create_order),
    path("create-order-from-cart", handlers.create_order_from_cart),
]
