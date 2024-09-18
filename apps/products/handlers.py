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
