# from django.shortcuts import render
# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from django.contrib.auth import get_user_model, authenticate, login
# from django.views.decorators.http import require_POST
# from django.utils.decorators import method_decorator
# from django.contrib.auth.decorators import login_required
# from .models import User, Profile
# import json
# import traceback

# User = get_user_model()

# @csrf_exempt
# @require_POST
# def register_user(request):
#     try:
#         data = json.loads(request.body)
#         username = data.get('username')
#         email = data.get('email')
#         password = data.get('password')
#         fullname = data.get('fullname')

#         if not all([username, email, password, fullname]):
#             return JsonResponse({"error": "All fields are required."}, status=400)

#         if User.objects.filter(email=email).exists():
#             return JsonResponse({"error": "Email is already registered."}, status=400)

#         # Create new user
#         user = User.objects.create_user(
#             username=username,
#             email=email,
#             password=password,
#             fullname=fullname,
#         )
#         return JsonResponse({"message": "User registered successfully."}, status=201)

#     except json.JSONDecodeError:
#         return JsonResponse({"error": "Invalid JSON data."}, status=400)
#     except Exception as e:
#         print(traceback.format_exc())
#         return JsonResponse({"error": str(e)}, status=500)


# @csrf_exempt
# @require_POST
# def login_view(request):
#     try:
#         data = json.loads(request.body)
#         email = data.get('email')
#         password = data.get('password')

#         # Check if email and password are provided
#         if not all([email, password]):
#             return JsonResponse({'error': 'Both email and password are required.'}, status=400)

#         # Retrieve the username associated with the email
#         try:
#             user = User.objects.get(email=email)
#             username = user.username
#         except User.DoesNotExist:
#             return JsonResponse({'error': 'Invalid email or password.'}, status=400)

#         # Authenticate user
#         user = authenticate(request, username=username, password=password)
#         if user is not None:
#             login(request, user)
#             return JsonResponse({'message': 'Login successful!'}, status=200)
#         else:
#             return JsonResponse({'error': 'Invalid email or password.'}, status=400)

#     except json.JSONDecodeError:
#         return JsonResponse({'error': 'Invalid JSON data.'}, status=400)
#     except Exception as e:
#         print(traceback.format_exc())
#         return JsonResponse({'error': str(e)}, status=500)


# @csrf_exempt
# @login_required
# @require_POST
# def update_profile(request):
#     try:
#         user = request.user
#         data = json.loads(request.body)

#         # Get or create the profile for the user
#         profile, created = Profile.objects.get_or_create(userid=user)

#         # Update profile fields
#         profile.skills = data.get('skills', profile.skills)
#         profile.education = data.get('education', profile.education)
#         profile.age = data.get('age', profile.age)
#         profile.experience = data.get('experience', profile.experience)
#         profile.twitterlink = data.get('twitterlink', profile.twitterlink)
#         profile.linkedinlink = data.get('linkedinlink', profile.linkedinlink)
#         profile.instalink = data.get('instalink', profile.instalink)
#         profile.otherlink = data.get('otherlink', profile.otherlink)
#         profile.location = data.get('location', profile.location)
#         profile.role = data.get('role', profile.role)
#         profile.phoneno = data.get('phoneno', profile.phoneno)
        
        
#         # this will profile picture added later in modelss
#         if request.FILES.get('profile_picture'):
#             profile.profile_picture = request.FILES['profile_picture']
#         profile.save()

#         return JsonResponse({'message': 'Profile updated successfully.'}, status=200)

#     except json.JSONDecodeError:
#         return JsonResponse({'error': 'Invalid JSON data.'}, status=400)
#     except Exception as e:
#         print(traceback.format_exc())
#         return JsonResponse({'error': str(e)}, status=500)



# # @csrf_exempt
# # @require_POST
# # def gemini_view(request):
# #     genai.configure(api_key=os.environ["AIzaSyAq5ZCpp0ezmIOPtGzBW8sAt_NNZ01C9yY"])

# #     # Create the model
# #     generation_config = {
# #     "temperature": 0.9,
# #     "top_p": 1,
# #     "max_output_tokens": 2048,
# #     "response_mime_type": "text/plain",
# #     }

# #     model = genai.GenerativeModel(
# #     model_name="gemini-1.0-pro",
# #     generation_config=generation_config,
# #     # safety_settings = Adjust safety settings
# #     # See https://ai.google.dev/gemini-api/docs/safety-settings
# #     )

# #     chat_session = model.start_chat(
# #     history=[
# #         {
# #         "role": "user",
# #         "parts": [
# #             "essay on python short",
# #         ],
# #         },
# #         {
# #         "role": "model",
# #         "parts": [
# #             "## Python: A Serpent of Simplicity\n\nPython, a high-level programming language, is renowned for its readability, versatility, and ease of use. This \"serpent of simplicity\" has taken the world by storm, becoming a popular choice for beginners and seasoned programmers alike. Its elegant syntax and clear structure encourage rapid development, allowing developers to focus on problem-solving rather than code complexities.\n\nPython's power lies in its vast ecosystem of libraries and frameworks. From data science and machine learning with libraries like NumPy and Scikit-learn, to web development with Django and Flask, Python empowers developers across diverse domains. Its extensive community support and abundance of resources further solidify its position as a valuable tool for learning and innovation.\n\nHowever, Python's \"slow\" execution speed compared to compiled languages like C++ is often cited as a limitation. Nevertheless, its rapid development cycle and user-friendly nature often outweigh this drawback, especially in projects where speed is not a primary concern.\n\nIn conclusion, Python's blend of simplicity, versatility, and a thriving community makes it a formidable force in the programming world. It empowers developers of all levels to build innovative solutions with ease, solidifying its position as a language for the modern era. \n",
# #         ],
# #         },
# #     ]
# #     )

# #     response = chat_session.send_message("INSERT_INPUT_HERE")

# #     print(response.text)



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
        profile, created = Profile.objects.get_or_create(user=user)
        serializer = ProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Profile updated successfully."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
