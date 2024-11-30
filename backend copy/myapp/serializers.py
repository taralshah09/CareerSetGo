from rest_framework import serializers
from .models import User, Profile
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        print(f"Logged in as: {user.username}")

        return token

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'password', 'username', 'fullname','role')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            fullname=validated_data['fullname'],
            role=validated_data.get('role', 'recruiter')
        )
        return user


class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    fullname = serializers.CharField(source='user.fullname', required=False)  # Allow updates to fullname

    class Meta:
        model = Profile
        fields = [
            'fullname', 'profile_id', 'experience', 'education',
            'profile_picture', 'resume', 'username', 'title', 'personal_website',
            'nationality', 'date_of_birth', 'gender', 'marital_status', 'biography', 
            'languages', 'location','other_link','insta_link','twitter_link','linkedin_link',
            'preferred_work_environment','availability_status','certifications','domain_of_interest',
'languages','skills'
        ]
        extra_kwargs = {
            'profile_picture': {'required': False},
            'resume': {'required': False},
            'experience': {'required': False},
            'education': {'required': False},
            'biography': {'required': False},
            'nationality': {'required': False},
            'date_of_birth': {'required': False},
            'gender': {'required': False},
            'marital_status': {'required': False},
            'languages': {'required': False},
            'location': {'required': False},
        }

    def update(self, instance, validated_data):
        # Extract user data
        user_data = validated_data.pop('user', {})
        fullname = user_data.get('fullname', None)

        # Update the User model
        if fullname:
            instance.user.fullname = fullname
            instance.user.save()

        # Update the Profile model
        return super().update(instance, validated_data)

from rest_framework import serializers
from .models import Job

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ['job_id','title', 'description', 'company_name', 'location', 'salary', 'job_type', 'job_domain', 'skills_required']
