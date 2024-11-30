from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.utils import timezone
from myapp.models import Job  # Replace 'yourapp' with your actual app name

class Command(BaseCommand):
    help = 'Populates the job feed with sample job listings'

    def handle(self, *args, **kwargs):
        # Clear existing jobs to avoid duplicates
        Job.objects.all().delete()

        # Get or create a recruiter user to post jobs
        User = get_user_model()
        recruiter, created = User.objects.get_or_create(
            username='job_poster',
            email='jobposter@example.com',
            defaults={
                'role': 'recruiter',
                'fullname': 'Job Poster',
                'is_active': True
            }
        )
        if created:
            recruiter.set_password('password123')
            recruiter.save()

        # Expanded sample job data
        job_data = [
            {
                'title': 'Senior Machine Learning Engineer',
                'description': 'Develop cutting-edge AI models and solutions.',
                'company_name': 'AI Hub Inc.',
                'location': 'San Francisco, CA',
                'salary': 160000.00,
                'skills_required': 'Python, TensorFlow, PyTorch, Neural Networks',
                'job_domain': 'ai_ml',
                'job_type': 'remote'
            },
            {
                'title': 'Frontend Developer',
                'description': 'Design and build user-facing features for web apps.',
                'company_name': 'Bright Web Studios',
                'location': 'Austin, TX',
                'salary': 90000.00,
                'skills_required': 'React, CSS, HTML, JavaScript',
                'job_domain': 'web_dev',
                'job_type': 'hybrid'
            },
            {
                'title': 'Blockchain Engineer',
                'description': 'Build decentralized applications using blockchain technology.',
                'company_name': 'ChainWorks',
                'location': 'Miami, FL',
                'salary': 140000.00,
                'skills_required': 'Solidity, Ethereum, Cryptography, Rust',
                'job_domain': 'blockchain',
                'job_type': 'remote'
            },
            {
                'title': 'Mobile App Developer',
                'description': 'Create feature-rich mobile applications for Android and iOS.',
                'company_name': 'Appify Co.',
                'location': 'Los Angeles, CA',
                'salary': 115000.00,
                'skills_required': 'Flutter, React Native, Swift, Kotlin',
                'job_domain': 'mobile_dev',
                'job_type': 'onsite'
            },
            {
                'title': 'Cloud Architect',
                'description': 'Design cloud infrastructure for scalability and performance.',
                'company_name': 'CloudScape Inc.',
                'location': 'Seattle, WA',
                'salary': 155000.00,
                'skills_required': 'AWS, Azure, Kubernetes, Docker',
                'job_domain': 'cloud_computing',
                'job_type': 'hybrid'
            },
            {
                'title': 'Digital Marketing Specialist',
                'description': 'Plan and execute digital marketing campaigns.',
                'company_name': 'AdWise Digital',
                'location': 'Boston, MA',
                'salary': 75000.00,
                'skills_required': 'SEO, Google Ads, Content Marketing, Analytics',
                'job_domain': 'digital_marketing',
                'job_type': 'remote'
            },
            {
                'title': 'Cybersecurity Specialist',
                'description': 'Enhance system security to combat evolving cyber threats.',
                'company_name': 'SecureNet',
                'location': 'New York, NY',
                'salary': 135000.00,
                'skills_required': 'Penetration Testing, SIEM, Threat Intelligence',
                'job_domain': 'cyber_security',
                'job_type': 'onsite'
            },
            {
                'title': 'HealthTech Analyst',
                'description': 'Analyze and optimize digital health solutions.',
                'company_name': 'MedTech Solutions',
                'location': 'San Diego, CA',
                'salary': 90000.00,
                'skills_required': 'Healthcare Data, EHR Systems, Python, SQL',
                'job_domain': 'healthtech',
                'job_type': 'hybrid'
            },
            {
                'title': 'UI/UX Researcher',
                'description': 'Conduct user research to improve application design.',
                'company_name': 'DesignExperts',
                'location': 'Chicago, IL',
                'salary': 95000.00,
                'skills_required': 'User Research, Usability Testing, Design Thinking',
                'job_domain': 'ux_ui',
                'job_type': 'remote'
            },
            {
                'title': 'Financial Data Analyst',
                'description': 'Extract insights from financial data to aid decision-making.',
                'company_name': 'FinData Analytics',
                'location': 'Houston, TX',
                'salary': 85000.00,
                'skills_required': 'Excel, Python, R, Data Visualization',
                'job_domain': 'fintech',
                'job_type': 'onsite'
            }
        ]

        # Create job listings
        created_jobs = []
        for job in job_data:
            new_job = Job.objects.create(
                title=job['title'],
                description=job['description'],
                company_name=job['company_name'],
                location=job['location'],
                salary=job['salary'],
                posted_by=recruiter,
                skills_required=job['skills_required'],
                job_domain=job['job_domain'],
                job_type=job['job_type'],
                is_approved=True  # Automatically approve these sample jobs
            )
            created_jobs.append(new_job)

        self.stdout.write(
            self.style.SUCCESS(f'Successfully created {len(created_jobs)} job listings.')
        )
