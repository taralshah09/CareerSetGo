from rest_framework import serializers
from .models import User, Profile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
           model = User
           fields = ('email', 'password','username','fullname')

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
            'skills',
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