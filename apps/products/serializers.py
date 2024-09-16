from rest_framework.serializers import ModelSerializer, SerializerMethodField
from . import models
from accounts.serializers import UserSerializer


class SizeSerializer(ModelSerializer):
    class Meta:
        model = models.Size
        fields = "__all__"


class ImagesSerializer(ModelSerializer):
    class Meta:
        model = models.Images
        fields = ["image"]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        # Modify the image URL
        data["image"] = (
            f"https://res.cloudinary.com/drkr9pgwy/image/upload/v1717818517/{instance.image}"
        )
        return data


class ProductSerializer(ModelSerializer):
    sizes = SizeSerializer(many=True, read_only=True)
    images = ImagesSerializer(many=True, read_only=True)

    class Meta:
        model = models.Product
        fields = "__all__"

    def get_formatted_timestamp(self, obj):
        return obj.timestamp.strftime("%H:%M:%S / %d-%m-%Y")

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["timestamp"] = self.get_formatted_timestamp(instance)
        return representation
