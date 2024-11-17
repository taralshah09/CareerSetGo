from django.core.management.base import BaseCommand
from myapp.models import Job
from django.utils import timezone

class Command(BaseCommand):
    help = 'Add sample job data to the database'

    def handle(self, *args, **kwargs):
        # Example data for jobs
        job_data = [
            {
                'title': 'Software Developer',
                'description': 'Develop and maintain software applications.',
                'company_name': 'Tech Solutions',
                'location': 'Australia',
                'salary': 35000.00,
                'posted_by': 1,  # Assuming user with id 1 exists
                'is_approved': True,
                'skills_required': 'Python, Django, JavaScript',
                'job_domain': 'web_dev',
                'job_type': 'remote',
                'created_at': timezone.now(),
            },
            {
                'title': 'Data Scientist',
                'description': 'Analyze and interpret complex data sets.',
                'company_name': 'Data Corp',
                'location': 'New York',
                'salary': 75000.00,
                'posted_by': 2,  # Assuming user with id 2 exists
                'is_approved': True,
                'skills_required': 'Python, Data Analysis, Machine Learning',
                'job_domain': 'data_science',
                'job_type': 'hybrid',
                'created_at': timezone.now(),
            },
            {
                'title': 'Cyber Security Expert',
                'description': 'Protect the organization\'s network from cyber threats.',
                'company_name': 'SecureTech',
                'location': 'London',
                'salary': 80000.00,
                'posted_by': 1,
                'is_approved': False,
                'skills_required': 'Networking, Security Protocols, Python',
                'job_domain': 'cyber_security',
                'job_type': 'onsite',
                'created_at': timezone.now(),
            },
        ]

        # Iterate through each job data and create Job instances
        for job in job_data:
            job_instance = Job(
                title=job['title'],
                description=job['description'],
                company_name=job['company_name'],
                location=job['location'],
                salary=job['salary'],
                posted_by_id=job['posted_by'],  # We use 'posted_by_id' to link user by ID
                is_approved=job['is_approved'],
                skills_required=job['skills_required'],
                job_domain=job['job_domain'],
                job_type=job['job_type'],
                created_at=job['created_at'],
            )
            job_instance.save()

        self.stdout.write(self.style.SUCCESS('Successfully added sample jobs'))
