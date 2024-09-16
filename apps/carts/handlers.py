from rest_framework.response import Response
from rest_framework import status
from . import serializers, models
from rest_framework.decorators import api_view
from django.db.models import Avg
from django.shortcuts import get_object_or_404


@api_view(["GET"])
def cart_handler(request):
    user = request.user

    cart = models.Cart.objects.filter(user=user).order_by("-timestamp")
    serializer = serializers.CartSerializer(cart)

    return Response(status=status.HTTP_200_OK, data=serializer.data)


@api_view(["POST"])
def add_to_cart(request):
    user = request.user
    product_id = request.data.get("product_id")
    get_status = request.data.get("get_status")

    if not user.is_authenticated:
        return Response(
            {"detail": "Authentication required."}, status=status.HTTP_401_UNAUTHORIZED
        )

    cart, created = models.Cart.objects.get_or_create(user=user)

    if not product_id:
        return Response(
            {"error": "Product ID is required."}, status=status.HTTP_400_BAD_REQUEST
        )

    try:
        product = models.Product.objects.get(id=product_id)
    except models.Product.DoesNotExist:
        return Response(
            {"error": "Product does not exist."}, status=status.HTTP_404_NOT_FOUND
        )

    # Check if the request is for status only
    if get_status == True:
        in_cart = product in models.CartProductsList.objects.filter(cart=cart)
        return Response({"in_cart": in_cart}, status=status.HTTP_200_OK)

    amount = int(request.data.get("amount", 1))
    if not isinstance(amount, int) or amount < 1:
        return Response(
            {"error": "Amount must be a positive integer."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        product_list = models.CartProductsList.objects.get(cart=cart, products=product)
        product_list.amount += amount  # Update the amount if product exists
    except models.CartProductsList.DoesNotExist:
        product_list = models.CartProductsList.objects.create(cart=cart)
        product_list.products.add(product)
        product_list.amount = amount  # Set the amount for the new product list

    product_list.save()

    # Recalculate total price
    total_price = sum(
        (p.offer_price if p.isOffer else p.price) * pl.amount
        for pl in cart.cart_products_list.all()
        for p in pl.products.all()
    )
    cart.total_Price = total_price
    cart.save()

    return Response(
        {"message": "Product added successfully"}, status=status.HTTP_201_CREATED
    )


@api_view(["PUT"])
def remove_from_cart(request):
    user = request.user
    product_id = request.data.get("product_id")

    if not user.is_authenticated:
        return Response(
            {"detail": "Authentication required."}, status=status.HTTP_401_UNAUTHORIZED
        )

    cart = get_object_or_404(models.Cart, user=user)

    if not product_id:
        return Response(
            {"error": "Product ID is required."}, status=status.HTTP_400_BAD_REQUEST
        )

    amount = int(request.data.get("amount", 1))
    if not isinstance(amount, int) or amount < 1:
        return Response(
            {"error": "Amount must be a positive integer."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    product = get_object_or_404(models.Product, pk=product_id)

    try:
        product_list = models.CartProductsList.objects.get(cart=cart, products=product)
    except models.CartProductsList.DoesNotExist:
        return Response(
            {"error": "Product list not found for this cart."},
            status=status.HTTP_404_NOT_FOUND,
        )

    if product_list.amount < amount:
        return Response(
            {"error": "Insufficient amount of the product in the cart."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    product_list.amount -= amount
    if product_list.amount <= 0:
        product_list.products.remove(product)
        if not product_list.products.exists():
            product_list.delete()
    else:
        product_list.save()

    total_price = sum(
        (p.offer_price if p.isOffer else p.price) * pl.amount
        for pl in cart.products_list.all()
        for p in pl.products.all()
    )
    cart.total_Price = total_price
    cart.save()

    return Response(
        {"message": "Product removed successfully"}, status=status.HTTP_200_OK
    )
