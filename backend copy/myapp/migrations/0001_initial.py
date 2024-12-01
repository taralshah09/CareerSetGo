# Generated by Django 5.1.3 on 2024-12-01 18:48

import django.core.validators
import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('is_social_account', models.BooleanField(default=False)),
                ('role', models.CharField(choices=[('candidate', 'Candidate'), ('recruiter', 'Recruiter'), ('admin', 'Admin')], default='candidate', max_length=20)),
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('fullname', models.CharField(max_length=255)),
                ('username', models.CharField(max_length=255, unique=True)),
                ('email', models.EmailField(max_length=254, unique=True, validators=[django.core.validators.EmailValidator()])),
                ('createdat', models.DateTimeField(default=django.utils.timezone.now)),
                ('updatedat', models.DateTimeField(auto_now=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('course_id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('instructor', models.CharField(max_length=255)),
                ('enrolled_users', models.ManyToManyField(blank=True, related_name='courses', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Job',
            fields=[
                ('job_id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('company_name', models.CharField(max_length=255)),
                ('location', models.CharField(max_length=255)),
                ('salary', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('is_approved', models.BooleanField(default=False)),
                ('skills_required', models.TextField(blank=True)),
                ('job_domain', models.CharField(choices=[('ai_ml', 'Artificial Intelligence & Machine Learning'), ('AI/ML', 'Artificial Intelligence & Machine Learning'), ('data_science', 'Data Science'), ('cyber_security', 'Cyber Security'), ('web_dev', 'Web Development'), ('mobile_dev', 'Mobile Development'), ('ux_ui', 'User Experience & User Interface Design'), ('cloud_computing', 'Cloud Computing'), ('blockchain', 'Blockchain Technology'), ('digital_marketing', 'Digital Marketing'), ('fintech', 'Financial Technology'), ('healthtech', 'Health Technology')], default='', max_length=30)),
                ('job_type', models.CharField(choices=[('hybrid', 'Hybrid'), ('onsite', 'Onsite'), ('remote', 'Remote')], max_length=10)),
                ('posted_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='posted_jobs', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('profile_id', models.AutoField(primary_key=True, serialize=False)),
                ('profile_picture', models.ImageField(blank=True, null=True, upload_to='profile_pictures/')),
                ('phone_no', models.CharField(blank=True, max_length=20)),
                ('personal_website', models.URLField(blank=True, null=True)),
                ('twitter_link', models.URLField(blank=True)),
                ('linkedin_link', models.URLField(blank=True)),
                ('insta_link', models.URLField(blank=True)),
                ('other_link', models.URLField(blank=True)),
                ('nationality', models.CharField(blank=True, max_length=100, null=True)),
                ('date_of_birth', models.DateField(blank=True, null=True)),
                ('gender', models.CharField(blank=True, choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')], max_length=10, null=True)),
                ('marital_status', models.CharField(blank=True, choices=[('Single', 'Single'), ('Married', 'Married'), ('Other', 'Other')], max_length=15, null=True)),
                ('biography', models.TextField(blank=True, null=True)),
                ('title', models.CharField(blank=True, max_length=255, null=True)),
                ('experience', models.TextField(blank=True)),
                ('education', models.TextField(blank=True)),
                ('domain_of_interest', models.CharField(blank=True, choices=[('ai_ml', 'Artificial Intelligence & Machine Learning'), ('AI/ML', 'Artificial Intelligence & Machine Learning'), ('data_science', 'Data Science'), ('cyber_security', 'Cyber Security'), ('web_dev', 'Web Development'), ('mobile_dev', 'Mobile Development'), ('ux_ui', 'User Experience & User Interface Design'), ('cloud_computing', 'Cloud Computing'), ('blockchain', 'Blockchain Technology'), ('digital_marketing', 'Digital Marketing'), ('fintech', 'Financial Technology'), ('healthtech', 'Health Technology')], max_length=30)),
                ('job_type', models.CharField(blank=True, choices=[('hybrid', 'Hybrid'), ('onsite', 'Onsite'), ('remote', 'Remote')], max_length=30)),
                ('skills', models.JSONField(null=True)),
                ('certifications', models.TextField(blank=True, null=True)),
                ('preferred_work_environment', models.CharField(blank=True, max_length=255, null=True)),
                ('availability_status', models.CharField(blank=True, max_length=100, null=True)),
                ('resume', models.FileField(blank=True, null=True, upload_to='pdfs/')),
                ('languages', models.TextField(blank=True, null=True)),
                ('location', models.CharField(blank=True, max_length=255)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='AppliedJob',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('applied_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='applied_jobs', to=settings.AUTH_USER_MODEL)),
                ('job', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='applied_by', to='myapp.job')),
            ],
            options={
                'unique_together': {('user', 'job')},
            },
        ),
        migrations.CreateModel(
            name='Wishlist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('added_at', models.DateTimeField(auto_now_add=True)),
                ('job', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='wishlisted_by', to='myapp.job')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='wishlists', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('user', 'job')},
            },
        ),
    ]
