from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny, IsAuthenticated
from myapp.models import User, Profile
from .models import  Thread, Post, Pin, Bookmark, Thread
from .serializers import BookmarkSerializer,ThreadSerializer, PostSerializer, PinSerializer, ProfileSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from myapp.utils.email_utils import send_email
import random
from faker import Faker

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.pagination import PageNumberPagination

class CustomPostPagination(PageNumberPagination):
    page_size = 10  # Number of posts per page
    page_size_query_param = 'page_size'
    max_page_size = 100

class PostListView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = CustomPostPagination

    def get(self, request, thread_id):
        # Get paginated posts for the specific thread
        posts = Post.objects.filter(thread_id=thread_id).order_by('-created_at')
        
        # Apply pagination
        paginator = self.pagination_class()
        paginated_posts = paginator.paginate_queryset(posts, request)
        
        # Serialize paginated posts
        serializer = PostSerializer(paginated_posts, many=True)
        
        # Return paginated response
        return paginator.get_paginated_response(serializer.data)

    def post(self, request, thread_id):
        # Ensure the user is authenticated to create a post
        if not request.user.is_authenticated:
            return Response(
                {"detail": "Authentication required"},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        # Prepare data for serialization
        data = request.data.copy()
        data['thread'] = thread_id
        data['author'] = request.user.id  # Automatically set the author
        
        # Validate and save the post
        serializer = PostSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

fake = Faker()
class CreateThreadView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        data['creator'] = request.user.id
        
        serializer = ThreadSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        print("Serializer Errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ThreadListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, topic_id=None):
        paginator = PageNumberPagination()
        paginator.page_size = 15
        threads = Thread.objects.filter(id=topic_id).order_by('-updated_at') if topic_id else Thread.objects.all().order_by('-updated_at')
        result_page = paginator.paginate_queryset(threads, request)
        serializer = ThreadSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

class ThreadDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        thread = get_object_or_404(Thread, pk=pk)
        serializer = ThreadSerializer(thread)
        return Response(serializer.data)

    def put(self, request, pk):
        thread = get_object_or_404(Thread, pk=pk)
        serializer = ThreadSerializer(thread, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        thread = get_object_or_404(Thread, pk=pk)
        thread.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class PostDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        serializer = PostSerializer(post)
        return Response(serializer.data)

    def put(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        serializer = PostSerializer(post, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class PinListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, thread_id, user_id):
        pins = Pin.objects.filter(thread__id=thread_id, user__id=user_id)
        serializer = PinSerializer(pins, many=True)
        return Response(serializer.data)
class PinDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        pin = get_object_or_404(Pin, pk=pk, user=request.user)
        serializer = PinSerializer(pin)
        return Response(serializer.data)

    def delete(self, request, pk):
        pin = get_object_or_404(Pin, pk=pk, user=request.user)
        pin.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, *args, **kwargs):
        try:
            user = User.objects.get(id=pk)
            profile, created = Profile.objects.get_or_create(user=user)
            if created:
                self.fill_profile_with_random_values(profile)

        except Profile.DoesNotExist:
            return Response({"detail": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

    def put(self, request, pk, *args, **kwargs):
        try:
            profile = Profile.objects.get(user_id=pk)
        except Profile.DoesNotExist:
            return Response({"detail": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk, *args, **kwargs):
        try:
            profile = Profile.objects.get(user_id=pk)
        except Profile.DoesNotExist:
            return Response({"detail": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def fill_profile_with_random_values(self, profile):
        profile.phone_no = fake.phone_number()
        profile.personal_website = fake.url()
        profile
  
class ThreadsByTopicView(APIView):
    
    permission_classes = [AllowAny]

    def get(self, request, topic_id):
        paginator = PageNumberPagination()
        paginator.page_size = 15

        # Filter threads by topic ID
        threads = Thread.objects.filter(topic_id=topic_id).order_by('-updated_at')
        if not threads.exists():
            return Response({"detail": "No threads found for this topic."}, status=404)

        result_page = paginator.paginate_queryset(threads, request)
        serializer = ThreadSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)




class BookmarkListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        if request.user.id != user_id:
            return Response({"error": "Unauthorized access"}, status=status.HTTP_403_FORBIDDEN)
        
        bookmarks = Bookmark.objects.filter(user=request.user)
        paginator = PageNumberPagination()
        paginator.page_size = 10
        result_page = paginator.paginate_queryset(bookmarks, request)
        serializer = BookmarkSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Post, Thread
from .serializers import PostSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Ensure only authenticated users can post
def create_post(request):
    if request.method == 'POST':
        data = request.data
        thread_id = data.get('thread')
        
        try:
            thread = Thread.objects.get(id=thread_id)
        except Thread.DoesNotExist:
            return Response({"error": "Thread not found"}, status=status.HTTP_404_NOT_FOUND)
        
        # Create a new post and associate it with the thread and the user
        post = Post.objects.create(
            content=data['content'],
            thread=thread,
            creator=request.user
        )
        
        # Serialize the post and return it
        serializer = PostSerializer(post)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class BookmarkCreateDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        data['user'] = request.user.id
        serializer = BookmarkSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        thread_id = request.data.get('thread_id')
        if not thread_id:
            return Response({"error": "Thread ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            bookmark = Bookmark.objects.get(user=request.user, thread_id=thread_id)
            bookmark.delete()
            return Response({"message": "Bookmark removed successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Bookmark.DoesNotExist:
            return Response({"error": "Bookmark not found"}, status=status.HTTP_404_NOT_FOUND)
