# Custom user model
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.conf import settings
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
        # Add more niche domains as necessary
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
        email = self.normalize_email(email)
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
    
    
    userid = models.AutoField(primary_key=True)
    fullname = models.CharField(max_length=255)
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True)
    createdat = models.DateTimeField(default=timezone.now)
    updatedat = models.DateTimeField(auto_now=True)
    is_staff = models.BooleanField(default=False)  # Allows user to access the admin interface
    is_active = models.BooleanField(default=True)   # Determines if the user is active

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username



# # Profile model
# class Profile(models.Model):
   
#     profileid = models.AutoField(primary_key=True)
#     userid = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
#     skills = models.TextField(blank=True)
#     education = models.TextField(blank=True)
#     age = models.IntegerField(blank=True, null=True)
#     experience = models.TextField(blank=True)
#     twitterlink = models.URLField(blank=True)
#     linkedinlink = models.URLField(blank=True)
#     instalink = models.URLField(blank=True)
#     otherlink = models.URLField(blank=True)
#     location = models.CharField(max_length=255, blank=True)
#     role = models.CharField(max_length=255, blank=True)
#     phoneno = models.CharField(max_length=20, blank=True)
#     resume = models.FileField(upload_to='pdfs/')

#     profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
#     def __str__(self):
#         return f"Profile of {self.userid.username}"
class Profile(models.Model):
  
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    profile_id = models.AutoField(primary_key=True)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    education = models.TextField(blank=True)
    age = models.IntegerField(blank=True, null=True)
    experience = models.TextField(blank=True)
    twitter_link = models.URLField(blank=True)
    linkedin_link = models.URLField(blank=True)
    insta_link = models.URLField(blank=True)
    other_link = models.URLField(blank=True)
    location = models.CharField(max_length=255, blank=True)
    role = models.CharField(max_length=255, blank=True)
    phone_no = models.CharField(max_length=20, blank=True)
    resume = models.FileField(upload_to='pdfs/', blank=True, null=True)
    

    #Added Later feed will be made on base of these 3
    domain_of_interest = models.CharField(max_length=30, choices=JOB_DOMAIN_CHOICES, blank=True)
    job_type = models.CharField(max_length=30, choices=JOB_TYPE_CHOICES)  # New domain field 
    skills = models.TextField(blank=True) #This can be handled as a list & we will do that
   
    # New field for domain of interest
    def __str__(self):
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
    
    
# class Job(models.Model):
#     job_id = models.AutoField(primary_key=True)
#     title = models.CharField(max_length=255)
#     description = models.TextField()
#     company_name = models.CharField(max_length=255)
#     location = models.CharField(max_length=255)
#     salary = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
#     posted_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="posted_jobs")
#     created_at = models.DateTimeField(default=timezone.now)
#     updated_at = models.DateTimeField(auto_now=True)
#     is_approved = models.BooleanField(default=False)  # Admin approval required

#     def __str__(self):
#         return f"{self.title} at {self.company_name}"


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