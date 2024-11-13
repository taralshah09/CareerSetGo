from rest_framework import serializers
from .models import User, Profile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'password', 'username', 'fullname')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            fullname=validated_data['fullname'],
        )
        return user

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            'profile_id',
            'skills',
            'resume',
            'domain_of_interest',
            'profile_picture',
            'job_type',
            'education',
            'age',
            'experience',
            'twitter_link',
            'linkedin_link',
            'insta_link',
            'other_link',
            'location',
            'role',
            'phone_no'
        ]

    def create(self, validated_data):
        user = self.context['request'].user  
        validated_data['user'] = user  
        return super().create(validated_data)


from rest_framework import serializers
from .models import Job

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ['job_id','title', 'description', 'company_name', 'location', 'salary', 'job_type', 'job_domain', 'skills_required']
