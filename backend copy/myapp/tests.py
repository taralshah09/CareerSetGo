from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from .models import Job, Profile, User
import json

class JobsViewTestCase(TestCase):
    def setUp(self):
        """
        Set up test data for JobsView
        """
        self.client = APIClient()
        
        # Create test users
        self.user1 = User.objects.create_user(
            username='jobseeker1', 
            email='jobseeker1@example.com', 
            password='testpass123',
            role='candidate'
        )
        
        self.user2 = User.objects.create_user(
            username='jobseeker2', 
            email='jobseeker2@example.com', 
            password='testpass123',
            role='candidate'
        )
        
        # Create profiles with different preferences
        self.profile1 = Profile.objects.create(
            user=self.user1,
            domain_of_interest='web_dev',
            job_type='remote',
            skills=json.dumps([
                {"name": "python", "score": 8, "verified": True},
                {"name": "django", "score": 7, "verified": False}
            ])
        )
        
        self.profile2 = Profile.objects.create(
            user=self.user2,
            domain_of_interest='ai_ml',
            job_type='hybrid',
            skills=json.dumps([
                {"name": "machine learning", "score": 9, "verified": True},
                {"name": "tensorflow", "score": 8, "verified": True}
            ])
        )
        
        # Create test jobs
        self.jobs = [
            Job.objects.create(
                title='Web Developer',
                description='Seeking a skilled web developer',
                company_name='Tech Corp',
                location='New York',
                skills_required='python, django, javascript',
                job_domain='web_dev',
                job_type='remote',
                is_approved=True,
                posted_by=self.user1
            ),
            Job.objects.create(
                title='AI Engineer',
                description='Machine Learning expert needed',
                company_name='AI Solutions',
                location='San Francisco',
                skills_required='machine learning, tensorflow, python',
                job_domain='ai_ml',
                job_type='hybrid',
                is_approved=True,
                posted_by=self.user2
            ),
            Job.objects.create(
                title='Data Scientist',
                description='Data analysis role',
                company_name='Data Insights',
                location='Chicago',
                skills_required='python, data analysis, sql',
                job_domain='data_science',
                job_type='onsite',
                is_approved=True,
                posted_by=self.user1
            )
        ]
    
    def test_jobs_view_unauthenticated(self):
        """
        Test JobsView for unauthenticated user
        Should return all approved jobs
        """
        response = self.client.get('/api/jobs/')  # Adjust URL as per your routing
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['jobs']), 3)  # All jobs should be returned
    
    def test_jobs_view_authenticated_personalization(self):
        """
        Test JobsView for authenticated user with personalization
        """
        # Login with user1 (web development focused)
        self.client.force_authenticate(user=self.user1)
        
        response = self.client.get('/api/jobs/')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Should prioritize web dev and remote jobs
        web_dev_jobs = [job for job in response.data['jobs'] if job['job_domain'] == 'web_dev']
        self.assertTrue(len(web_dev_jobs) > 0)
    
    def test_jobs_view_authenticated_skill_matching(self):
        """
        Test job matching based on user skills
        """
        # Login with user2 (AI/ML focused)
        self.client.force_authenticate(user=self.user2)
        
        response = self.client.get('/api/jobs/')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Should prioritize AI/ML and hybrid jobs
        ai_ml_jobs = [job for job in response.data['jobs'] if job['job_domain'] == 'ai_ml']
        self.assertTrue(len(ai_ml_jobs) > 0)
    
    def test_jobs_view_no_profile(self):
        """
        Test JobsView for authenticated user without a profile
        """
        # Create a user without a profile
        no_profile_user = User.objects.create_user(
            username='no_profile', 
            email='no_profile@example.com', 
            password='testpass123'
        )
        
        self.client.force_authenticate(user=no_profile_user)
        
        response = self.client.get('/api/jobs/')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['jobs']), 3)  # Should return all jobs
    
    def test_jobs_view_filtering(self):
        """
        Test filtering of jobs
        """
        # Test filtering by domain
        response = self.client.get('/api/jobs/?domain=web_dev')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        web_dev_jobs = [job for job in response.data['jobs'] if job['job_domain'] == 'web_dev']
        self.assertTrue(len(web_dev_jobs) > 0)
        
        # Test filtering by job type
        response = self.client.get('/api/jobs/?job_type=remote')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        remote_jobs = [job for job in response.data['jobs'] if job['job_type'] == 'remote']
        self.assertTrue(len(remote_jobs) > 0)

def print_detailed_job_info(jobs):
    """
    Helper function to print detailed job information for debugging
    """
    for job in jobs:
        print(f"Job Title: {job['title']}")
        print(f"Domain: {job['job_domain']}")
        print(f"Job Type: {job['job_type']}")
        print(f"Skills Required: {job['skills_required']}")
        print("---")
