from django.urls import path
from . import handlers


urlpatterns = [
    path("create-password", handlers.create_password),
    path("passwords-handler", handlers.passwords_handler),
    path("delete-password", handlers.delete_password),
    path("update-password", handlers.update_password),
]
