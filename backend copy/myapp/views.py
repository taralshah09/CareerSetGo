from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import InvalidToken
from .models import User, Profile, Job, Wishlist
from .serializers import UserSerializer, ProfileSerializer, JobSerializer
from .utils import send_email
import requests
import json

def send_registration_email(user_email, fullname):
    subject = "Welcome to CareerSetGo!"
    plain_message = f"Hello {fullname},\n\nThank you for registering on CareerSetGo. We're excited to have you!"
    html_message = f"""
    <html>
        <body>
            <h1 style="color: #0465CC;">Welcome to CareerSetGo!</h1>
            <p>Hello <strong>{fullname}</strong>,</p>
            <p>Thank you for registering on <strong>CareerSetGo</strong>. We're thrilled to have you on board!</p>
            <p>Explore exciting opportunities and start your career journey with us.</p>
            <hr>
            <p style="font-size: 12px; color: gray;">This is an automated message. Please do not reply.</p>
        </body>
    </html>
    """
    send_email(subject, plain_message, [user_email], html_message)

def send_login_notification(user_email, fullname):
    subject = "Login Notification"
    plain_message = f"Hello {fullname},\n\nYou have successfully logged into CareerSetGo."
    html_message = f"""
    <html>
        <body>
            <h2 style="color: #0A65CC;">Login Notification</h2>
            <p>Hello <strong>{fullname}</strong>,</p>
            <p>You have successfully logged into <strong>CareerSetGo</strong>.</p>
            <p>If this wasn't you, please secure your account immediately.</p>
            <hr>
            <p style="font-size: 12px; color: gray;">This is an automated message. Please do not reply.</p>
        </body>
    </html>
    """
    send_email(subject, plain_message, [user_email], html_message)

class RegisterUser(APIView):
    permission_classes = []

    def post(self, request):
        serializer = UserSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()

            # Send registration email
            send_registration_email(serializer.data['email'], serializer.data['fullname'])
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
                send_login_notification(email, user.fullname)

                return Response(
                    {"access_token": access_token, "refresh_token": str(refresh), "message": "Login successful!"},
                    status=status.HTTP_200_OK
                )

            return Response({"error": "Invalid email or password."}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"error": "Invalid email or password."}, status=status.HTTP_400_BAD_REQUEST)

class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        profile = getattr(user, 'profile', None)
        if profile:
            serializer = ProfileSerializer(profile)
            return Response(serializer.data)
        return Response({"detail": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

class UpdateProfile(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        if Profile.objects.filter(user=user).exists():
            return Response({"detail": "Profile already exists."}, status=status.HTTP_400_BAD_REQUEST)

        data = request.data
        data['user'] = user.id
        serializer = ProfileSerializer(data=data, context={'request': request})

        if serializer.is_valid():
            # Log skills field
            skills = data.get('skills', [])
            print(f"Skills received for creation: {skills}")

            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        user = request.user
        try:
            profile = Profile.objects.get(user=user)
        except Profile.DoesNotExist:
            return Response({"detail": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

        data = {key: value for key, value in request.data.items() if value is not None}

        if "skills" in data:
            print(f"Skills received for update: {data['skills']}")

            existing_skills = profile.skills or {}
            incoming_skills = data.get("skills", {})

            if isinstance(existing_skills, dict) and isinstance(incoming_skills, dict):
                data["skills"] = {**existing_skills, **incoming_skills}

        serializer = ProfileSerializer(profile, data=data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        profile, created = Profile.objects.get_or_create(user=user)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)
    
    def patch(self, request):
        user = request.user
        try:
            profile = Profile.objects.get(user=user)
        except Profile.DoesNotExist:
            return Response({"detail": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

        # Filter out None values to preserve existing data
        data = {k: v for k, v in request.data.items() if v is not None}

        serializer = ProfileSerializer(profile, data=data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh_token = request.data.get('refresh_token')
        if not refresh_token:
            return Response({"error": "Refresh token is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            token = RefreshToken(refresh_token)
            token.blacklist()  # This will blacklist the token
            return Response({"message": "Logged out successfully!"}, status=status.HTTP_200_OK)
        except InvalidToken:
            return Response({"error": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)

class RecentJobsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        jobs = Job.objects.order_by('-created_at')[:5]
        serializer = JobSerializer(jobs, many=True)
        return Response(serializer.data)

class PostJobView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if request.user.role != "recruiter":
            return Response({"message": "Not a recruiter"}, status=status.HTTP_403_FORBIDDEN)

        serializer = JobSerializer(data=request.data)
        if serializer.is_valid():
            job = serializer.save(posted_by=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AddToWishlistView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, job_id):
        job = get_object_or_404(Job, id=job_id)
        wishlist, created = Wishlist.objects.get_or_create(user=request.user, job=job)
        message = "Job added to wishlist." if created else "Job is already in your wishlist."
        status_code = status.HTTP_201_CREATED if created else status.HTTP_400_BAD_REQUEST
        return Response({"detail": message}, status=status_code)

class fetchcourses(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            profile = Profile.objects.get(user=request.user)
            skills = profile.skills.split(',') if profile.skills else []
            domain_of_interest = profile.domain_of_interest

            q = ', '.join(skills) if skills else domain_of_interest
            api_key = "AIzaSyAWH5EDW_vnrh4zBLMGS9GAe15a-Eb2O7Y"
            response_data = []

            if not api_key:
                return Response({"error": "API Key is missing."}, status=status.HTTP_400_BAD_REQUEST)

            url = f"https://www.googleapis.com/customsearch/v1?q={q}&key={api_key}&cx=717b32d6c206643e9"
            response = requests.get(url)
            data = response.json()

            for item in data.get("items", []):
                response_data.append({
                    "title": item["title"],
                    "link": item["link"],
                    "snippet": item["snippet"],
                    "thumbnail": item.get("pagemap", {}).get("cse_image", [{}])[0].get("src", "")
                })

            return Response({"results": response_data})
        except Profile.DoesNotExist:
            return Response({"error": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)
