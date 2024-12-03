from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.core.mail import EmailMultiAlternatives
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
            # Check if the profile already exists
            profile = Profile.objects.get(user=user)
            return Response({"detail": "Profile already exists."}, status=status.HTTP_400_BAD_REQUEST)
        except Profile.DoesNotExist:
            # Create a new profile
            data = request.data
            data['user'] = user.id
            serializer = ProfileSerializer(data=data, context={'request': request})

            if serializer.is_valid():
                # Log skills field
                skills = data.get('skills')
                print(f"Skills received for creation: {skills}")

                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        user = request.user
        try:
            # Retrieve the user's profile
            profile = Profile.objects.get(user=user)
        except Profile.DoesNotExist:
            return Response({"detail": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

        # Update the profile
        data = request.data
        if "skills" in data:
            # Log the incoming skills data
            print(f"Skills received for update: {data['skills']}")

            # Merge the existing and new skills if required (custom logic can be added here)
            existing_skills = profile.skills or {}
            incoming_skills = data.get("skills", {})
            
            if isinstance(existing_skills, dict) and isinstance(incoming_skills, dict):
                data["skills"] = {**existing_skills, **incoming_skills}
        print(f"Skills received for update: {data['skills']}")
        # Remove fields with `null` values to retain existing data
        data = {key: value for key, value in data.items() if value is not None}

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
        if created:
            profile.save()
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
        # for skill in data['skills']:
        #             print(f"Skill: {skill['name']}, Score: {skill['score']}, Verified: {skill['verified']}")
        # print(data['skills'])
        # if 'skills' in data:
                #  update_skill_score(user, 'java', 5)
        print_skills_from_db(user)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
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
        """
        Fetches the 5 most recent job postings.
        """
        jobs = Job.objects.order_by('-created_at')[:5]
        serializer = JobSerializer(jobs, many=True)
        return Response(serializer.data)

class JobsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        try:
            profile = Profile.objects.get(user=request.user)
        except Profile.DoesNotExist:
            return Response({"detail": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)
        
        user_skills = profile.skills if isinstance(profile.skills, list) else json.loads(profile.skills)
        print(f"User Skills: {user_skills}")

        user_skill_names = {skill['name'].lower() for skill in user_skills}
        print(f"User Skill Names: {user_skill_names}")

        jobs = Job.objects.order_by('-created_at')

        matching_jobs = []

        for job in jobs:
            job_required_skills = job.skills_required.split(",") 
            job_required_skills = {skill.strip().lower() for skill in job_required_skills}  

            matching_skills = user_skill_names.intersection(job_required_skills)
            print(f"Matching Skills for {job.title}: {matching_skills}")

            if matching_skills:
                matching_jobs.append(job)

        if matching_jobs:
            serializer = JobSerializer(matching_jobs, many=True)
            return Response({
                "jobs" : serializer.data
            })
        else:
            return Response({"message": "No matching jobs found."}, status=status.HTTP_404_NOT_FOUND)

class PostJobView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Check if the user is a recruiter
        if request.user.role != "recruiter":
            return Response({"message": "Not a recruiter"}, status=status.HTTP_403_FORBIDDEN)

        # Serialize and validate the data
        serializer = JobSerializer(data=request.data)
        if serializer.is_valid():
            job = serializer.save(posted_by=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # Return validation errors
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AddToWishlistView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, job_id):
        """
        Adds a job to the user's wishlist.
        """
        job = get_object_or_404(Job, job_id=job_id)
        wishlist, created = Wishlist.objects.get_or_create(user=request.user, job=job)
        if created:
            return Response({"detail": "Job added to wishlist."}, status=status.HTTP_201_CREATED)
        return Response({"detail": "Job is already in your wishlist."}, status=status.HTTP_400_BAD_REQUEST)

class fetchcourses(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            profile = Profile.objects.get(user=request.user)
            skills = profile.skills.split(',') if profile.skills else []
            domain_of_interest = profile.domain_of_interest
            
            q = ', '.join(skills) if skills else domain_of_interest
            api_key = "AIzaSyAWH5EDW_vnrh4zBLMGS9GAe15a-Eb2O7Y"
            url = f'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q={q}&key=AIzaSyAWH5EDW_vnrh4zBLMGS9GAe15a-Eb2O7Y'
            response_data = []
            
            if not api_key:
                return Response(
                    {"error": "YouTube API key is not configured."},
                    status=500
                )
                
                
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
                print(response_data)
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
        
    
def print_skills_from_db(user):
    try:
        profile = Profile.objects.get(user=user)
        skills = profile.skills  # Fetch the JSONField data

        # Debugging: Check the type of skills
        print(f"Skills data type: {type(skills)}")
        print(f"Skills content: {skills}")
        if isinstance(skills, str):
            # If it's a string, parse it into JSON
            import json
            skills = json.loads(skills)

        if skills:
            for skill in skills:
                print(f"Skill: {skill['name']}, Score: {skill['score']}, Verified: {skill['verified']}")
        else:
            print("No skills found for this user.")
    except Profile.DoesNotExist:
        print("Profile not found for the given user.")
    except Exception as e:
        print(f"Error: {e}")
        
        
class UpdateSkillScore(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        user = request.user
        
        try:
            profile = Profile.objects.get(user=user)
        except Profile.DoesNotExist:
            return Response({"detail": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

        skills_data = request.data.get("skills")
        if not skills_data:
            return Response({"detail": "Skills data is required."}, status=status.HTTP_400_BAD_REQUEST)

        if isinstance(skills_data, list):
            for skill_data in skills_data:
                skill_name = skill_data.get("name")
                new_score = skill_data.get("score")

                if skill_name and new_score is not None:
                    # Automatically set verified based on the score
                    verified = new_score > 8  # Set verified to True if score > 5, otherwise False

                    updated = False
                    if profile.skills:
                        if isinstance(profile.skills, str):
                            profile.skills = json.loads(profile.skills)

                        # Update the skill if it exists in the user's profile
                        for skill in profile.skills:
                            if skill["name"] == skill_name:
                                skill["score"] = new_score
                                skill["verified"] = verified
                                updated = True
                                break
                        
                        # If the skill does not exist, add it to the list
                        if not updated:
                            profile.skills.append({
                                "name": skill_name,
                                "score": new_score,
                                "verified": verified
                            })

                        profile.skills = json.dumps(profile.skills)  # Convert back to JSON string if needed
                        profile.save()

                    return Response({"detail": "Skill score updated successfully."}, status=status.HTTP_200_OK)
                
                else:
                    return Response({"detail": "Invalid skill data."}, status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response({"detail": "Skills data should be a list."}, status=status.HTTP_400_BAD_REQUEST)
