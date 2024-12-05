# Generated by Django 5.1.3 on 2024-12-05 10:00

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Company',
            fields=[
                ('company_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('about_us', models.TextField(blank=True, null=True)),
                ('org_type', models.CharField(blank=True, choices=[('startup', 'Startup'), ('small_business', 'Small Business'), ('mid_size', 'Mid-size Company'), ('enterprise', 'Enterprise'), ('non_profit', 'Non-Profit'), ('government', 'Government Organization'), ('public', 'Public Company'), ('private', 'Private Company')], max_length=30, null=True)),
                ('industry_type', models.CharField(blank=True, choices=[('tech', 'Technology'), ('finance', 'Financial Services'), ('healthcare', 'Healthcare'), ('education', 'Education'), ('manufacturing', 'Manufacturing'), ('retail', 'Retail'), ('consulting', 'Consulting'), ('media', 'Media & Entertainment'), ('energy', 'Energy'), ('telecommunications', 'Telecommunications'), ('agriculture', 'Agriculture'), ('automotive', 'Automotive'), ('ecommerce', 'E-commerce'), ('transportation', 'Transportation'), ('other', 'Other')], max_length=30, null=True)),
                ('team_size', models.CharField(blank=True, choices=[('1-10', '1-10 Employees'), ('11-50', '11-50 Employees'), ('51-200', '51-200 Employees'), ('201-500', '201-500 Employees'), ('501-1000', '501-1000 Employees'), ('1001-5000', '1001-5000 Employees'), ('5000+', '5000+ Employees')], max_length=20, null=True)),
                ('years_of_experience', models.PositiveIntegerField(blank=True, null=True, verbose_name='Years of Experience')),
                ('logo', models.ImageField(blank=True, null=True, upload_to='company_logos/')),
                ('banner_image', models.ImageField(blank=True, null=True, upload_to='company_banners/')),
                ('website', models.URLField(blank=True, null=True)),
                ('company_email', models.EmailField(blank=True, max_length=254, null=True)),
                ('company_phone', models.CharField(blank=True, max_length=20, null=True)),
                ('location', models.CharField(blank=True, max_length=255, null=True)),
                ('map_location', models.URLField(blank=True, null=True, verbose_name='Google Maps Location')),
                ('company_vision', models.TextField(blank=True, null=True)),
                ('linkedin_profile', models.URLField(blank=True, null=True)),
                ('twitter_profile', models.URLField(blank=True, null=True)),
                ('facebook_profile', models.URLField(blank=True, null=True)),
                ('instagram_profile', models.URLField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='company_profile', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'Companies',
            },
        ),
    ]
