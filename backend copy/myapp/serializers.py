from rest_framework import serializers
from .models import User, Profile, Job,Company,AppliedJob
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
import logging
from rest_framework.exceptions import AuthenticationFailed

logger = logging.getLogger(__name__)

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username

        logger.info(f"Token issued for user: {user.username}")
        return token

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'password', 'username', 'fullname', 'role')
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        """Create a new user with encrypted password."""
        role = validated_data.get('role', 'recruiter')  # Use string default instead

        return User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            fullname=validated_data['fullname'],
            role=role
        )

    def validate_email(self, value):
        """Validate that the email is unique."""
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def validate_username(self, value):
        """Validate username to ensure uniqueness."""
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("A user with this username already exists.")
        return value

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    fullname = serializers.CharField(source='user.fullname', required=False)
    role = serializers.CharField(source='user.role', required=False)

    class Meta:
        model = Profile
        fields = [
            'fullname', 'id', 'experience', 'education', 'profile_picture', 'resume', 
            'username', 'title', 'personal_website', 'nationality', 'date_of_birth', 'gender',
            'marital_status', 'biography', 'languages', 'location', 'other_link', 'insta_link',
            'twitter_link', 'linkedin_link', 'preferred_work_environment', 'availability_status',
            'certifications', 'domain_of_interest', 'skills','role'
        ]
        
        extra_kwargs = {
            field: {'required': False} for field in [
                'profile_picture', 'resume', 'experience', 'education', 'biography', 
                'nationality', 'date_of_birth', 'gender', 'marital_status', 'languages', 
                'location', 'other_link', 'insta_link', 'twitter_link', 'linkedin_link',
                'preferred_work_environment', 'availability_status', 'certifications',
                'domain_of_interest', 'skills'
            ]
        }

    def update(self, instance, validated_data):
        """Update Profile and related User fields."""
        user_data = validated_data.pop('user', {})
        fullname = user_data.get('fullname')

        if fullname:
            instance.user.fullname = fullname
            instance.user.save()

        # Update Profile fields
        return super().update(instance, validated_data)

      
class SkillGapAnalysisSerializer(serializers.Serializer):
    job_id = serializers.IntegerField()
    user_id = serializers.IntegerField()
    job_skills = serializers.ListField(
        child=serializers.CharField(max_length=100),
        allow_empty=False
    )
    user_skills = serializers.ListField(
        child=serializers.CharField(max_length=100),
        allow_empty=False
    )


class SkillGapAnalysisSerializer(serializers.Serializer):
    job_id = serializers.IntegerField(required=True, min_value=1)
    user_id = serializers.IntegerField(required=True, min_value=1)
    job_skills = serializers.ListField(
        child=serializers.CharField(max_length=100, allow_null=False, allow_blank=False),
        required=True,
        allow_empty=False,
        min_length=1
    )
    user_skills = serializers.ListField(
        child=serializers.CharField(max_length=100, allow_null=False, allow_blank=False),
        required=True,
        allow_empty=False,
        min_length=1
    )

    def validate_job_skills(self, value):
        # Additional custom validation for job skills
        if not value:
            raise serializers.ValidationError("Job skills list cannot be empty.")
        return value

    def validate_user_skills(self, value):
        # Additional custom validation for user skills
        if not value:
            raise serializers.ValidationError("User skills list cannot be empty.")
        return value

    def validate(self, data):
        # Additional cross-field validation if needed
        if 'job_skills' in data and 'user_skills' in data:
            # Example of additional validation
            if len(data['job_skills']) > 50 or len(data['user_skills']) > 50:
                raise serializers.ValidationError("Skills lists cannot exceed 50 items.")
        return data

class CompanySerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)  # Set automatically to the logged-in user

    class Meta:
        model = Company
        fields = [
            'user', 'company_id', 'name', 'about_us', 'org_type', 'industry_type', 'team_size', 
            'years_of_experience', 'logo', 'banner_image', 'website', 'company_email', 'company_phone', 
            'location', 'map_location', 'company_vision', 'linkedin_profile', 'twitter_profile', 
            'facebook_profile', 'instagram_profile', 'created_at', 'updated_at',
        ]
        read_only_fields = ['created_at', 'updated_at']

    def validate_user(self, value):
        if value.role != 'recruiter':
            raise serializers.ValidationError("Only recruiters can own a company profile.")
        return value
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

    def update(self, instance, validated_data):
        # Only update fields provided in the request
        return super().update(instance, validated_data)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers
from django.conf import settings
import os


# Define a serializer for the Job model
class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = "__all__"

