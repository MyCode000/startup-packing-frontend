from rest_framework.serializers import ModelSerializer
from . import models
from products.serializers import ProductSerializer


class CartProductsListSerializer(ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = models.CartProductsList
        fields = ["products", "amount"]


class CartSerializer(ModelSerializer):
    cart_products_list = CartProductsListSerializer(many=True, read_only=True)

    class Meta:
        model = models.Cart
        fields = "__all__"
