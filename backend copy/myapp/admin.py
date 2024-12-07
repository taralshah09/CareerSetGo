from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.html import format_html
from import_export.admin import ImportExportModelAdmin
from .models import User, Profile, Job, Course, Wishlist, AppliedJob

class UserAdmin(BaseUserAdmin):
    # Enhanced list display with color-coded status
    def is_active_status(self, obj):
        if obj.is_active:
            return format_html('<span class="badge bg-success">Active</span>')
        return format_html('<span class="badge bg-danger">Inactive</span>')
    is_active_status.short_description = 'Status'
    # Enhanced list display with role color coding
    def role_display(self, obj):
        role_colors = {
            'admin': 'bg-primary',
            'recruiter': 'bg-warning',
            'candidate': 'bg-info'
        }
        color = role_colors.get(obj.role.lower(), 'bg-secondary')
        return format_html(f'<span class="badge {color}">{obj.role}</span>')
    role_display.short_description = 'Role'

    list_display = ('id', 'fullname', 'username', 'email', 'role_display', 'is_active_status', 'is_staff', 'created_at')
    list_display_links = ('username', 'email')
    list_filter = ('is_staff', 'is_active', 'role')
    search_fields = ('username', 'email', 'fullname')
    ordering = ('id',)
    filter_horizontal = ('groups', 'user_permissions')
    
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('fullname', 'username', 'role')}),
        ('Permissions', {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
            'classes': ('collapse',)
        }),
        ('Important Dates', {'fields': ('last_login', 'created_at')}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2', 'role', 'is_active', 'is_staff'),
        }),
    )
    readonly_fields = ('created_at',)

@admin.register(Profile)
class ProfileAdmin(ImportExportModelAdmin):
    # Added profile image preview
    def profile_image_preview(self, obj):
        if obj.profile_picture:
            return format_html('<img src="{}" style="max-height:100px; max-width:100px;" />'.format(obj.profile_picture.url))
        return 'No Image'
    profile_image_preview.short_description = 'Profile Image'

    list_display = ('user', 'phone_no', 'nationality', 'title', 'location', 'profile_image_preview', 'date_of_birth')
    search_fields = ('user__username', 'user__email', 'phone_no', 'title', 'location')
    list_filter = ('nationality', 'gender')
    list_per_page = 20

@admin.register(Job)
class JobAdmin(ImportExportModelAdmin):
    # Added job status color coding
    def job_status(self, obj):
        if obj.is_approved:
            return format_html('<span class="badge bg-success">Approved</span>')
        return format_html('<span class="badge bg-warning">Pending</span>')
    job_status.short_description = 'Status'

    list_display = ('title', 'company_name', 'location', 'job_domain', 'job_type', 'job_status', 'created_at')
    search_fields = ('title', 'company_name', 'location', 'skills_required')
    list_filter = ('job_domain', 'job_type', 'is_approved', 'created_at')
    ordering = ('-created_at',)
    list_per_page = 20

@admin.register(Course)
class CourseAdmin(ImportExportModelAdmin):
    # Added course duration calculation
    def course_duration(self, obj):
        if obj.start_date and obj.end_date:
            duration = (obj.end_date - obj.start_date).days
            return f"{duration} days"
        return "N/A"
    course_duration.short_description = 'Duration'

    list_display = ('title', 'instructor', 'start_date', 'end_date', 'course_duration', 'created_at')
    search_fields = ('title', 'instructor', 'description')
    list_filter = ('start_date', 'end_date')
    ordering = ('-created_at',)
    list_per_page = 20

@admin.register(Wishlist)
class WishlistAdmin(ImportExportModelAdmin):
    list_display = ('user', 'job', 'added_at')
    search_fields = ('user__username', 'job__title')
    ordering = ('-added_at',)
    list_per_page = 20

@admin.register(AppliedJob)
class AppliedJobAdmin(ImportExportModelAdmin):
    # Added application status color coding
    def application_status(self, obj):
        status_colors = {
            'pending': 'bg-warning',
            'reviewed': 'bg-info',
            'accepted': 'bg-success',
            'rejected': 'bg-danger'
        }
        status = getattr(obj, 'status', 'pending').lower()
        color = status_colors.get(status, 'bg-secondary')
        return format_html(f'<span class="badge {color}">{status}</span>')
    application_status.short_description = 'Status'

    list_display = ('user', 'job', 'applied_at', 'application_status')
    search_fields = ('user__username', 'job__title')
    ordering = ('-applied_at',)
    list_per_page = 20

# Register custom User model with customized UserAdmin
admin.site.register(User, UserAdmin)

# Optional: Customize admin site header
admin.site.site_header = 'Job Portal Administration'
admin.site.site_title = 'Job Portal Admin'
admin.site.index_title = 'Welcome to Job Portal Admin'