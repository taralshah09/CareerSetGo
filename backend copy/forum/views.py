from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny, IsAuthenticated
from myapp.models import User, Profile
from .models import  Thread, Post, Pin
from .serializers import ThreadSerializer, PostSerializer, PinSerializer, ProfileSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from myapp.utils.email_utils import send_email
import random
from faker import Faker

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

class PostListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, thread_id):
        posts = Post.objects.filter(thread_id=thread_id).order_by('-created_at')
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request, thread_id):
        data = request.data.copy()
        data['thread'] = thread_id
        serializer = PostSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

    def get(self, request):
        pins = Pin.objects.filter(user=request.user)
        serializer = PinSerializer(pins, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data.copy()
        data['user'] = request.user.id
        serializer = PinSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PinDetailView(APIView):
    permission_classes = [IsAuthenticated]

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