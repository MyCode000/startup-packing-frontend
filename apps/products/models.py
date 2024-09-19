from django.db import models
from cloudinary.models import CloudinaryField


class Size(models.Model):
    size = models.CharField(max_length=50, verbose_name="Size")

    class Meta:
        verbose_name = "Size"
        verbose_name_plural = "Sizes"

    def __str__(self):
        return self.size


class Product(models.Model):
    name = models.CharField(max_length=250, verbose_name="Name")
    description = models.TextField(verbose_name="Description")
    amount = models.IntegerField(verbose_name="Amount")
    price = models.DecimalField(max_digits=20, decimal_places=2, verbose_name="Price")
    offer_price = models.DecimalField(
        max_digits=20,
        decimal_places=2,
        verbose_name="Offer Price",
        null=True,
    )
    is_offer = models.BooleanField(verbose_name="Is Offer")
    sizes = models.ManyToManyField(Size, verbose_name="Sizes")
    is_available = models.BooleanField(verbose_name="Is available")
    sale_rate = models.IntegerField(verbose_name="Sale Rate", default=0)

    timestamp = models.DateTimeField(
        null=True, auto_now_add=True, verbose_name="Timestamp"
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Product"
        verbose_name_plural = "Products"


class Images(models.Model):
    product = models.ForeignKey(
        "Product", related_name="images", on_delete=models.CASCADE, null=True
    )
    image = CloudinaryField("image")

    def __str__(self):
        return f"{self.image}"
