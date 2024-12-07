from django.contrib import admin
from django.utils.html import format_html
from import_export.admin import ImportExportModelAdmin
from .models import Thread, Post, Bookmark, Pin,TOPIC_CHOICES

# Thread Admin
@admin.register(Thread)
class ThreadAdmin(ImportExportModelAdmin):
    # Topic color coding
    def topic_display(self, obj):
        topic_colors = {
            '1': 'bg-success',  # Entertainment
            '2': 'bg-primary',  # Sports
            '3': 'bg-info',     # Gaming
            '4': 'bg-warning',  # Music
            '5': 'bg-danger',   # Technology
            '6': 'bg-secondary',# News
            '7': 'bg-light',    # Anime
            '8': 'bg-dark'      # Drama & Movie
        }
        color = topic_colors.get(obj.topic, 'bg-secondary')
        return format_html(f'<span class="badge {color}">{dict(TOPIC_CHOICES).get(obj.topic, "Unknown")}</span>')
    topic_display.short_description = 'Topic'

    # Content preview for Thread
    def thread_content_preview(self, obj):
        return format_html('<span>{}</span>', obj.content[:50])  # Preview the first 50 chars of content
    thread_content_preview.short_description = 'Content Preview'

    list_display = ('subject', 'topic_display', 'creator', 'created_at', 'updated_at', 'thread_content_preview')
    list_filter = ('topic', 'creator', 'created_at')
    search_fields = ('subject', 'content')
    ordering = ('-created_at',)
    list_per_page = 20

# Post Admin
@admin.register(Post)
class PostAdmin(ImportExportModelAdmin):
    # Post content preview
    def post_content_preview(self, obj):
        return format_html('<span>{}</span>', obj.content[:50])  # Preview the first 50 chars of content
    post_content_preview.short_description = 'Content Preview'

    list_display = ('author', 'thread', 'created_at', 'post_content_preview')
    search_fields = ('author__username', 'content')
    list_filter = ('thread', 'created_at')
    ordering = ('-created_at',)
    list_per_page = 20

# Bookmark Admin
@admin.register(Bookmark)
class BookmarkAdmin(ImportExportModelAdmin):
    # Formatted bookmark date display
    def bookmark_date(self, obj):
        return obj.created_at.strftime('%Y-%m-%d %H:%M')
    bookmark_date.short_description = 'Bookmarked On'

    list_display = ('user', 'thread', 'bookmark_date')
    search_fields = ('user__username', 'thread__subject')
    list_filter = ('user', 'thread')
    ordering = ('-user',)
    list_per_page = 20

# Pin Admin
@admin.register(Pin)
class PinAdmin(ImportExportModelAdmin):
    # Display pinned thread subject
    def pinned_thread(self, obj):
        return format_html('<span>{}</span>', obj.thread.subject)
    pinned_thread.short_description = 'Pinned Thread'

    list_display = ('thread', 'created_at', 'pinned_thread')
    list_filter = ('thread',)
    ordering = ('-created_at',)
    list_per_page = 20

# Optional: Customize admin site header
admin.site.site_header = 'Forum Administration'
admin.site.site_title = 'Forum Admin'
admin.site.index_title = 'Welcome to Forum Admin'
