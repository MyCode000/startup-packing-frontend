from django.contrib import admin
from . import models
from django import forms


class OrderProductsListForm(forms.ModelForm):
    class Meta:
        model = models.OrderProductsList
        fields = ["products", "amount"]


class OrderProductsListInline(admin.TabularInline):
    model = models.OrderProductsList
    form = OrderProductsListForm
    extra = 0


@admin.register(models.Order)
class OrderAdmin(admin.ModelAdmin):
    inlines = [OrderProductsListInline]
