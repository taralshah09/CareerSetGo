# Generated by Django 5.1.3 on 2024-11-12 17:56

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0008_alter_job_job_domain_alter_job_job_type_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(max_length=254, unique=True, validators=[django.core.validators.EmailValidator()]),
        ),
        migrations.AlterField(
            model_name='user',
            name='userid',
            field=models.AutoField(primary_key=True, serialize=False, unique=True),
        ),
    ]
