from django.urls import path
from . import handlers


urlpatterns = [
    path("send-mail", handlers.send_mail),
    path("mail-handler", handlers.mail_handler),
    path("read-mail", handlers.read_mail),
    path("unread-mails", handlers.unread_mail_count),
]
