import logging
from django.db import models
from myapp.models import User

# Configure logger
logger = logging.getLogger(__name__)

# Topic choices for the threads
TOPIC_CHOICES = (
    ("1", "Entertainment"),
    ("2", "Sports"),
    ("3", "Gaming"),
    ("4", "Music"),
    ("5", "Technology"),
    ("6", "News"),
    ("7", "Anime"),
    ("8", "Drama & Movie"),
)

class Thread(models.Model):
    subject = models.CharField(max_length=200)
    content = models.TextField()
    topic = models.CharField(max_length=32, choices=TOPIC_CHOICES, default='1')
    creator = models.ForeignKey(User, related_name='threads', on_delete=models.CASCADE, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        logger.debug("Creating string representation for Thread: %s", self.subject)
        return self.subject

class Post(models.Model):
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    thread = models.ForeignKey(Thread, related_name="posts", on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        logger.debug("Creating string representation for Post by author: %s", self.author.username)
        return f"Post by {self.author.username} on thread {self.thread.subject}"

class Bookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE)
    
    def __str__(self):
        logger.debug("Creating string representation for Bookmark by user: %s", self.user.username)
        return f"Bookmark by {self.user.username} on thread {self.thread.subject}"

class Pin(models.Model):    
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        logger.debug("Creating string representation for Pin on thread: %s", self.thread.subject)