from django.urls import path
from django.contrib import admin
from rest_framework_simplejwt import views as jwt_views
from .views import ( RegisterUser,LoginView,LogoutView,UpdateProfile,JobsView,UserProfileView,CurrentUserView,PostJobView,RecentJobsView,AddToWishlistView,fetchcourses)

urlpatterns = [
    # Authentication Routes
    path('api/register/', RegisterUser.as_view(), name='register_user'),
    path('api/login/', LoginView.as_view(), name='login'),  # JWT login
    path('logout/', LogoutView.as_view(), name='logout'),  # JWT logout
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'), 

    # User Profile Routes
    path('api/profile/', UpdateProfile.as_view(), name='update_profile'),
    path('api/user/profile/', UserProfileView.as_view(), name='user_profile'),
    path('api/current_user/', CurrentUserView.as_view(), name='current_user'),

    # Job Management Routes
    path('api/post-job/', PostJobView.as_view(), name='post_job'),
    path('api/jobs/', JobsView.as_view(), name='jobs'),
    path('api/recent-jobs/', RecentJobsView.as_view(), name='recent_jobs'),
    path('wishlist/add/<int:job_id>/', AddToWishlistView.as_view(), name='add_to_wishlist'),

    # Courses Route
    path('api/course/', fetchcourses.as_view(), name='fetch_courses'),
]
