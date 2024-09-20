from django.db import models
from accounts.models import User
from cloudinary.models import CloudinaryField


class CustomDesign(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    logo = CloudinaryField("logo")
    color = models.CharField(max_length=50, verbose_name="Color")
    shape = models.CharField(
        max_length=50,
        verbose_name="Shape",
        choices=(("triangle", "Triangle"), ("square", "Square"), ("circle", "Circle")),
    )
    width = models.DecimalField(max_digits=20, decimal_places=2, verbose_name="Width")
    length = models.DecimalField(
        max_digits=20, decimal_places=2, verbose_name="Length", default=0
    )
    height = models.DecimalField(
        max_digits=20, decimal_places=2, verbose_name="Height", default=0
    )

    timestamp = models.DateTimeField(
        null=True, auto_now_add=True, verbose_name="Timestamp"
    )

    class Meta:
        verbose_name = "CustomDesign"
        verbose_name_plural = "CustomDesigns"
