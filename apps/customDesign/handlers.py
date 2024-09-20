import base64
from django.core.files.base import ContentFile
from cloudinary.uploader import upload
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from . import models


@api_view(["POST"])
def make_custom_design(request):
    # Extract the necessary data from the request
    logo = request.data.get("logo")  # Base64 encoded logo image
    color = request.data.get("color")
    shape = request.data.get("shape")
    width = request.data.get("width")
    length = request.data.get("length")
    height = request.data.get("height")

    if not request.user.is_authenticated:
        return Response(
            {"detail": "Authentication required."}, status=status.HTTP_401_UNAUTHORIZED
        )

    # Validate required fields
    if not logo or not color or not shape or not width or not length or not height:
        return Response(
            {"error": "Missing required fields."}, status=status.HTTP_400_BAD_REQUEST
        )

    # Handle image upload
    upload_result = None
    try:
        format, imgstr = logo.split(";base64,")
        ext = format.split("/")[-1]
        image_data = ContentFile(base64.b64decode(imgstr), name=f"custom_logo.{ext}")

        # Upload the decoded image to Cloudinary
        upload_result = upload(image_data)
    except ValueError:
        return Response(
            {"error": "Invalid image format."}, status=status.HTTP_400_BAD_REQUEST
        )

    if not upload_result:
        return Response(
            {"error": "Failed to upload logo image."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # Create a new CustomDesign instance
    models.CustomDesign.objects.create(
        user=request.user,
        logo=upload_result.get("secure_url"),  # Save the image URL from Cloudinary
        color=color,
        shape=shape,
        width=width,
        length=length,
        height=height,
    )

    return Response(
        {"message": "Custom design created successfully"},
        status=status.HTTP_201_CREATED,
    )
