from django.urls import path
from .views import *

urlpatterns = [
    path('api/register/', RegisterUser.as_view(), name='register_user'),
    path('api/login/', LoginView.as_view(), name='login'),  # JWT login
    path('api/profile/', UpdateProfile.as_view(), name='update-profile'),
    path('api/user/profile/', UserProfileView.as_view(), name='user-profile'),  
    path('api/post-job/', PostJobView.as_view(), name='post_job'),
    path('api/current_user/', CurrentUserView.as_view(), name='current_user'),
    path('logout/', LogoutView.as_view(), name='logout'),  
    path('api/recent-jobs/', RecentJobsView.as_view(), name='recent-jobs'),
    path('wishlist/add/<int:job_id>/', AddToWishlistView.as_view(), name='add_to_wishlist'),
    path('gemini/', GeminiLink.as_view(), name='gemini'),

]
