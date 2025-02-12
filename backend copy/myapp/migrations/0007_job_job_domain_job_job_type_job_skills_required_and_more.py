# Generated by Django 5.1.2 on 2024-11-07 14:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0006_rename_instalink_profile_insta_link_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='job',
            name='job_domain',
            field=models.CharField(choices=[('ai_ml', 'Artificial Intelligence & Machine Learning'), ('data_science', 'Data Science'), ('cyber_security', 'Cyber Security'), ('web_dev', 'Web Development'), ('mobile_dev', 'Mobile Development'), ('ux_ui', 'User Experience & User Interface Design'), ('cloud_computing', 'Cloud Computing'), ('blockchain', 'Blockchain Technology'), ('digital_marketing', 'Digital Marketing'), ('fintech', 'Financial Technology'), ('healthtech', 'Health Technology')], max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='job',
            name='job_type',
            field=models.CharField(choices=[('hybrid', 'Hybrid'), ('onsite', 'Onsite'), ('remote', 'Remote')], default='Hybrid', max_length=10, null=True),
        ),
        migrations.AddField(
            model_name='job',
            name='skills_required',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='domain_of_interest',
            field=models.CharField(blank=True, choices=[('ai_ml', 'Artificial Intelligence & Machine Learning'), ('data_science', 'Data Science'), ('cyber_security', 'Cyber Security'), ('web_dev', 'Web Development'), ('mobile_dev', 'Mobile Development'), ('ux_ui', 'User Experience & User Interface Design'), ('cloud_computing', 'Cloud Computing'), ('blockchain', 'Blockchain Technology'), ('digital_marketing', 'Digital Marketing'), ('fintech', 'Financial Technology'), ('healthtech', 'Health Technology')], max_length=30),
        ),
        migrations.AddField(
            model_name='profile',
            name='job_type',
            field=models.CharField(choices=[('hybrid', 'Hybrid'), ('onsite', 'Onsite'), ('remote', 'Remote')], default='Hybrid', max_length=30),
        ),
    ]
