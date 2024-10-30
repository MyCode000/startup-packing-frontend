from django.db import models

# Create your models here.


class Password(models.Model):
    name = models.CharField(max_length=250, verbose_name="Name")
    key = models.CharField(max_length=250, verbose_name="Key")
    password = models.CharField(max_length=250, verbose_name="password")

    class Meta:
        verbose_name = "Password"
        verbose_name_plural = "Passwords"
