# backend/urls.py

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import RedirectView




urlpatterns = [
    path('admin/', admin.site.urls),
    # path('logout/',RedirectView.as_view(url = '/admin/logout/')),
    path('api', include('myapp.urls')),  # Including URLs from 'myapp'

    path('api-auth/', include('rest_framework.urls')),
]

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
