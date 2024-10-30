from rest_framework.serializers import ModelSerializer
from . import models


class PasswordSerializer(ModelSerializer):

    class Meta:
        model = models.Password
        fields = "__all__"
