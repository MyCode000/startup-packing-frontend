from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from . import models, serializers


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_number_to_sales(request):
    user = request.user
    name = request.data.get("name")
    phone_number = request.data.get("phone_number")
    note = request.data.get("note")
    data_status = request.data.get("status", "not_contacted")

    models.SalesData.objects.create(
        user_created=user,
        name=name,
        phone_number=phone_number,
        note=note,
        status=data_status,
    )

    return Response(
        status=status.HTTP_201_CREATED,
        data={"message": "Number added to sales data"},
    )


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_sales_note(request):
    sales_id = request.data.get("sales_id")
    note = request.data.get("note")

    try:
        sales_data = models.SalesData.objects.get(id=sales_id)
    except models.SalesData.DoesNotExist:
        return Response(
            status=status.HTTP_404_NOT_FOUND,
            data={"error": "Sales data not found"},
        )

    sales_data.note = note
    sales_data.save()

    return Response(
        status=status.HTTP_200_OK,
        data={"message": "Note updated successfully"},
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def sales_data_handler(request):
    user = request.user

    if user.type == "moderator":
        sales_data = models.SalesData.objects.filter(user_created=user)
    else:
        sales_data = models.SalesData.objects.filter(status="not_contacted")
    serializer = serializers.SalesDataSerializer(sales_data, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# sales Order


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def all_sales_order_handler(request):
    sales_orders = models.SalesOrder.objects.all()
    serializer = serializers.SalesOrderSerializer(sales_orders, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def sales_order_handler(request):
    sales_orders = models.SalesOrder.objects.filter(user=request.user)
    serializer = serializers.SalesOrderSerializer(sales_orders, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
