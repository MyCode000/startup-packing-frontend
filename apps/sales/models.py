from django.db import models
from accounts.models import User
from orders.models import Order

# Create your models here.


class SalesData(models.Model):
    user_created = models.ForeignKey(
        User, null=True, on_delete=models.CASCADE, related_name="user_created"
    )
    user_work_on = models.ForeignKey(
        User,
        null=True,
        on_delete=models.CASCADE,
        related_name="user_work_on",
        blank=True,
    )
    name = models.CharField(max_length=250, verbose_name="Name")
    phone_number = models.CharField(max_length=250, verbose_name="phone_number")
    note = models.TextField(verbose_name="note")
    status = models.CharField(
        max_length=50,
        verbose_name="Status",
        choices=(
            ("not_contacted", "Not Contacted"),
            ("not_responding", "Not Responding"),
            ("refuse", "refuse"),
            ("thinking", "Thinking"),
            ("bought", "Bought"),
        ),
        default="not_contacted",
    )

    class Meta:
        verbose_name = "SalesData"
        verbose_name_plural = "SalesData"


class SalesOrder(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, null=True, on_delete=models.CASCADE)
    percentage = models.DecimalField(
        max_digits=20,
        decimal_places=2,
        verbose_name="Percentage",
        null=True,
    )

    class Meta:
        verbose_name = "SalesOrder"
        verbose_name_plural = "SalesOrders"
