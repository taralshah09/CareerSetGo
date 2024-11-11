from django.urls import path
from .views import RegisterUser, LoginView, UpdateProfile
urlpatterns = [
    path('api/register/', RegisterUser.as_view(), name='register_user'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/profile/', UpdateProfile.as_view(), name='update_profile'),
]