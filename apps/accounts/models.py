from django.db import models
from django.contrib.auth.models import AbstractUser
from . import manager
from cloudinary.models import CloudinaryField


class User(AbstractUser):
    username = None
    id_card_front = CloudinaryField(
        "id_card_front_image",
        null=True,
    )
    id_card_back = CloudinaryField(
        "id_card_back_image",
        null=True,
    )
    phone_number = models.CharField(max_length=100, verbose_name="Phone number")
    email = models.EmailField(verbose_name="Email", unique=True)
    address = models.CharField(
        max_length=200,
        verbose_name="Address",
        null=True,
    )
    gender = models.CharField(
        max_length=50,
        verbose_name="Gender",
        choices=(("male", "Male"), ("female", "Female")),
        default="male",
    )
    type = models.CharField(
        max_length=50,
        verbose_name="Type",
        choices=(
            ("customer", "Customer"),
            ("owner", "Owner"),
            ("admin", "Admin"),
            ("sales", "Sales"),
            ("accountant", "Accountant"),
            ("storage", "Storage"),
            ("moderator", "Moderator"),
        ),
        default="customer",
    )
    salary = models.DecimalField(
        max_digits=20,
        decimal_places=2,
        verbose_name="Salary",
        null=True,
    )
    status = models.CharField(
        max_length=50,
        verbose_name="Status",
        choices=(
            ("pending", "Pending"),
            ("banned", "Banned"),
            ("active", "Active"),
        ),
        default="pending",
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
