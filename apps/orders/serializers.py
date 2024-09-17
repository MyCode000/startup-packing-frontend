from rest_framework.serializers import ModelSerializer
from . import models
from products.serializers import ProductSerializer


class OrderProductsListSerializer(ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = models.OrderProductsList
        fields = ["products", "amount"]


class OrderSerializer(ModelSerializer):
    Order_products_list = OrderProductsListSerializer(many=True, read_only=True)

    class Meta:
        model = models.Order
        fields = "__all__"
