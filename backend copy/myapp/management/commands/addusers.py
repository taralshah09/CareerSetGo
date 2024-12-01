from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from myapp.models import Profile  # Replace 'myapp' with your actual app name
import random
import json

class Command(BaseCommand):
    help = 'Populates the database with sample users and their profiles'

    def handle(self, *args, **kwargs):
        # Clear existing users to avoid duplicates
        User = get_user_model()
        Profile.objects.all().delete()
        User.objects.exclude(email='jobposter@example.com').delete()  # Preserve recruiter for jobs

        # Sample user data
        user_data = [
            {
                'fullname': 'Alice Johnson',
                'username': 'alice',
                'email': 'alice@example.com',
                'role': 'jobseeker',
                'skills': ['Python', 'Django', 'SQL', 'JavaScript']
            },
            {
                'fullname': 'Bob Smith',
                'username': 'bob',
                'email': 'bob@example.com',
                'role': 'jobseeker',
                'skills': ['React', 'CSS', 'HTML', 'Node.js']
            },
            {
                'fullname': 'Charlie Lee',
                'username': 'charlie',
                'email': 'charlie@example.com',
                'role': 'recruiter'
            },
            {
                'fullname': 'Dana White',
                'username': 'dana',
                'email': 'dana@example.com',
                'role': 'jobseeker',
                'skills': ['AWS', 'Kubernetes', 'Docker', 'Linux']
            },
            {
                'fullname': 'Eve Adams',
                'username': 'eve',
                'email': 'eve@example.com',
                'role': 'jobseeker',
                'skills': ['Flutter', 'Kotlin', 'Swift', 'UI Design']
            }
        ]

        created_users = []
        for user_info in user_data:
            # Create the user
            user = User.objects.create(
                fullname=user_info['fullname'],
                username=user_info['username'],
                email=user_info['email'],
                role=user_info['role'],
                is_active=True
            )
            user.set_password('password123')  # Set a default password
            user.save()
            created_users.append(user)

            # Create an associated profile for jobseekers
            if user_info['role'] == 'jobseeker':
                Profile.objects.create(
                    user=user,
                    skills=json.dumps(user_info.get('skills', [])),  # Save skills as JSON
                    location=f"City {random.randint(1, 10)}",  # Example location
                    domain_of_interest=random.choice(
                        ['web_dev', 'ai_ml', 'cloud_computing', 'mobile_dev']
                    ),
                    job_type=random.choice(['remote', 'onsite', 'hybrid'])
                )

        self.stdout.write(
            self.style.SUCCESS(f'Successfully created {len(created_users)} users with profiles.')
        )
