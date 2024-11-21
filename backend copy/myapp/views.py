from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User, Profile, Job, Wishlist
from .serializers import UserSerializer, ProfileSerializer, JobSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import InvalidToken
from django.shortcuts import get_object_or_404
from .utils import send_email
from django.http import JsonResponse
import requests
import json
import os
from pathlib import Path

class RegisterUser(APIView):
    permission_classes = []

    def post(self, request):
        serializer = UserSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()

            # Send registration email
            user_email = serializer.data['email']
            subject = "Welcome to CareerSetGo!"
            plain_message = f"Hello {serializer.data['fullname']},\n\nThank you for registering on CareerSetGo. We're excited to have you!"

            html_message = f"""
            <html>
                <body>
                    <h1 style="color: #0465CC;">Welcome to CareerSetGo!</h1>
                    <p>Hello <strong>{serializer.data['fullname']}</strong>,</p>
                    <p>Thank you for registering on <strong>CareerSetGo</strong>. We're thrilled to have you on board!</p>
                    <p>Explore exciting opportunities and start your career journey with us.</p>
                    <hr>
                    <p style="font-size: 12px; color: gray;">This is an automated message. Please do not reply.</p>
                </body>
            </html>
            """

            send_email(subject, plain_message, [user_email], html_message)

            return Response({"message": "User registered successfully."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user = User.objects.get(email=email)
            if user.check_password(password):
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)

                # Send login notification email
                subject = "Login Notification"
                plain_message = f"Hello {user.fullname},\n\nYou have successfully logged into CareerSetGo."

                html_message = f"""
                <html>
                    <body>
                        <h2 style="color: #0A65CC;">Login Notification</h2>
                        <p>Hello <strong>{user.fullname}</strong>,</p>
                        <p>You have successfully logged into <strong>CareerSetGo</strong>.</p>
                        <p>If this wasn't you, please secure your account immediately.</p>
                        <hr>
                        <p style="font-size: 12px; color: gray;">This is an automated message. Please do not reply.</p>
                    </body>
                </html>
                """

                send_email(subject, plain_message, [email], html_message)

                return Response(
                    {
                        "access_token": access_token,
                        "refresh_token": str(refresh),
                        "message": "Login successful!"
                    },
                    status=status.HTTP_200_OK
                )

            return Response({"error": "Invalid email or password."}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"error": "Invalid email or password."}, status=status.HTTP_400_BAD_REQUEST)


class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        try:
            profile = user.profile
            serializer = ProfileSerializer(profile)
            return Response(serializer.data)
        except AttributeError:
            return Response({"detail": "Profile not found."}, status=404)


class UpdateProfile(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        try:
            profile = Profile.objects.get(user=user)
            return Response({"detail": "Profile already exists."}, status=status.HTTP_400_BAD_REQUEST)
        except Profile.DoesNotExist:
            data = request.data
            data['user'] = user.id
            serializer = ProfileSerializer(data=data,context={'request': request})

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        user = request.user
        try:
            profile = Profile.objects.get(user=user)
        except Profile.DoesNotExist:
            return Response({"detail": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProfileSerializer(profile, data=request.data,context={'request': request})

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            profile = Profile.objects.get(user=request.user)
            serializer = ProfileSerializer(profile)
            return Response(serializer.data)
        except Profile.DoesNotExist:
            return Response({"detail": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        if Profile.objects.filter(user=request.user).exists():
            return Response({"detail": "Profile already exists."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = ProfileSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        user = request.user
        try:
            profile = Profile.objects.get(user=user)
        except Profile.DoesNotExist:
            return Response({"detail": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProfileSerializer(profile, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            # Get refresh token from request
            refresh_token = request.data.get('refresh_token')

            # If no refresh token is provided, return error
            if not refresh_token:
                return Response({"error": "Refresh token is required."}, status=status.HTTP_400_BAD_REQUEST)

            # Try to blacklist the refresh token
            token = RefreshToken(refresh_token)
            token.blacklist()  # This will blacklist the token

            return Response({"message": "Logged out successfully!"}, status=status.HTTP_200_OK)

        except InvalidToken:
            # Handle case when the token is invalid
            return Response({"error": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)

class RecentJobsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        recent_jobs = Job.objects.order_by('-created_at')[:5]
        serializer = JobSerializer(recent_jobs, many=True)
        return Response(serializer.data)


class PostJobView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        users = User.objects.filter(role = "recruiter")
        if request.user in users:
            serializer = JobSerializer(data=request.data)
            if serializer.is_valid():
                job = serializer.save(posted_by=request.user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return JsonResponse({"message": "Not a recruiter"})
        return JsonResponse({"message": "Not a recruiter"})


class AddToWishlistView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, job_id):
        user = request.user
        job = get_object_or_404(Job, job_id=job_id)

        if Wishlist.objects.filter(user=user, job=job).exists():
            return Response({"detail": "Job is already in your wishlist."}, status=status.HTTP_400_BAD_REQUEST)

        Wishlist.objects.create(user=user, job=job)
        return Response({"detail": "Job added to wishlist."}, status=status.HTTP_201_CREATED)


class fetchcourses(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            profile = Profile.objects.get(user=request.user)
            skills = profile.skills.split(',') if profile.skills else []
            domain_of_interest = profile.domain_of_interest
            
            q = ', '.join(skills) if skills else domain_of_interest
            api_key = "your_api_key"
            response_data = []
            
            if not api_key:
                return Response(
                    {"error": "YouTube API key is not configured."},
                    status=500
                )
                
            url = f'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q={q}&key={api_key}'
            api_response = requests.get(url)
            
            if api_response.status_code == 200:
                data = api_response.json()

                for item in data.get("items", []):
                    if item["id"]["kind"] == "youtube#video":
                        response_data.append({
                            "type": "video",
                            "title": item["snippet"]["title"],
                            "description": item["snippet"]["description"],
                            "link": f"https://www.youtube.com/watch?v={item['id']['videoId']}",
                            "thumbnail": item["snippet"]["thumbnails"]["high"]["url"]
                        })
                    elif item["id"]["kind"] == "youtube#playlist":
                        response_data.append({
                            "type": "playlist",
                            "title": item["snippet"]["title"],
                            "description": item["snippet"]["description"],
                            "link": f"https://www.youtube.com/playlist?list={item['id']['playlistId']}",
                            "thumbnail": item["snippet"]["thumbnails"]["high"]["url"]
                        })

                return Response({"courses": response_data}, status=200)
            else:
                return Response(
                    {"error": "Failed to fetch courses from YouTube API."},
                    status=api_response.status_code
                )
                
        except Profile.DoesNotExist:
            return Response({"error": "User profile not found."}, status=404)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

        # response = {}       
        # r = requests.get(f'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q={skills}&key=')
        # r_status = r.status_code
        # if r_status == 200:
        #     data = r.json()
        #     print(data)
        #     response['courses'] = data
        # else:
        #     response['status'] = r.status_code
        #     response['message'] = 'error'
        #     response['credentials'] = 'Check your Api key'
        # return Response(response)
        
    