from django.db import models
from accounts.models import User
from products.models import Product
from cloudinary.models import CloudinaryField

# Create your models here.


class Order(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    total_Price = models.DecimalField(
        max_digits=20, decimal_places=2, verbose_name="Total Price", default=0
    )
    is_paid = models.BooleanField(verbose_name="Is Paid", default=False)
    payment_method = models.CharField(
        max_length=100,
        verbose_name="Payment Method",
        choices=(("wallet", "Wallet"), ("instapay", "Insta Pay")),
    )
    payment_image = CloudinaryField("payment_image")
    address = models.CharField(
        max_length=200,
        verbose_name="Address",
        null=True,
    )
    phone_number = models.CharField(
        max_length=100,
        verbose_name="Phone number",
        null=True,
    )

    timestamp = models.DateTimeField(
        null=True, auto_now_add=True, verbose_name="Timestamp"
    )

    class Meta:
        verbose_name = "Order"
        verbose_name_plural = "Orders"


class OrderProductsList(models.Model):
    order = models.ForeignKey(
        "Order", related_name="order_products_list", on_delete=models.CASCADE, null=True
    )
    products = models.ManyToManyField(Product, verbose_name="Products")
    amount = models.IntegerField(verbose_name="Amount", default=1)

    def __str__(self):
        return f"{self.products} - {self.amount}"
