from rest_framework.response import Response
from rest_framework import status
from . import serializers, models
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)


@api_view(["POST"])
@permission_classes([])
@authentication_classes([])
def send_mail(request):
    name = request.data.get("Name")
    email = request.data.get("email")
    phone_number = request.data.get("phone_number")
    message = request.data.get("message")

    models.Mail.objects.create(
        name=name,
        email=email,
        phone_number=phone_number,
        message=message,
    )

    return Response(
        status=status.HTTP_201_CREATED,
        data={"message": "email sent succeffully"},
    )
