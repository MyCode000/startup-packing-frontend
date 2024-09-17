from rest_framework.response import Response
from rest_framework import status
from . import serializers, models
from rest_framework.decorators import api_view
from carts.models import Cart
from django.shortcuts import get_object_or_404


@api_view(["GET"])
def order_handler(request):
    user = request.user

    order = models.Order.objects.filter(user=user).order_by("-timestamp")
    serializer = serializers.OrderSerializer(order)

    return Response(status=status.HTTP_200_OK, data=serializer.data)


@api_view(["POST"])
def create_order_from_cart(request):
    cart_id = request.data.get("cart_id")
    payment_method = request.data.get("payment_method")

    if not request.user.is_authenticated:
        return Response(
            {"detail": "Authentication required."}, status=status.HTTP_401_UNAUTHORIZED
        )

    if not cart_id:
        return Response(
            {"error": "Cart ID is required."}, status=status.HTTP_400_BAD_REQUEST
        )

    cart = get_object_or_404(Cart, id=cart_id, user=request.user)

    if payment_method not in ["wallet", "intsapay"]:
        return Response(
            {"error": "Invalid payment method."}, status=status.HTTP_400_BAD_REQUEST
        )

    order = models.Order.objects.create(
        user=request.user,
        payment_method=payment_method,
        total_Price=cart.total_Price,
        is_paid=False,
    )

    # Copy products and their quantities from cart to order
    for product_list in cart.cart_products_list.all():
        order_product_list = models.OrderProductsList.objects.create(
            order=order,
            amount=product_list.amount,
        )
        order_product_list.products.set(product_list.products.all())

    # Reset the cart after creating the order
    cart.cart_products_list.clear()
    cart.total_Price = 0
    cart.save()

    return Response(
        {"message": "Order created successfully"}, status=status.HTTP_201_CREATED
    )


@api_view(["POST"])
def create_order(request):
    product_id = request.data.get("product_id")
    amount = request.data.get("amount")
    payment_method = request.data.get("payment_method")

    if not request.user.is_authenticated:
        return Response(
            {"detail": "Authentication required."}, status=status.HTTP_401_UNAUTHORIZED
        )

    if not product_id or not amount:
        return Response(
            {"error": "Product ID and amount are required."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        amount = int(amount)
        if amount <= 0:
            raise ValueError("Amount must be a positive integer.")
    except ValueError as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    product = get_object_or_404(models.Product, id=product_id)

    if payment_method not in ["wallet", "intsapay"]:
        return Response(
            {"error": "Invalid payment method."}, status=status.HTTP_400_BAD_REQUEST
        )

    total_price = (
        product.offer_price * amount if product.isOffer else product.price * amount
    )

    order = models.Order.objects.create(
        user=request.user,
        payment_method=payment_method,
        total_Price=total_price,
        is_paid=False,
    )

    # Add product and its amount to the order's product list
    order_product_list = models.OrderProductsList.objects.create(
        order=order,
        amount=amount,
    )
    order_product_list.products.add(product)

    return Response(
        {"message": "Order created successfully"}, status=status.HTTP_201_CREATED
    )
