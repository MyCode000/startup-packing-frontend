from rest_framework.serializers import ModelSerializer
from . import models
from accounts.serializers import UserSerializer


class SalesDataSerializer(ModelSerializer):
    user_created = UserSerializer(read_only=True)
    user_work_on = UserSerializer(read_only=True)

    class Meta:
        model = models.SalesData
        fields = "__all__"


class SalesOrderSerializer(ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = models.SalesOrder
        fields = "__all__"
