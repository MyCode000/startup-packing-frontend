from rest_framework.serializers import ModelSerializer
from . import models


class MailSerializer(ModelSerializer):

    class Meta:
        model = models.Mail
        fields = "__all__"
