from django.db import models

# Create your models here.


class Mail(models.Model):
    name = models.CharField(max_length=250, verbose_name="Name")
    email = models.EmailField(verbose_name="Email")
    phone_number = models.CharField(max_length=100, verbose_name="Phone number")
    message = models.TextField(verbose_name="Message")
    isRead = models.BooleanField(verbose_name="Is Read", default=False)

    timestamp = models.DateTimeField(
        null=True, auto_now_add=True, verbose_name="Timestamp"
    )

    class Meta:
        verbose_name = "Mail"
        verbose_name_plural = "Mails"
