from django.test import TestCase
from django.utils import timezone
from django.core.exceptions import ValidationError
from myapp.models import (
    User, Profile, Job, Course, Wishlist, AppliedJob, Company
)

class UserModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",
            email="testuser@example.com",
            password="testpassword",
            role="candidate",
        )

    def test_create_user(self):
        self.assertEqual(self.user.username, "testuser")
        self.assertEqual(self.user.email, "testuser@example.com")
        self.assertTrue(self.user.check_password("testpassword"))

    def test_create_superuser(self):
        superuser = User.objects.create_superuser(
            username="admin",
            email="admin@example.com",
            password="adminpassword"
        )
        self.assertTrue(superuser.is_superuser)
        self.assertTrue(superuser.is_staff)

class ProfileModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="profileuser",
            email="profileuser@example.com",
            password="testpassword",
        )
        self.profile = Profile.objects.create(user=self.user, phone_no="1234567890")

    def test_profile_creation(self):
        self.assertEqual(self.profile.user.username, "profileuser")
        self.assertEqual(self.profile.phone_no, "1234567890")

class JobModelTest(TestCase):
    def setUp(self):
        self.recruiter = User.objects.create_user(
            username="recruiter",
            email="recruiter@example.com",
            password="recruiterpassword",
            role="recruiter",
        )
        self.job = Job.objects.create(
            title="Software Engineer",
            description="Develop and maintain software.",
            company_name="TechCorp",
            location="Remote",
            salary=100000.00,
            posted_by=self.recruiter,
            job_type="remote",
            job_domain="web_dev",
        )

    def test_job_creation(self):
        self.assertEqual(self.job.title, "Software Engineer")
        self.assertEqual(self.job.posted_by.username, "recruiter")

class CourseModelTest(TestCase):
    def setUp(self):
        self.course = Course.objects.create(
            title="Django Basics",
            description="Learn the basics of Django.",
            start_date=timezone.now().date(),
            end_date=timezone.now().date() + timezone.timedelta(days=30),
            instructor="John Doe",
        )

    def test_course_creation(self):
        self.assertEqual(self.course.title, "Django Basics")
        self.assertEqual(self.course.instructor, "John Doe")

class WishlistModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="wishlistuser",
            email="wishlistuser@example.com",
            password="wishlistpassword",
        )
        self.recruiter = User.objects.create_user(
            username="recruiter",
            email="recruiter@example.com",
            password="recruiterpassword",
            role="recruiter",
        )
        self.job = Job.objects.create(
            title="Frontend Developer",
            description="Create user-friendly web interfaces.",
            company_name="WebCorp",
            location="Remote",
            salary=80000.00,
            posted_by=self.recruiter,
            job_type="remote",
            job_domain="web_dev",
        )
        self.wishlist = Wishlist.objects.create(user=self.user, job=self.job)

    def test_wishlist_creation(self):
        self.assertEqual(self.wishlist.user.username, "wishlistuser")
        self.assertEqual(self.wishlist.job.title, "Frontend Developer")

class AppliedJobModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="applieduser",
            email="applieduser@example.com",
            password="appliedpassword",
        )
        self.recruiter = User.objects.create_user(
            username="recruiter",
            email="recruiter@example.com",
            password="recruiterpassword",
            role="recruiter",
        )
        self.job = Job.objects.create(
            title="Backend Developer",
            description="Develop server-side logic.",
            company_name="BackendCorp",
            location="Onsite",
            salary=120000.00,
            posted_by=self.recruiter,
            job_type="onsite",
            job_domain="web_dev",
        )
        self.applied_job = AppliedJob.objects.create(user=self.user, job=self.job)

    def test_applied_job_creation(self):
        self.assertEqual(self.applied_job.user.username, "applieduser")
        self.assertEqual(self.applied_job.job.title, "Backend Developer")

class CompanyModelTest(TestCase):
    def setUp(self):
        self.recruiter = User.objects.create_user(
            username="companyuser",
            email="companyuser@example.com",
            password="companypassword",
            role="recruiter",
        )
        self.company = Company.objects.create(
            user=self.recruiter,
            name="Tech Innovations",
            org_type="startup",
            industry_type="tech",
            team_size="11-50",
        )

    def test_company_creation(self):
        self.assertEqual(self.company.name, "Tech Innovations")
        self.assertEqual(self.company.user.username, "companyuser")
