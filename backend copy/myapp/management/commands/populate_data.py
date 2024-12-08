import random
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db import transaction
from faker import Faker

from myapp.models import Job, Profile, Wishlist, AppliedJob  # Replace with your actual import path

User = get_user_model()
fake = Faker()

class Command(BaseCommand):
    help = 'Populates the database with sample jobs and user profiles'

    def add_arguments(self, parser):
        parser.add_argument(
            '--jobs', 
            type=int, 
            default=25, 
            help='Number of jobs to create'
        )
        parser.add_argument(
            '--users', 
            type=int, 
            default=50, 
            help='Number of users to create'
        )

    def handle(self, *args, **options):
        num_jobs = options['jobs']
        num_users = options['users']

        # Ensure we don't create duplicate data
        self.stdout.write(self.style.WARNING('Clearing existing job and user data...'))
        
        with transaction.atomic():
            try:
                # Populate jobs
                jobs = self._populate_jobs(num_jobs)
                
                # Populate users
                users = self._populate_users(num_users)
                
                self.stdout.write(
                    self.style.SUCCESS(f'Successfully created {len(jobs)} jobs and {len(users)} users')
                )
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'Error populating data: {str(e)}'))

    def _populate_jobs(self, num_jobs):
        job_domains = ['ai_ml', 'data_science', 'cyber_security', 'web_dev', 'mobile_dev', 'ux_ui', 'cloud_computing', 'blockchain', 'digital_marketing', 'fintech', 'healthtech']
        job_types = ['hybrid', 'onsite', 'remote']
        
        skills_map = {
            'web_dev': ['React', 'Vue.js', 'Angular', 'HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Responsive Design', 'Bootstrap', 'Tailwind CSS'],
            'mobile_dev': ['Java', 'Kotlin', 'Swift', 'Flutter', 'React Native'],
            'ai_ml': ['Python', 'TensorFlow', 'Keras', 'PyTorch', 'Scikit-learn', 'Deep Learning', 'Machine Learning'],
            'data_science': ['R', 'Python', 'Pandas', 'NumPy', 'Data Visualization', 'SQL'],
            'cyber_security': ['Network Security', 'Penetration Testing', 'Ethical Hacking', 'Firewall Management'],
            'cloud_computing': ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes'],
            'blockchain': ['Ethereum', 'Solidity', 'Cryptocurrency', 'Smart Contracts'],
            'digital_marketing': ['SEO', 'SEM', 'Google Analytics', 'Social Media Marketing'],
            'fintech': ['Blockchain', 'Financial Modeling', 'Cryptocurrency', 'Fintech Solutions'],
            'healthtech': ['Health Data Analytics', 'Medical Software', 'Telemedicine'],
        }
        
        recruiter, _ = User.objects.get_or_create(
            username='primary_recruiter', 
            defaults={'email': 'recruiter@example.com', 'role': 'recruiter'}
        )
        
        created_jobs = []
        
        for _ in range(num_jobs):
            domain = random.choice(job_domains)
            skills = random.sample(skills_map.get(domain, []), k=min(random.randint(3, 6), len(skills_map.get(domain, []))))
            
            job = Job.objects.create(
                title=f"{domain.replace('_', ' ').title()} Engineer - {fake.company()}",
                description=fake.paragraph(nb_sentences=5),
                company_name=fake.company(),
                location=fake.city(),
                salary=random.randint(50000, 180000),
                job_type=random.choice(job_types),
                job_domain=domain,
                skills_required=', '.join(skills),
                posted_by=recruiter,
                is_approved=True
            )
            created_jobs.append(job)
        
        return created_jobs

    def _populate_users(self, num_users):
        skills_map = {
            'web_dev': ['React', 'Vue.js', 'Angular', 'HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Responsive Design', 'Bootstrap', 'Tailwind CSS'],
            'mobile_dev': ['Java', 'Kotlin', 'Swift', 'Flutter', 'React Native'],
            'ai_ml': ['Python', 'TensorFlow', 'Keras', 'PyTorch', 'Scikit-learn', 'Deep Learning', 'Machine Learning'],
            'data_science': ['R', 'Python', 'Pandas', 'NumPy', 'Data Visualization', 'SQL'],
            'cyber_security': ['Network Security', 'Penetration Testing', 'Ethical Hacking', 'Firewall Management'],
            'cloud_computing': ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes'],
            'blockchain': ['Ethereum', 'Solidity', 'Cryptocurrency', 'Smart Contracts'],
            'digital_marketing': ['SEO', 'SEM', 'Google Analytics', 'Social Media Marketing'],
            'fintech': ['Blockchain', 'Financial Modeling', 'Cryptocurrency', 'Fintech Solutions'],
            'healthtech': ['Health Data Analytics', 'Medical Software', 'Telemedicine'],
        }
        
        job_types = ['hybrid', 'onsite', 'remote']
        
        created_users = []
        
        for _ in range(num_users):
            domain = random.choice(list(skills_map.keys()))
            skills = random.sample(skills_map[domain], k=min(random.randint(3, 6), len(skills_map[domain])))
            
            user = User.objects.create(
                username=fake.user_name(),
                email=fake.email(),
                fullname=fake.name(),
                role='candidate'
            )
            
            Profile.objects.create(
                user=user,
                skills=skills,
                domain_of_interest=domain,
                job_type=random.choice(job_types),
                location=fake.city()
            )
            
            created_users.append(user)
        
        return created_users
