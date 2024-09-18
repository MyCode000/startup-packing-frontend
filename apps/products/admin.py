from django.contrib import admin
from . import models
from django import forms


class ImagesForm(forms.ModelForm):
    class Meta:
        model = models.Images
        fields = ["image"]


class ImagesInline(admin.TabularInline):
    model = models.Images
    form = ImagesForm
    extra = 1


@admin.register(models.Product)
class ProductAdmin(admin.ModelAdmin):
    inlines = [ImagesInline]


admin.site.register(models.Size)
