from django.urls import path
from django.contrib import admin
from rest_framework_simplejwt import views as jwt_views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import (UpdateSkillScore,CompanyView,ApplyForJobView,SkillGapAnalysisView,JobRecommendationAPIView,UpdateProfile,Job,UserProfileView,CurrentUserView,PostJobView,RecentJobsView,AddToWishlistView,fetchcourses)

urlpatterns = [
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'), 
    path('api/profile/', UpdateProfile.as_view(), name='update_profile'),
    path('api/user/profile/', UserProfileView.as_view(), name='user_profile'),
    path('api/current_user/', CurrentUserView.as_view(), name='current_user'),
    path("api/update-skill-score/", UpdateSkillScore.as_view(), name=""),
    path('company/', CompanyView.as_view(), name='company'),
    path('api/post-job/', PostJobView.as_view(), name='post_job'),
    path('api/jobs/', JobRecommendationAPIView.as_view(), name='jobs'),
   
    path('api/recent-jobs/', RecentJobsView.as_view(), name='recent_jobs'),
    path('wishlist/add/<int:job_id>/', AddToWishlistView.as_view(), name='add_to_wishlist'),
   # Company
    path('api/apply-job/<int:job_id>/', ApplyForJobView.as_view(), name='apply_for_job_api'),


    # Courses Route
    path('api/course/', fetchcourses.as_view(), name='fetch_courses'),
    path('api/skill-gap-analysis/', SkillGapAnalysisView.as_view(), name='skill_gap_analysis'),


]
