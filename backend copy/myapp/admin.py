

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Profile, Course, Job

# Custom User Admin
class UserAdmin(BaseUserAdmin):
    model = User
    list_display = ('userid', 'username', 'email', 'fullname', 'createdat', 'updatedat', 'is_staff', 'is_active')
    search_fields = ('username', 'email')
    ordering = ('-createdat',)

# Custom Profile Admin
class ProfileAdmin(admin.ModelAdmin):
    model = Profile
    list_display = ('profile_id', 'user', 'skills', 'education', 'age', 'experience', 'location', 'role', 'phone_no')
    search_fields = ('user__username', 'skills', 'education')
    ordering = ('user',)

# Custom Course Admin
class CourseAdmin(admin.ModelAdmin):
    model = Course
    list_display = ('course_id', 'title', 'instructor', 'start_date', 'end_date', 'created_at')
    search_fields = ('title', 'instructor')
    ordering = ('-created_at',)

# Custom Job Admin with Approve/Reject actions
@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ('job_id', 'title', 'company_name', 'location', 'posted_by', 'created_at', 'is_approved')
    list_filter = ('is_approved', 'location')
    search_fields = ('title', 'company_name', 'posted_by__username')
    actions = ['approve_jobs', 'reject_jobs']

    def approve_jobs(self, request, queryset):
        queryset.update(is_approved=True)
        self.message_user(request, "Selected jobs have been approved.")
    approve_jobs.short_description = "Approve selected jobs"

    def reject_jobs(self, request, queryset):
        queryset.update(is_approved=False)
        self.message_user(request, "Selected jobs have been rejected.")
    reject_jobs.short_description = "Reject selected jobs"

# Register models with the admin site
admin.site.register(User, UserAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(Course, CourseAdmin)
