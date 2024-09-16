from django.db import models
from accounts.models import User
from products.models import Product

# Create your models here.


class Cart(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    total_Price = models.DecimalField(
        max_digits=20, decimal_places=2, verbose_name="Total Price", default=0
    )

    timestamp = models.DateTimeField(
        null=True, auto_now_add=True, verbose_name="Timestamp"
    )

    class Meta:
        verbose_name = "Cart"
        verbose_name_plural = "Carts"


class CartProductsList(models.Model):
    cart = models.ForeignKey(
        "Cart", related_name="cart_products_list", on_delete=models.CASCADE, null=True
    )
    products = models.ManyToManyField(Product, verbose_name="Products")
    amount = models.IntegerField(verbose_name="Amount", default=1)

    def __str__(self):
        return f"{self.products} - {self.amount}"
