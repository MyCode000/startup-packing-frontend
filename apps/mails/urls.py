from django.urls import path
from . import handlers


urlpatterns = [
    path("send-mail", handlers.send_mail),
]
