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

    products = models.Product.objects.all().order_by("-sale_rate")
    serializer = serializers.ProductSerializer(products, many=True)

    return Response(status=status.HTTP_200_OK, data=serializer.data)
