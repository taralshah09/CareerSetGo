# Generated by Django 5.1.3 on 2024-12-06 06:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('forum', '0004_alter_thread_topic'),
    ]

    operations = [
        migrations.AlterField(
            model_name='thread',
            name='topic',
            field=models.CharField(choices=[('1', 'Entertainment'), ('2', 'Sports'), ('3', 'Gaming'), ('4', 'Music'), ('5', 'Technology'), ('6', 'News'), ('7', 'Anime'), ('8', 'Drama & Movie')], default='1', max_length=32),
        ),
        migrations.DeleteModel(
            name='Topic',
        ),
    ]
