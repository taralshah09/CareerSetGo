import logging
from django.core.management.base import BaseCommand
from myapp.models import User
from forum.models import Thread, Post, Bookmark, Pin, TOPIC_CHOICES

# Configure logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class Command(BaseCommand):
    help = "Populates the database with initial data for Users, Threads, Posts, Bookmarks, and Pins"

    def handle(self, *args, **kwargs):
        logger.info("Starting database population...")

        # Create example users
        users = [
            {"username": "john_doe", "email": "john@example.com", "fullname": "John Doe"},
            {"username": "jane_doe", "email": "jane@example.com", "fullname": "Jane Doe"},
            {"username": "alex_smith", "email": "alex@example.com", "fullname": "Alex Smith"},
        ]

        user_instances = []
        for user_data in users:
            user, created = User.objects.get_or_create(
                username=user_data["username"],
                email=user_data["email"],
                defaults={"fullname": user_data["fullname"]}
            )
            user_instances.append(user)
            logger.info(f"{'Created' if created else 'Found'} user: {user.username}")

        # Create threads for each topic
        threads = []
        for topic_code, topic_name in TOPIC_CHOICES:
            thread, created = Thread.objects.get_or_create(
                subject=f"{topic_name} Discussion",
                content=f"Welcome to the {topic_name} discussion thread. Share your ideas and thoughts!",
                topic=topic_code,
                creator=user_instances[0],  # Assign the first user as creator
            )
            threads.append(thread)
            logger.info(f"{'Created' if created else 'Found'} thread: {thread.subject} under topic {topic_name}")

        # Add posts to threads
        for thread in threads:
            post1 = Post.objects.create(
                content="This is the first post in this thread. Let's discuss!",
                thread=thread,
                author=user_instances[1],  # Assign the second user as author
            )
            post2 = Post.objects.create(
                content="Interesting topic! Looking forward to hearing more opinions.",
                thread=thread,
                author=user_instances[2],  # Assign the third user as author
            )
            logger.info(f"Added posts to thread: {thread.subject}")

        # Add bookmarks and pins
        for thread in threads[:3]:  # Bookmark and pin first three threads
            Bookmark.objects.get_or_create(user=user_instances[1], thread=thread)
            logger.info(f"Bookmarked thread: {thread.subject} for user: {user_instances[1].username}")

            Pin.objects.get_or_create(thread=thread)
            logger.info(f"Pinned thread: {thread.subject}")

        logger.info("Database population completed successfully!")
