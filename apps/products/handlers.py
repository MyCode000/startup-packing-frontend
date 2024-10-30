from rest_framework.response import Response
from rest_framework import status
from . import serializers, models
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)


@api_view(["GET"])
@permission_classes([])
@authentication_classes([])
def products_handler(request):
    sort_by = request.query_params.get("sort_by")
    price = request.query_params.get("price")
    sizes = request.query_params.getlist("sizes[]")

    # Initial queryset
    products = models.Product.objects.all()

    # Filter by sizes if provided
    if sizes:
        products = products.filter(sizes__size__in=sizes).distinct()

    if price:
        products = products.filter(price=price)

    # Apply sorting based on the sort_by parameter
    if sort_by == "Best Selling":
        products = products.order_by("-sale_rate")
    elif sort_by == "A-Z":
        products = products.order_by("name")
    elif sort_by == "Z-A":
        products = products.order_by("-name")
    elif sort_by == "High to Low":
        products = products.order_by("-price")
    elif sort_by == "Low to High":
        products = products.order_by("price")
    else:
        # Default sort if no valid sort_by parameter is provided
        products = products.order_by("-sale_rate")

    serializer = serializers.ProductSerializer(products, many=True)

    return Response(status=status.HTTP_200_OK, data=serializer.data)


@api_view(["GET"])
@permission_classes([])
@authentication_classes([])
def info_handler(request):
    # Fetch all sizes
    sizes = models.Size.objects.all()
    size_serializer = serializers.SizeSerializer(sizes, many=True)

    # Get the highest and lowest prices from the products
    highest_price = (
        models.Product.objects.order_by("-price")
        .values_list("price", flat=True)
        .first()
    )
    lowest_price = (
        models.Product.objects.order_by("price").values_list("price", flat=True).first()
    )

    # Prepare the final response data
    response_data = {
        "sizes": size_serializer.data,
        "highest_price": highest_price,
        "lowest_price": lowest_price,
    }

    return Response(status=status.HTTP_200_OK, data=response_data)


@api_view(["POST"])
def create_product(request):
    name = request.data.get("name")
    description = request.data.get("description")
    amount = request.data.get("amount")
    price = request.data.get("price")
    offer_price = request.data.get("offer_price")
    is_offer = request.data.get("is_offer")
    sizes = request.data.getlist("sizes")
    is_available = request.data.get("is_available")
    sale_rate = request.data.get("sale_rate", 0)

    # Create the product
    product = models.Product.objects.create(
        name=name,
        description=description,
        amount=amount,
        price=price,
        offer_price=offer_price,
        is_offer=is_offer,
        is_available=is_available,
        sale_rate=sale_rate,
    )

    # Add sizes to the product
    if sizes:
        size_objects = models.Size.objects.filter(id__in=sizes)
        product.sizes.set(size_objects)

    return Response(
        status=status.HTTP_201_CREATED,
        data={"message": "Product created"},
    )


@api_view(["PUT"])
def update_product(request):
    product_id = request.data.get("product_id")
    name = request.data.get("name")
    description = request.data.get("description")
    amount = request.data.get("amount")
    price = request.data.get("price")
    offer_price = request.data.get("offer_price")
    is_offer = request.data.get("is_offer")
    sizes = request.data.getlist("sizes")
    is_available = request.data.get("is_available")
    sale_rate = request.data.get("sale_rate")

    try:
        product = models.Product.objects.get(id=product_id)
    except models.Product.DoesNotExist:
        return Response(
            status=status.HTTP_404_NOT_FOUND,
            data={"error": "Product not found"},
        )

    # Update fields
    product.name = name or product.name
    product.description = description or product.description
    product.amount = amount if amount is not None else product.amount
    product.price = price if price is not None else product.price
    product.offer_price = (
        offer_price if offer_price is not None else product.offer_price
    )
    product.is_offer = is_offer if is_offer is not None else product.is_offer
    product.is_available = (
        is_available if is_available is not None else product.is_available
    )
    product.sale_rate = sale_rate if sale_rate is not None else product.sale_rate

    # Update sizes if provided
    if sizes:
        size_objects = models.Size.objects.filter(id__in=sizes)
        product.sizes.set(size_objects)

    product.save()

    return Response(
        status=status.HTTP_200_OK,
        data={"message": "Product updated"},
    )


@api_view(["DELETE"])
def delete_product(request):
    product_id = request.data.get("product_id")
    try:
        product = models.Product.objects.get(id=product_id)
        product.delete()
        return Response(
            status=status.HTTP_204_NO_CONTENT,
            data={"message": "Product deleted"},
        )
    except models.Product.DoesNotExist:
        return Response(
            status=status.HTTP_404_NOT_FOUND,
            data={"error": "Product not found"},
        )
