# Custom user model
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.conf import settings

from django.core.validators import validate_email




JOB_DOMAIN_CHOICES = [
        ('ai_ml', 'Artificial Intelligence & Machine Learning'),
        ('AI/ML', 'Artificial Intelligence & Machine Learning'),
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


class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = email
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(username, email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    is_social_account = models.BooleanField(default=False)
    ROLE_CHOICES = [
        ('candidate', 'Candidate'),
        ('recruiter', 'Recruiter'),
        ('admin', 'Admin'),
    ]
    role = models.CharField(max_length=255, choices=ROLE_CHOICES, default='candidate')
    id = models.AutoField(primary_key=True,unique=True)
    fullname = models.CharField(max_length=255)
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True,validators=[validate_email])
    def clean_email(self):
        email = self['email']
        return email
    createdat = models.DateTimeField(default=timezone.now)
    updatedat = models.DateTimeField(auto_now=True)
    is_staff = models.BooleanField(default=False)  
    is_active = models.BooleanField(default=True)   
    objects = UserManager()
    USER_ID_FIELD = 'userid'
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    def __str__(self):
        return self.username



class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_id = models.AutoField(primary_key=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    
    # Contact Information
    phone_no = models.CharField(max_length=20, blank=True)
    personal_website = models.URLField(blank=True, null=True)
    twitter_link = models.URLField(blank=True)
    linkedin_link = models.URLField(blank=True)
    insta_link = models.URLField(blank=True)
    other_link = models.URLField(blank=True)

    # Personal Details
    nationality = models.CharField(max_length=100, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')], blank=True, null=True)
    marital_status = models.CharField(max_length=15, choices=[('Single', 'Single'), ('Married', 'Married'), ('Other', 'Other')], blank=True, null=True)
    biography = models.TextField(blank=True, null=True)

    # Professional Details
    title = models.CharField(max_length=255, blank=True, null=True)
    experience = models.TextField(blank=True)
    education = models.TextField(blank=True)
    domain_of_interest = models.CharField(max_length=30, choices=JOB_DOMAIN_CHOICES, blank=True)
    job_type = models.CharField(max_length=30, choices=JOB_TYPE_CHOICES, blank=True)
    skills = models.JSONField(null=True)
    certifications = models.TextField(blank=True, null=True)
    preferred_work_environment = models.CharField(max_length=255, blank=True, null=True)
    availability_status = models.CharField(max_length=100, blank=True, null=True)

    # Resume
    resume = models.FileField(upload_to='pdfs/', blank=True, null=True)

    # Language and Miscellaneous
    languages = models.TextField(blank=True, null=True)

    # Location
    location = models.CharField(max_length=255, blank=True)

    def _str_(self):
        return f"Profile of {self.user.username}"

class Course(models.Model):
    course_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    start_date = models.DateField()
    end_date = models.DateField()
    instructor = models.CharField(max_length=255)
    enrolled_users = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name="courses")

    def __str__(self):
        return self.title
    



class Job(models.Model):
    
 
    
    job_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    company_name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    salary = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    posted_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="posted_jobs")
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    is_approved = models.BooleanField(default=False)  # Admin approval required

    
    
    skills_required = models.TextField(blank=True)  # ilst of skills & also skillgap analysis will be done through this
    job_domain = models.CharField(max_length=30, choices=JOB_DOMAIN_CHOICES,default='')  # New domain field
    job_type = models.CharField(max_length=10, choices=JOB_TYPE_CHOICES) 

    def __str__(self):
        return f"{self.title} at {self.company_name}"
    
    
class Wishlist(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='wishlists')
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='wishlisted_by')
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'job')  

    def __str__(self):
        return f"{self.user.username} - {self.job.title} (Wishlist)"

class AppliedJob(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='applied_jobs')
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='applied_by')
    applied_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'job')  

    def __str__(self):
        return f"{self.user.username} - {self.job.title} (Applied)"