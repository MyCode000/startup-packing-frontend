from django.urls import path
from . import handlers


urlpatterns = [
    path("refresh-token-handler", handlers.CustomTokenRefreshView.as_view()),
    path("access-token-handler", handlers.CustomTokenObtainPairView.as_view()),
    path("user-details-handler", handlers.user_details_handler),
    path("logout-handler", handlers.logout_handler),
    path("users-signup-handler", handlers.users_signup_handler),
]
