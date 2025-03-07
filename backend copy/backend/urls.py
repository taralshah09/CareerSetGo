# backend/urls.py

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt import views as jwt_views
from .views import RegisterUser,LoginView,LogoutView,GoogleCallbackView,GoogleLoginRedirectView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('myapp.urls')),  
    path('api/auth/google/login/', GoogleLoginRedirectView.as_view(), name='google_login'),
    path('api/auth/google/callback/', GoogleCallbackView.as_view(), name='google_callback'),
    path('', include('forum.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('api/register/', RegisterUser.as_view(), name='register_user'),
    path('api/login/', LoginView.as_view(), name='login'),  # JWT login
    path('logout/', LogoutView.as_view(), name='logout'),  # JWT logout
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
]

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
