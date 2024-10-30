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
    name = request.data.get("name")
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


@api_view(["GET"])
def mail_handler(request):

    mails = models.Mail.objects.all()
    serializer = serializers.MailSerializer(mails, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["PUT"])
def read_mail(request):
    mail_id = request.data.get("mail_id")

    mail = models.Mail.objects.get(id=mail_id)
    mail.isRead = True
    mail.save()

    return Response(data={"message": "You read the mail"}, status=status.HTTP_200_OK)


@api_view(["GET"])
def unread_mail_count(request):

    unread_count = models.Mail.objects.filter(isRead=False).count()

    return Response(status=status.HTTP_200_OK, data={"unread_mail_count": unread_count})
