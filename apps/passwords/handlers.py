from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from . import models, serializers


def check_user_is_owner(user):
    """Check if the user has an 'owner' type."""
    if user.type != "owner":
        raise PermissionDenied(
            "Only users with owner permissions can perform this action."
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_password(request):
    check_user_is_owner(request.user)

    name = request.data.get("name")
    key = request.data.get("key")
    password = request.data.get("password")

    models.Password.objects.create(name=name, key=key, password=password)

    return Response(
        status=status.HTTP_201_CREATED,
        data={"message": "Password saved"},
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def passwords_handler(request):
    check_user_is_owner(request.user)

    passwords = models.Password.objects.all()
    serializer = serializers.PasswordSerializer(passwords, many=True)
    return Response(
        serializer.data,
        status=status.HTTP_200_OK,
    )


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_password(request):
    check_user_is_owner(request.user)

    password_id = request.data.get("password_id")
    name = request.data.get("name")
    key = request.data.get("key")
    password_value = request.data.get("password")

    try:
        password = models.Password.objects.get(id=password_id)
    except models.Password.DoesNotExist:
        return Response(
            status=status.HTTP_404_NOT_FOUND,
            data={"error": "Password not found"},
        )

    # Update fields
    password.name = name or password.name
    password.key = key or password.key
    password.password = password_value or password.password
    password.save()

    return Response(
        status=status.HTTP_200_OK,
        data={"message": "Password updated"},
    )


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_password(request):
    check_user_is_owner(request.user)

    password_id = request.data.get("password_id")
    try:
        password = models.Password.objects.get(id=password_id)
        password.delete()
        return Response(
            status=status.HTTP_204_NO_CONTENT,
            data={"message": "Password deleted"},
        )
    except models.Password.DoesNotExist:
        return Response(
            status=status.HTTP_404_NOT_FOUND,
            data={"error": "Password not found"},
        )
