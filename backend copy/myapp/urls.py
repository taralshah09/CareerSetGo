from django.urls import path
from .views import RegisterUser, LoginView, UpdateProfile, CurrentUserView, UserProfileView

urlpatterns = [
    path('api/register/', RegisterUser.as_view(), name='register_user'),
    path('api/login/', LoginView.as_view(), name='login'),  # JWT login
    path('api/profile/', UpdateProfile.as_view(), name='update-profile'),
      path('api/user/profile/', UserProfileView.as_view(), name='user-profile'),  # New endpoint for user profile
    path('api/current_user/', CurrentUserView.as_view(), name='current_user'),
]
