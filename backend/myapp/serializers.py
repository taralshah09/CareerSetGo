from rest_framework import serializers
from .models import User, Profile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'fullname', 'password']
        extra_kwargs = {'password': {'write_only': True}}

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
#         fields = '__all__'


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['experience']  # Include any other fields you want to update

    def validate_profile_picture(self, value):
        # Optional: Add validation for the file type or size here
        return value