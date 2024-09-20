from rest_framework.serializers import ModelSerializer
from . import models


class CustomDesignSerializer(ModelSerializer):

    class Meta:
        model = models.CustomDesign
        fields = "__all__"
