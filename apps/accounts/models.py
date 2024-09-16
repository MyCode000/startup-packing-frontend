from django.db import models
from django.contrib.auth.models import AbstractUser
from . import manager


class User(AbstractUser):
    username = None
    phone_number = models.CharField(max_length=100, verbose_name="Phone number")
    email = models.EmailField(verbose_name="Email", unique=True)
    address = models.CharField(
        max_length=200,
        verbose_name="Address",
        null=True,
    )

    USERNAME_FIELD = "email"

    # Remove the username field as it's no longer required
    REQUIRED_FIELDS = []

    objects = manager.CustomUserManager()  # Set the custom user manager

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"

    def __str__(self):
        return self.email
