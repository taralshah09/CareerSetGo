from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt import views as jwt_views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import (
    ThreadListView,
    ThreadDetailView,
    PostListView,
    CreateThreadView,
    PostDetailView,
    PinListView,
    ProfileView,
    ThreadsByTopicView
)

urlpatterns = [

    path('api/createThread/', CreateThreadView.as_view(), name='create-thread'),
    path('api/threads/', ThreadListView.as_view(), name='thread-list'),
    path('api/threads/topic/<int:topic_id>/', ThreadListView.as_view(), name='thread_list_by_topic'),
    path('api/threads/<int:pk>/', ThreadDetailView.as_view(), name='thread_detail'),
    path('api/threads/<int:thread_id>/posts/', PostListView.as_view(), name='post_list'),
    path('api/posts/<int:pk>/', PostDetailView.as_view(), name='post_detail'),
    path('api/pins/', PinListView.as_view(), name='pin_list'),
    path('api/profile/<int:pk>/', ProfileView.as_view(), name='profile_detail'),
    path('api/threads/topic/<int:topic_id>/', ThreadsByTopicView.as_view(), name='threads_by_topic'),
]
