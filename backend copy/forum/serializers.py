import logging
from rest_framework import serializers
from .models import Thread, Post, User, Pin
from myapp.models import Profile
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from myapp.serializers import UserSerializer

# Configure the logger
logger = logging.getLogger(__name__)

# Token Serializer with user details added
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        logger.debug("Validating token for user: %s", attrs.get('username', 'Unknown'))
        data = super().validate(attrs)
        data.update({'email': self.user.email})
        data.update({'username': self.user.username})
        logger.debug("Token validated with email: %s, username: %s", self.user.email, self.user.username)
        return data

# Serializer for Register User
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        logger.debug("Creating user with username: %s", validated_data['username'])
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        logger.info("User created with username: %s", user.username)
        return user

# Serializer for Post model
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

# Serializer for Pin model
class PinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pin
        fields = '__all__'

# Profile Serializer to handle user profiles
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            'user', 'profile_picture', 'phone_no', 'personal_website', 'twitter_link',
            'linkedin_link', 'insta_link', 'other_link', 'nationality', 'date_of_birth',
            'gender', 'marital_status', 'biography', 'title', 'experience', 'education',
            'domain_of_interest', 'job_type', 'skills', 'certifications', 'preferred_work_environment',
            'availability_status', 'resume', 'languages', 'location'
        ]

# Serializer for Thread model
class ThreadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thread
        fields = ['id', 'subject', 'content', 'topic', 'creator', 'created_at', 'updated_at']
