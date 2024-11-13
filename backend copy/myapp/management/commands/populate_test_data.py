from django.core.management.base import BaseCommand
from django.utils import timezone
from django.contrib.auth import get_user_model
from myapp.models import Profile, Job, Wishlist, AppliedJob, Course
import random
from faker import Faker

fake = Faker()

class Command(BaseCommand):
    help = 'Populate database with test user, profile, and job data'

    def handle(self, *args, **kwargs):
        # Creating test users
        users = []
        for _ in range(5):  # creating 5 test users
            username = fake.user_name()
            email = fake.email()
            password = "testpassword123"  # You can use a simple password for testing
            user = get_user_model().objects.create_user(
                username=username,
                email=email,
                password=password
            )
            users.append(user)
            self.stdout.write(self.style.SUCCESS(f'Created user: {user.username}'))

        # Creating profiles for each user
        for user in users:
            profile = Profile.objects.create(
                user=user,
                profile_picture=None,  # Set to None or use fake images if needed
                education=fake.text(),
                age=random.randint(20, 40),
                experience=fake.text(),
                location=fake.city(),
                role=fake.job(),
                phone_no=fake.phone_number(),
                resume=None,  # Set to None or link to a dummy file if needed
                domain_of_interest=random.choice(['ai_ml', 'web_dev', 'data_science']),
                job_type=random.choice(['remote', 'onsite', 'hybrid']),
                skills=fake.text(),
            )
            self.stdout.write(self.style.SUCCESS(f'Created profile for: {user.username}'))

        # Creating jobs
        job_titles = ['Software Developer', 'Data Scientist', 'AI Specialist', 'Web Developer', 'Cybersecurity Expert']
        for _ in range(5):  # creating 5 job listings
            job = Job.objects.create(
                title=random.choice(job_titles),
                description=fake.text(),
                company_name=fake.company(),
                location=fake.city(),
                salary=random.randint(50000, 120000),
                posted_by=random.choice(users),
                job_domain=random.choice(['ai_ml', 'data_science', 'web_dev']),
                job_type=random.choice(['remote', 'onsite', 'hybrid']),
            )
            self.stdout.write(self.style.SUCCESS(f'Created job listing: {job.title}'))

        # Creating course data
        for _ in range(3):  # creating 3 courses
            course = Course.objects.create(
                title=fake.bs(),
                description=fake.text(),
                start_date=fake.date_this_year(),
                end_date=fake.date_this_year(),
                instructor=fake.name(),
            )
            course.enrolled_users.add(*random.sample(users, 2))  # Enroll 2 random users
            self.stdout.write(self.style.SUCCESS(f'Created course: {course.title}'))

        # Creating wishlists and applied jobs
        for user in users:
            for job in Job.objects.all():
                # Add random jobs to wishlist
                if random.choice([True, False]):
                    Wishlist.objects.create(user=user, job=job)
                    self.stdout.write(self.style.SUCCESS(f'Added job to wishlist for {user.username}'))

                # Apply for a random job
                if random.choice([True, False]):
                    AppliedJob.objects.create(user=user, job=job)
                    self.stdout.write(self.style.SUCCESS(f'{user.username} applied for {job.title}'))

        self.stdout.write(self.style.SUCCESS('Test data population completed!'))
