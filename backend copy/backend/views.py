from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny, IsAuthenticated
from myapp.models import User, Profile
from forum.serializers import ThreadSerializer, PostSerializer, PinSerializer, ProfileSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from myapp.utils import send_email
import random
from rest_framework_simplejwt.exceptions import InvalidToken
from faker import Faker
from myapp.serializers import UserSerializer
fake = Faker()
import logging
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
logger = logging.getLogger(__name__)

class RegisterUser(APIView):
    permission_classes = []

    def post(self, request):
        serializer = UserSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()

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
# Configure logging

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        # Extract credentials
        email = request.data.get('email', '').strip()
        password = request.data.get('password', '')

        # Validate input
        if not email or not password:
            logger.warning(f"Login attempt with missing credentials: {email}")
            return Response(
                {"error": "Email and password are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Use Django's authenticate method for more robust authentication
            user = authenticate(username=email, password=password)
            
            if user is not None:
                # Check if user account is active
                if not user.is_active:
                    logger.warning(f"Login attempt for inactive user: {email}")
                    return Response(
                        {"error": "Account is not active. Please contact support."},
                        status=status.HTTP_403_FORBIDDEN
                    )

                # Generate tokens
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)

                # Prepare login notification email
                try:
                    self._send_login_notification(user)
                except Exception as email_error:
                    # Log email sending error but don't block login
                    logger.error(f"Failed to send login notification: {email_error}")

                # Log successful login
                logger.info(f"Successful login for user: {email}")

                return Response(
                    {
                        "access_token": access_token,
                        "refresh_token": str(refresh),
                        "message": "Login successful!"
                    },
                    status=status.HTTP_200_OK
                )

            # Authentication failed
            logger.warning(f"Failed login attempt for email: {email}")
            return Response(
                {"error": "Invalid email or password."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        except Exception as e:
            # Catch any unexpected errors
            logger.error(f"Unexpected error during login: {e}")
            return Response(
                {"error": "An unexpected error occurred. Please try again."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def _send_login_notification(self, user):
        """
        Send login notification email with error handling.
        Separated method for better code organization and testability.
        """
        from django.core.mail import send_mail  # Import here to avoid circular imports

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

        send_mail(
            subject, 
            plain_message, 
            'your-email@example.com',  # Replace with your from email
            [user.email], 
            html_message=html_message,
            fail_silently=False
        )
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
