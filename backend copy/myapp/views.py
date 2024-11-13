from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User, Profile
from .serializers import UserSerializer, ProfileSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication


class RegisterUser(APIView):
    permission_classes = [] 
    def post(self, request):
        serializer = UserSerializer(data=request.data, context={'request': request})  # Add context here
        if serializer.is_valid():
            serializer.save()
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
                # Generate JWT token
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)
                return Response({"access_token": access_token, "message": "Login successful!"}, status=status.HTTP_200_OK)
            return Response({"error": "Invalid email or password."}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"error": "Invalid email or password."}, status=status.HTTP_400_BAD_REQUEST)

class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        try:
            profile = user.profile  # Assuming Profile is linked to the User model
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
            serializer = ProfileSerializer(data=data)

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

        serializer = ProfileSerializer(profile, data=request.data)

        if serializer.is_valid():
            serializer.save()  # Save the updated profile data
            return Response(serializer.data)  # Return the updated profile data
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

        serializer = ProfileSerializer(data=request.data, context={'request': request})  # Add context here
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

        serializer = ProfileSerializer(profile, data=request.data, partial=True, context={'request': request})  # Add context here
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
