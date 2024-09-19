from rest_framework.response import Response
from rest_framework import status
from . import serializers, models
from rest_framework.decorators import api_view
from carts.models import Cart, CartProductsList
from django.shortcuts import get_object_or_404
import base64
from django.core.files.base import ContentFile
from cloudinary.uploader import upload


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
    address = request.data.get("address")
    phone_number = request.data.get("phone_number")
    payment_image = request.data.get("payment_image")

    if not request.user.is_authenticated:
        return Response(
            {"detail": "Authentication required."}, status=status.HTTP_401_UNAUTHORIZED
        )

    if not address:
        address = request.user.address

    if not phone_number:
        phone_number = request.user.phone_number

    if not cart_id:
        return Response(
            {"error": "Cart ID is required."}, status=status.HTTP_400_BAD_REQUEST
        )

    cart = get_object_or_404(Cart, id=cart_id, user=request.user)

    if payment_method not in ["wallet", "instapay"]:
        return Response(
            {"error": "Invalid payment method."}, status=status.HTTP_400_BAD_REQUEST
        )

    # Decode and upload the Base64 image
    upload_result = None
    if payment_image:
        try:
            format, imgstr = payment_image.split(";base64,")
            ext = format.split("/")[-1]
            image_data = ContentFile(
                base64.b64decode(imgstr), name=f"payment_image.{ext}"
            )

            # Upload the decoded image to Cloudinary
            upload_result = upload(image_data)
        except ValueError:
            return Response(
                {"error": "Invalid image format."}, status=status.HTTP_400_BAD_REQUEST
            )

    if not upload_result:
        return Response(
            {"error": "Failed to upload payment image."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # Create the order
    order = models.Order.objects.create(
        user=request.user,
        payment_method=payment_method,
        total_Price=cart.total_Price,
        is_paid=False,
        address=address,
        phone_number=phone_number,
        payment_image=upload_result.get(
            "secure_url"
        ),  # Save the image URL from Cloudinary
    )

    # Copy products and their quantities from cart to receipt
    for product_list in cart.cart_products_list.all():
        order_products_list = models.OrderProductsList.objects.create(
            order=order,
            amount=product_list.amount,
        )
        order_products_list.products.set(product_list.products.all())

    # Reset the cart after creating the receipt
    cart.cart_products_list.clear()
    cart.total_Price = 0
    cart.save()  # Optionally delete the cart

    return Response(
        {"success": "Order created successfully"}, status=status.HTTP_201_CREATED
    )


@api_view(["POST"])
def create_order(request):
    product_id = request.data.get("product_id")
    amount = request.data.get("amount")
    payment_method = request.data.get("payment_method")
    address = request.data.get("address")
    phone_number = request.data.get("phone_number")

    if not request.user.is_authenticated:
        return Response(
            {"detail": "Authentication required."}, status=status.HTTP_401_UNAUTHORIZED
        )

    if not address:
        address = request.user.address

    if not phone_number:
        phone_number = request.user.phone_number

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
        address=address,
        phone_number=phone_number,
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
