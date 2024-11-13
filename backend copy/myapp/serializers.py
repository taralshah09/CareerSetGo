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
# class ProfileSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Profile
#         fields = [
#             'profile_id',
#             'user',  # Add the user field here
#             'skills',
#             'education',
#             'age',
#             'experience',
#             'twitter_link',
#             'linkedin_link',
#             'insta_link',
#             'other_link',
#             'location',
#             'role',
#             'phone_no'
#         ]
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            'profile_id',
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

    def create(self, validated_data):
        user = self.context['request'].user  
        validated_data['user'] = user  
        return super().create(validated_data)
