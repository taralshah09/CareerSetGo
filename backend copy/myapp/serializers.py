from rest_framework import serializers
from .models import User, Profile, Job
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
import logging

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

    # def create(self, validated_data):
    #     """Create a new user with encrypted password."""
    #     return User.objects.create_user(
    #         username=validated_data['username'],
    #         email=validated_data['email'],
    #         password=validated_data['password'],
    #         fullname=validated_data['fullname'],
    #         role=validated_data.get('role', User.RECRUITER)  # Replace hardcoding with model constants
    #     )

    def create(self, validated_data):
    # """Create a new user with encrypted password."""
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

    class Meta:
        model = Profile
        fields = [
            'fullname', 'profile_id', 'experience', 'education', 'profile_picture', 'resume', 
            'username', 'title', 'personal_website', 'nationality', 'date_of_birth', 'gender',
            'marital_status', 'biography', 'languages', 'location', 'other_link', 'insta_link',
            'twitter_link', 'linkedin_link', 'preferred_work_environment', 'availability_status',
            'certifications', 'domain_of_interest', 'skills'
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


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = [
            'job_id', 'title', 'description', 'company_name', 'location', 'salary',
            'job_type', 'job_domain', 'skills_required','created_at'
        ]

    def validate_salary(self, value):
        """Ensure salary is a positive value."""
        if value < 0:
            raise serializers.ValidationError("Salary must be a positive number.")
        return value

    def validate_skills_required(self, value):
        """Ensure skills_required is not empty."""
        if not value:
            raise serializers.ValidationError("Skills required cannot be empty.")
        return value