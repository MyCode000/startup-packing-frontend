from django.urls import path
from . import handlers


urlpatterns = [
    path("cart-handler", handlers.cart_handler),
    path("all-cart-handler", handlers.all_cart_handler),
    path("add-to-cart", handlers.add_to_cart),
    path("remove-from-cart", handlers.remove_from_cart),
]
