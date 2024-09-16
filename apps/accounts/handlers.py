from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from . import serializers
from . import serializers, models
from django.core.exceptions import ValidationError


class CustomTokenObtainPairView(TokenObtainPairView):
    # Inherits everything from TokenObtainPairView
    pass


class CustomTokenRefreshView(TokenRefreshView):
    # Inherits everything from TokenRefreshView
    pass


@api_view(["POST"])
def logout_handler(request):
    refresh_token = request.data.get("refresh_token")
    token = RefreshToken(refresh_token)
    token.blacklist()
    return Response(status=status.HTTP_205_RESET_CONTENT)


@api_view(["GET"])
def user_details_handler(request):
    user = request.user
    user_serializer = serializers.UserSerializer(user, many=False)

    return Response(status=status.HTTP_200_OK, data=user_serializer.data)


@api_view(["POST"])
@authentication_classes([])
@permission_classes([])
def users_signup_handler(request):

    first_name = request.data.get("firstName")
    last_name = request.data.get("lastName")
    email = request.data.get("email")
    password = request.data.get("password")
    phone_number = request.data.get("phoneNumber")
    address = request.data.get("address")

    # Check if the username or email already exists
    if models.User.objects.filter(email=email).exists():
        raise ValidationError("A user with this email already exists.")

    # Create the user instance
    user_obj = models.User.objects.create_user(
        first_name=first_name,
        last_name=last_name,
        email=email,
        password=password,
        phone_number=phone_number,
        address=address,
    )

    user_obj_serializer = serializers.UserSerializer(user_obj, many=False)

    return Response(
        status=status.HTTP_201_CREATED,
        data=user_obj_serializer.data,
    )
