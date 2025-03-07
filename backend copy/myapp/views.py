from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .models import  Profile, Job, Wishlist,Company,AppliedJob
from .serializers import  ProfileSerializer, JobSerializer, SkillGapAnalysisSerializer,CompanySerializer
from .utils.email_utils import send_email  
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

class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        profile = getattr(user, 'profile', None)
        if profile:
            serializer = ProfileSerializer(profile)
            return Response(serializer.data)
        return Response({"detail": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

# Example: UpdateProfile view
class UpdateProfile(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        user = request.user
        profile, created = Profile.objects.get_or_create(user=user)  # Better than checking exists()
        
        serializer = ProfileSerializer(profile, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            send_registration_email(user.email, user.fullname)
            return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        user = request.user
        profile = get_object_or_404(Profile, user=user)  # Simpler error handling
        
        serializer = ProfileSerializer(profile, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
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
        # for skill in data['skills']:
        #             print(f"Skill: {skill['name']}, Score: {skill['score']}, Verified: {skill['verified']}")
        print(data)
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
        refresh_token = request.data.get('refresh_token')
        if not refresh_token:
            return Response({"error": "Refresh token is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            token = RefreshToken(refresh_token)
            token.blacklist()  
            return Response({"message": "Logged out successfully!"}, status=status.HTTP_200_OK)
        except InvalidToken:
            return Response({"error": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)

from django.core.cache import cache

class RecentJobsView(APIView):
    def get(self, request):
        cache_key = 'recent_jobs'
        jobs = cache.get(cache_key)
        
        if not jobs:
            jobs = Job.objects.order_by('-created_at')[:5]
            serializer = JobSerializer(jobs, many=True)
            cache.set(cache_key, serializer.data, timeout=3600)  # Cache for 1 hour
            return Response(serializer.data)
        return Response(jobs)
           
            
# class JobsView(APIView):
#     permission_classes = [IsAuthenticated]

#     def normalize_skills(self, skills):
#         """Normalize skills to a set of lowercase strings, handling different input formats."""
#         if isinstance(skills, str):
#             try:
#                 skills = json.loads(skills)
#             except json.JSONDecodeError:
#                 # If it's a comma-separated string
#                 return {s.strip().lower() for s in skills.split(',')}

#         if isinstance(skills, list):
#             # Handle list of dictionaries with 'name' key
#             if skills and isinstance(skills[0], dict) and 'name' in skills[0]:
#                 return {skill['name'].strip().lower() for skill in skills}
#             # Handle list of strings
#             return {skill.strip().lower() for skill in skills}
            
#         return set()

#     def get(self, request):
#         try:
#             # Get user profile
#             profile = Profile.objects.get(user=request.user)
            
#             # Normalize user skills
#             user_skills = self.normalize_skills(profile.skills)
#             print(f"Normalized User Skills: {user_skills}")
            
#             # Get all jobs and sort by creation date
#             jobs = Job.objects.order_by('-created_at')
            
#             matching_jobs = []
#             for job in jobs:
#                 # Normalize job skills
#                 job_skills = self.normalize_skills(job.skills_required)
#                 print(f"Job ID {job.job_id} - {job.title}")
#                 print(f"Normalized Job Skills: {job_skills}")
                
#                 # Find matching skills
#                 matching_skills = user_skills.intersection(job_skills)
#                 print(f"Matching Skills: {matching_skills}")
                
#                 if matching_skills:
#                     # Calculate match percentage
#                     match_percentage = (len(matching_skills) / len(job_skills)) * 100
#                     job.match_percentage = round(match_percentage, 1)
#                     matching_jobs.append(job)
            
#             if matching_jobs:
#                 # Sort by match percentage
#                 matching_jobs.sort(key=lambda x: x.match_percentage, reverse=True)
#                 serializer = JobSerializer(matching_jobs, many=True)
                
#                 return Response({
#                     "jobs": serializer.data,
#                     "total_matches": len(matching_jobs)
#                 })
            
#             return Response({
#                 "message": "No matching jobs found.",
#                 "user_skills": list(user_skills)  # Include for debugging
#             }, status=status.HTTP_404_NOT_FOUND)
            
#         except Profile.DoesNotExist:
#             return Response(
#                 {"detail": "Profile not found."}, 
#                 status=status.HTTP_404_NOT_FOUND
#             )
#         except Exception as e:
#             return Response(
#                 {"detail": f"An error occurred: {str(e)}"}, 
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )

# class JobsView(APIView):
#     permission_classes = [IsAuthenticated]

#     def extract_skills_from_json(self, skills_json):
#         """
#         Extract skills from JSON-formatted string
#         Handles complex skill representations
#         """
#         try:
#             # Parse JSON string
#             skills_list = json.loads(skills_json)
            
#             # Extract skill names, handling different input formats
#             if isinstance(skills_list, list):
#                 # Handle list of dictionaries with 'name' key
#                 if skills_list and isinstance(skills_list[0], dict) and 'name' in skills_list[0]:
#                     skills = [skill['name'].strip().lower() for skill in skills_list]
#                 # Handle list of strings
#                 else:
#                     skills = [str(skill).strip().lower() for skill in skills_list]
            
#             # Handle single dictionary
#             elif isinstance(skills_list, dict):
#                 skills = [str(skill).strip().lower() for skill in skills_list.values()]
            
#             # Handle string input
#             else:
#                 skills = [str(skills_list).strip().lower()]
            
#             # Remove any empty skills
#             return [skill for skill in skills if skill]
        
#         except (json.JSONDecodeError, TypeError, AttributeError):
#             # Fallback for non-JSON or malformed input
#             return []

#     def normalize_skill_matching(self, user_skills, job_skills):
#         """
#         Advanced skill matching with multiple strategies
#         """
#         # Convert skills to lowercase for case-insensitive matching
#         user_skills = set(user_skills)
#         job_skills = set(job_skills)
        
#         # Strategy 1: Exact match
#         exact_matches = user_skills.intersection(job_skills)
        
#         # Strategy 2: Partial match (substring detection)
#         partial_matches = set()
#         for user_skill in user_skills:
#             for job_skill in job_skills:
#                 if user_skill in job_skill or job_skill in user_skill:
#                     partial_matches.add(user_skill)
        
#         # Combine matches
#         all_matches = exact_matches.union(partial_matches)
        
#         # Calculate match percentage
#         if job_skills:
#             match_percentage = (len(all_matches) / len(job_skills)) * 100
#         else:
#             match_percentage = 0
        
#         return round(match_percentage, 1), list(all_matches)

#     def get(self, request):
#         try:
#             # Retrieve user profile
#             profile = Profile.objects.get(user=request.user)
            
#             # Extract user skills from JSON
#             user_skills = self.extract_skills_from_json(json.dumps(profile.skills)) if profile.skills else []
            
#             # Retrieve approved jobs
#             jobs = Job.objects.filter(is_approved=True).order_by('-created_at')
            
#             # Matching jobs container
#             matching_jobs = []
            
#             # Process each job
#             for job in jobs:
#                 # Extract job skills
#                 job_skills = self.extract_skills_from_json(json.dumps(job.skills_required)) if job.skills_required else []
                
#                 # Perform skill matching
#                 match_percentage, matched_skills = self.normalize_skill_matching(user_skills, job_skills)
                
#                 # Add jobs with any skill match
#                 if match_percentage > 0:
#                     # Dynamically add match information to job
#                     job.match_percentage = match_percentage
#                     job.matched_skills = matched_skills
#                     matching_jobs.append(job)
            
#             # Sort jobs by match percentage
#             matching_jobs.sort(key=lambda x: x.match_percentage, reverse=True)
            
#             # Prepare response
#             if matching_jobs:
#                 serializer = JobSerializer(matching_jobs, many=True, context={
#                     'request': request,
#                     'matched_skills': True
#                 })
                
#                 return Response({
#                     "jobs": serializer.data,
#                     "total_matches": len(matching_jobs),
#                     "user_skills": user_skills
#                 })
            
#             # No matching jobs
#             return Response({
#                 "message": "No matching jobs found.",
#                 "user_skills": user_skills
#             }, status=status.HTTP_404_NOT_FOUND)
        
#         except Profile.DoesNotExist:
#             return Response(
#                 {"detail": "Profile not found."}, 
#                 status=status.HTTP_404_NOT_FOUND
#             )
#         except Exception as e:
#             return Response(
#                 {"detail": f"An error occurred: {str(e)}"}, 
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )


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
        profile = get_object_or_404(Profile, user=request.user)
        skills_data = request.data.get('skills')
        
        if not skills_data:
            return Response({"error": "Skills data required"}, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            current_skills = profile.skills if profile.skills else []
            if isinstance(current_skills, str):
                current_skills = json.loads(current_skills)
                
            updated_skills = self._update_skills(current_skills, skills_data)
            profile.skills = updated_skills
            profile.save()
            
            return Response({"message": "Skills updated successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Skill update failed: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def _update_skills(self, current_skills, new_skills_data):
        skills_dict = {skill['name']: skill for skill in current_skills}
        
        for skill_data in new_skills_data:
            name = skill_data.get('name')
            score = skill_data.get('score')
            
            if name and score is not None:
                skills_dict[name] = {
                    'name': name,
                    'score': score,
                    'verified': score > 8
                }
                
        return list(skills_dict.values())
    
    
import logging
import traceback
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import SkillGapAnalysisSerializer
from .utils.skill_gap_analysis import skill_gap_analysis

# class SkillGapAnalysisView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         serializer = SkillGapAnalysisSerializer(data=request.data)
        
#         if serializer.is_valid():
#             job_skills = serializer.validated_data['job_skills']
#             user_skills = serializer.validated_data['user_skills']
#             job_id = serializer.validated_data['job_id']
#             user_id = serializer.validated_data['user_id']

#             # Call the external function
#             analysis_result = skill_gap_analysis(user_skills, job_skills)

#             return Response({
#                 'job_id': job_id,
#                 'user_id': user_id,
#                 'matching_skills': analysis_result['matched_skills'],
#                 'missing_skills': analysis_result['missing_skills'],
#                 'skill_completeness': analysis_result['match_percentage']
#             }, status=status.HTTP_200_OK)
        
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
logger = logging.getLogger(__name__)

class SkillGapAnalysisView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            # Log the incoming request data (be cautious with sensitive information)
            logger.info(f"Received skill gap analysis request from user: {request.user.id}")
            
            # Validate serializer
            serializer = SkillGapAnalysisSerializer(data=request.data)
            
            # Detailed validation with specific error handling
            if not serializer.is_valid():
                # Log validation errors
                logger.warning(f"Validation errors: {serializer.errors}")
                return Response({
                    'error': 'Invalid input',
                    'details': serializer.errors
                }, status=status.HTTP_400_BAD_REQUEST)

            # Extract validated data
            validated_data = serializer.validated_data
            job_skills = validated_data['job_skills']
            user_skills = validated_data['user_skills']
            job_id = validated_data['job_id']
            user_id = validated_data['user_id']

            # Log skills for debugging
            logger.debug(f"Job Skills: {job_skills}")
            logger.debug(f"User Skills: {user_skills}")

            try:
                # Call the skill gap analysis function with error handling
                analysis_result = skill_gap_analysis(user_skills, job_skills)
            except Exception as analysis_error:
                # Log any errors in skill gap analysis
                logger.error(f"Skill gap analysis error: {str(analysis_error)}")
                logger.error(traceback.format_exc())
                
                return Response({
                    'error': 'Skill gap analysis failed',
                    'message': str(analysis_error)
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            # Validate analysis result structure
            if not all(key in analysis_result for key in ['matched_skills', 'missing_skills', 'match_percentage']):
                logger.error(f"Unexpected analysis result structure: {analysis_result}")
                return Response({
                    'error': 'Invalid analysis result',
                    'details': analysis_result
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            # Log successful analysis
            logger.info(f"Skill gap analysis completed for User {user_id}, Job {job_id}")

            # Return analysis result
            return Response({
                'job_id': job_id,
                'user_id': user_id,
                'matching_skills': analysis_result['matched_skills'],
                'missing_skills': analysis_result['missing_skills'],
                'skill_completeness': analysis_result['match_percentage']
            }, status=status.HTTP_200_OK)

        except Exception as e:
            # Catch-all for any unexpected errors
            logger.critical(f"Unexpected error in skill gap analysis: {str(e)}")
            logger.critical(traceback.format_exc())
            
            return Response({
                'error': 'An unexpected error occurred',
                'message': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CompanyView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            company = Company.objects.get(user=request.user)
            serializer = CompanySerializer(company)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Company.DoesNotExist:
            return Response({"detail": "Company profile not found."}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        if Company.objects.filter(user=request.user).exists():
            return Response({"detail": "Company profile already exists."}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = CompanySerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        try:
            company = Company.objects.get(user=request.user)
        except Company.DoesNotExist:
            return Response({"detail": "Company profile not found."}, status=status.HTTP_404_NOT_FOUND)

        data = {key: value for key, value in request.data.items() if value is not None}
        serializer = CompanySerializer(company, data=data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ApplyForJobView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, job_id):
        user = request.user

        # Check if the job exists
        try:
            job = Job.objects.get(job_id=job_id)
        except Job.DoesNotExist:
            return Response({'error': 'Job not found.'}, status=status.HTTP_404_NOT_FOUND)

        # Check if the user has already applied for the job
        if AppliedJob.objects.filter(user=user, job=job).exists():
            return Response({'error': 'You have already applied for this job.'}, status=status.HTTP_400_BAD_REQUEST)

        # Create a new application
        AppliedJob.objects.create(user=user, job=job)

        return Response({'message': 'Job application submitted successfully.'}, status=status.HTTP_201_CREATED)


# Import the EnhancedJobRecommendationSystem class (assumed already implemented)

from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from .models import Job, Profile, User
from django.contrib.auth import get_user_model

class JobRecommendationAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        profile = get_object_or_404(Profile, user=request.user)
        
        # Build base query
        jobs = Job.objects.filter(is_approved=True)
        
        # Apply filters
        if profile.domain_of_interest:
            jobs = jobs.filter(job_domain=profile.domain_of_interest)
            
        if profile.job_type:
            jobs = jobs.filter(job_type=profile.job_type)
            
        if profile.skills:
            skills_query = Q()
            user_skills = [skill['name'].lower() for skill in profile.skills]
            for skill in user_skills:
                skills_query |= Q(skills_required__icontains=skill)
            jobs = jobs.filter(skills_query)
            
        # Add scoring
        jobs = jobs.annotate(
            relevance_score=Count('id')  # Add more sophisticated scoring
        ).order_by('-relevance_score', '-created_at')[:10]
        
        serializer = JobSerializer(jobs, many=True)
        return Response({
            'recommendations': serializer.data,
            'total': jobs.count()
        })
    def get(self, request):
        # Get the current user's profile
        try:
            user_profile = Profile.objects.get(user=request.user)
        except Profile.DoesNotExist:
            return Response({'error': 'User profile not found'}, status=404)
        
        # Extract user preferences and skills
        user_skills = user_profile.skills or []
        preferred_domain = user_profile.domain_of_interest
        preferred_job_type = user_profile.job_type
        
        # Build a queryset for job recommendations
        recommended_jobs = Job.objects.filter(is_approved=True)
        
        # Filter by user's preferred domain
        if preferred_domain:
            recommended_jobs = recommended_jobs.filter(job_domain=preferred_domain)
        
        # Filter by job type preference
        if preferred_job_type:
            recommended_jobs = recommended_jobs.filter(job_type=preferred_job_type)
        
        # Additional filtering based on skills match
        if user_skills:
            # Create a complex query to match skills
            skills_query = Q()
            for skill in user_skills:
                skills_query |= Q(skills_required__icontains=skill)
            
            recommended_jobs = recommended_jobs.filter(skills_query)
        
        # Further refine recommendations
        # You can add more sophisticated matching logic here
        # For example, sorting by relevance, date, etc.
        recommended_jobs = recommended_jobs.order_by('-created_at')[:10]
        
        # Serialize job recommendations
        recommendations = []
        for job in recommended_jobs:
            recommendations.append({
                'job_id': job.job_id,
                'title': job.title,
                'company_name': job.company_name,
                'location': job.location,
                'job_domain': job.get_job_domain_display(),
                'job_type': job.get_job_type_display(),
                'skills_required': job.skills_required,
                'salary': float(job.salary) if job.salary else None,
                'description': job.description
            })
        
        return Response({
            'recommendations': recommendations,
            'total_recommendations': len(recommendations)
        })



    def get(self, request):
        # Get the current user's profile
        try:
            user_profile = Profile.objects.get(user=request.user)
        except Profile.DoesNotExist:
            return Response({'error': 'User profile not found'}, status=404)
        
        # Extract user preferences and skills
        user_skills = user_profile.skills or []
        preferred_domain = user_profile.domain_of_interest
        preferred_job_type = user_profile.job_type
        
        # Build a queryset for job recommendations
        recommended_jobs = Job.objects.filter(is_approved=True)
        
        # Filter by user's preferred domain
        if preferred_domain:
            recommended_jobs = recommended_jobs.filter(job_domain=preferred_domain)
        
        # Filter by job type preference
        if preferred_job_type:
            recommended_jobs = recommended_jobs.filter(job_type=preferred_job_type)
        
        # Additional filtering based on skills match
        if user_skills:
            # Create a complex query to match skills
            skills_query = Q()
            for skill in user_skills:
                skills_query |= Q(skills_required__icontains=skill)
            
            recommended_jobs = recommended_jobs.filter(skills_query)
        
        # Further refine recommendations
        # You can add more sophisticated matching logic here
        # For example, sorting by relevance, date, etc.
        recommended_jobs = recommended_jobs.order_by('-created_at')[:10]
        
        # Serialize job recommendations
        recommendations = []
        for job in recommended_jobs:
            recommendations.append({
                'job_id': job.job_id,
                'title': job.title,
                'company_name': job.company_name,
                'location': job.location,
                'job_domain': job.get_job_domain_display(),
                'job_type': job.get_job_type_display(),
                'skills_required': job.skills_required,
                'salary': float(job.salary) if job.salary else None,
                'description': job.description
            })
        
        return Response({
            'recommendations': recommendations,
            'total_recommendations': len(recommendations)
        })