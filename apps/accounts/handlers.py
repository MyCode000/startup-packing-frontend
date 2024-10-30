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
    serializer_class = serializers.CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        email = data.get("email")
        password = data.get("password")

        try:
            user = models.User.objects.get(email=email)

            # Check the user's status
            if user.status == "pending":
                return Response(
                    {"detail": "User is pending approval."},
                    status=status.HTTP_403_FORBIDDEN,
                )
            elif user.status == "banned":
                return Response(
                    {"detail": "You can't login now, contact the admin."},
                    status=status.HTTP_403_FORBIDDEN,
                )

            # If the user type is customer, set status to active
            if user.type == "customer":
                user.status = "active"
                user.save()

            # Call the super method to get tokens
            token_response = super().post(request, *args, **kwargs)

            # Add user type to the response
            token_response.data["type"] = user.type

            return token_response

        except models.User.DoesNotExist:
            return Response(
                {"detail": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED
            )


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
    user_id = request.data.get("user_id")
    if user_id:
        user = models.User.objects.get(id=user_id)
    else:
        user = request.user
    user_serializer = serializers.UserSerializer(user, many=False)

    return Response(status=status.HTTP_200_OK, data=user_serializer.data)


@api_view(["GET"])
def users_handler(request):
    users = models.User.objects.exclude(type="customer")
    user_serializer = serializers.UserSerializer(users, many=True)

    return Response(status=status.HTTP_200_OK, data=user_serializer.data)


@api_view(["POST"])
@authentication_classes([])
@permission_classes([])
def users_signup_handler(request):
    # Extract data from request
    first_name = request.data.get("firstName")
    last_name = request.data.get("lastName")
    email = request.data.get("email")
    password = request.data.get("password")
    phone_number = request.data.get("phoneNumber")
    address = request.data.get("address")
    gender = request.data.get("gender", "male")  # Default to 'male' if not provided
    user_type = request.data.get(
        "type", "customer"
    )  # Default to 'customer' if not provided
    salary = request.data.get("salary")

    # ID card images
    id_card_front = request.FILES.get("idCardFront")
    id_card_back = request.FILES.get("idCardBack")

    # Check if a user with the email already exists
    if models.User.objects.filter(email=email).exists():
        raise ValidationError("A user with this email already exists.")

    # Create the user instance with the provided data
    user_obj = models.User.objects.create_user(
        first_name=first_name,
        last_name=last_name,
        email=email,
        password=password,
        phone_number=phone_number,
        address=address,
        gender=gender,
        type=user_type,
        salary=salary,
        id_card_front=id_card_front,
        id_card_back=id_card_back,
    )

    # Serialize the created user object
    user_obj_serializer = serializers.UserSerializer(user_obj, many=False)

    return Response(
        status=status.HTTP_201_CREATED,
        data=user_obj_serializer.data,
    )
