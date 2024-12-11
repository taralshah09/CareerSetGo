# Merged models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, AbstractUser
from django.db import models
from django.utils import timezone
from django.conf import settings
from django.core.validators import validate_email


# Choices
JOB_DOMAIN_CHOICES = [
    ('ai_ml', 'Artificial Intelligence & Machine Learning'),
    ('data_science', 'Data Science'),
    ('cyber_security', 'Cyber Security'),
    ('web_dev', 'Web Development'),
    ('mobile_dev', 'Mobile Development'),
    ('ux_ui', 'User Experience & User Interface Design'),
    ('cloud_computing', 'Cloud Computing'),
    ('blockchain', 'Blockchain Technology'),
    ('digital_marketing', 'Digital Marketing'),
    ('fintech', 'Financial Technology'),
    ('healthtech', 'Health Technology'),
]

JOB_TYPE_CHOICES = [
    ('hybrid', 'Hybrid'),
    ('onsite', 'Onsite'),
    ('remote', 'Remote'),
]
COMPANY_SIZE_CHOICES = [
    ('1-10', '1-10 Employees'),
    ('11-50', '11-50 Employees'),
    ('51-200', '51-200 Employees'),
    ('201-500', '201-500 Employees'),
    ('501-1000', '501-1000 Employees'),
    ('1001-5000', '1001-5000 Employees'),
    ('5000+', '5000+ Employees')
]

INDUSTRY_TYPE_CHOICES = [
    ('tech', 'Technology'),
    ('finance', 'Financial Services'),
    ('healthcare', 'Healthcare'),
    ('education', 'Education'),
    ('manufacturing', 'Manufacturing'),
    ('retail', 'Retail'),
    ('consulting', 'Consulting'),
    ('media', 'Media & Entertainment'),
    ('energy', 'Energy'),
    ('telecommunications', 'Telecommunications'),
    ('agriculture', 'Agriculture'),
    ('automotive', 'Automotive'),
    ('ecommerce', 'E-commerce'),
    ('transportation', 'Transportation'),
    ('other', 'Other')
]

ORGANIZATION_TYPE_CHOICES = [
    ('startup', 'Startup'),
    ('small_business', 'Small Business'),
    ('mid_size', 'Mid-size Company'),
    ('enterprise', 'Enterprise'),
    ('non_profit', 'Non-Profit'),
    ('government', 'Government Organization'),
    ('public', 'Public Company'),
    ('private', 'Private Company')
]



# User Manager
class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(username, email, password, **extra_fields)

# Custom User Model
class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = [
        ('candidate', 'Candidate'),
        ('recruiter', 'Recruiter'),
        ('admin', 'Admin'),
    ]

    id = models.AutoField(primary_key=True, unique=True)
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True, validators=[validate_email])
    fullname = models.CharField(max_length=255)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='candidate')
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_social_account = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username

# Profile Model
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    phone_no = models.CharField(max_length=20, blank=True)
    personal_website = models.URLField(blank=True, null=True)
    twitter_link = models.URLField(blank=True)
    linkedin_link = models.URLField(blank=True)
    insta_link = models.URLField(blank=True)
    other_link = models.URLField(blank=True)
    nationality = models.CharField(max_length=100, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')], blank=True, null=True)
    marital_status = models.CharField(max_length=15, choices=[('Single', 'Single'), ('Married', 'Married'), ('Other', 'Other')], blank=True, null=True)
    biography = models.TextField(blank=True, null=True)
    title = models.CharField(max_length=255, blank=True, null=True)
    experience = models.TextField(blank=True)
    education = models.TextField(blank=True)
    domain_of_interest = models.CharField(max_length=30, choices=JOB_DOMAIN_CHOICES, blank=True)
    job_type = models.CharField(max_length=30, choices=JOB_TYPE_CHOICES, blank=True)
    skills = models.JSONField(null=True)
    certifications = models.TextField(blank=True, null=True)
    preferred_work_environment = models.CharField(max_length=255, blank=True, null=True)
    availability_status = models.CharField(max_length=100, blank=True, null=True)
    resume = models.FileField(upload_to='pdfs/', blank=True, null=True)
    languages = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"Profile of {self.user.username}"


class Job(models.Model):
    
 
    
    job_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    company_name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    salary = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    posted_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="posted_jobs")
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    is_approved = models.BooleanField(default=False)  # Admin approval required
    

    
    #responsibility
    
    skills_required = models.TextField(blank=True)  # ilst of skills & also skillgap analysis will be done through this
    description = models.TextField(max_length=800)  # ilst of skills & also skillgap analysis will be done through this
    job_domain = models.CharField(max_length=30, choices=JOB_DOMAIN_CHOICES,default='')  # New domain field
    job_type = models.CharField(max_length=10, choices=JOB_TYPE_CHOICES) 

    def _str_(self):
        return f"{self.title} at {self.company_name}"
  
class Course(models.Model):
    course_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    start_date = models.DateField()
    end_date = models.DateField()
    instructor = models.CharField(max_length=255)
    enrolled_users = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name="courses")

    def _str_(self):
        return self.title
    

  
    
class Wishlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='wishlists')
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='wishlisted_by')
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'job')

    def __str__(self):
        return f"{self.user.username} - {self.job.title} (Wishlist)"

class AppliedJob(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='applied_jobs')
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='applied_by')
    applied_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('user', 'job')

    def __str__(self):
        return f"{self.user.username} - {self.job.title} (Applied)"


from django.db import models
from django.conf import settings


class Company(models.Model):
    # Basic Information
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='company_profile')
    company_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    about_us = models.TextField(blank=True, null=True)
    
    # Organizational Details
    org_type = models.CharField(max_length=30, choices=ORGANIZATION_TYPE_CHOICES, blank=True, null=True)
    industry_type = models.CharField(max_length=30, choices=INDUSTRY_TYPE_CHOICES, blank=True, null=True)
    team_size = models.CharField(max_length=20, choices=COMPANY_SIZE_CHOICES, blank=True, null=True)
    years_of_experience = models.PositiveIntegerField(verbose_name='Years of Experience', blank=True, null=True)
    
    # Visual Branding
    logo = models.ImageField(upload_to='company_logos/', blank=True, null=True)
    banner_image = models.ImageField(upload_to='company_banners/', blank=True, null=True)
    
    # Contact Information
    website = models.URLField(blank=True, null=True)
    company_email = models.EmailField(blank=True, null=True)
    company_phone = models.CharField(max_length=20, blank=True, null=True)
    
    # Location
    location = models.CharField(max_length=255, blank=True, null=True)
    map_location = models.URLField(verbose_name='Google Maps Location', blank=True, null=True)
    
    # Vision and Mission
    company_vision = models.TextField(blank=True, null=True)
    
    # Social Media Profiles
    linkedin_profile = models.URLField(blank=True, null=True)
    twitter_profile = models.URLField(blank=True, null=True)
    facebook_profile = models.URLField(blank=True, null=True)
    instagram_profile = models.URLField(blank=True, null=True)
    
    # Metadata
    # created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Companies'


class ParsedResume(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    education = models.TextField()
    experience = models.TextField()
    skills = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)