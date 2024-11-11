from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User, Profile
from .serializers import UserSerializer, ProfileSerializer
from django.contrib.auth import authenticate, login
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt


class RegisterUser(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class LoginView(APIView):

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        try:
            user = User.objects.get(email=email)
            user = authenticate(username=user.username, password=password)
            if user is not None:
                login(request, user)
                return Response({"message": "Login successful!"}, status=status.HTTP_200_OK)
            return Response({"error": "Invalid email or password."}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"error": "Invalid email or password."}, status=status.HTTP_400_BAD_REQUEST)

class UpdateProfile(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        profile = Profile.objects.filter(user=user).first()         
        if not profile:
            profile = Profile(user=user)          
        serializer = ProfileSerializer(profile, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Profile updated successfully."}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)