from pathlib import Path
import os
from decouple import config
# Base directory path
BASE_DIR = Path(__file__).resolve().parent.parent
import os
from decouple import config

# Debug and Allowed Hosts
DEBUG = config('DEBUG', default=False, cast=bool)
ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='', cast=lambda v: [s.strip() for s in v.split(',')])

# Dynamic CORS Origins
CORS_ALLOWED_ORIGINS = config('CORS_ORIGINS', default='', cast=lambda v: [s.strip() for s in v.split(',')])
# Media settings
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Security settings
SECRET_KEY = 'django-insecure-h(a9i&vl0vknxoxbj1#abh0!-r)w%4sw()stj)857ifbp2&w%u'
DEBUG = True  # Change to False in production
ALLOWED_HOSTS = [
    'localhost', 
    '127.0.0.1', 
    '*-3000.githubpreview.dev',
    '*-5173.githubpreview.dev'
]  # Add hostnames for production
CORS_ALLOW_ALL_ORIGINS = False  # More secure
CORS_ALLOWED_ORIGINS = [
    # MyApp Frontend URLs
    'http://localhost:3000',    # Local React app for myapp
    'http://127.0.0.1:3000',    
    'https://*-3000.githubpreview.dev',  # GitHub Codespaces pattern
    
    # Forum App Frontend URLs
    'http://localhost:5173',    # Local Vite app for forum
    'http://127.0.0.1:5173',
    'https://*-5173.githubpreview.dev',  # GitHub Codespaces pattern
    
    # Add any other specific URLs
    'https://*.gitpod.io',
    'https://*.github.dev'
]
CORS_ALLOW_CREDENTIALS = True

# eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMyMjE0MzkxLCJpYXQiOjE3MzIyMTM0OTEsImp0aSI6Ijg3YThiMDg5MTdmYzQzNmNiMGRlMTZkYjA1NWE4NWYzIiwidXNlcl9pZCI6MX0.EM1McdKgK_PrhttiAPve2oZQEXa8DYzJzok5qHzwOHM
# Installed apps
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'rest_framework_simplejwt',  # JWT Authentication
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework_simplejwt.token_blacklist',
    'corsheaders',
    'myapp',
    'forum',
]

# Middleware configuration
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',  # Can be removed if not using session
    'corsheaders.middleware.CorsMiddleware',  # CORS middleware
    'django.middleware.common.CommonMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Custom user model
AUTH_USER_MODEL = 'myapp.User'

# CORS configuration
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',  # Replace with your frontend URL
    'http://127.0.0.1:5173',  # Replace with your frontend URL
 'http://localhost:3000'
]
CORS_ALLOW_CREDENTIALS = True

# URL configuration
ROOT_URLCONF = 'backend.urls'

# WSGI application
WSGI_APPLICATION = 'backend.wsgi.application'

# Database configuration
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Localization settings
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files
STATIC_URL = 'static/'

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Django REST framework configuration for JWT authentication
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',  # JWT Authentication
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
}

# Session settings are removed since we're using JWT now
SESSION_ENGINE = 'django.contrib.sessions.backends.db'  # Can be removed if no session is needed
SESSION_COOKIE_SAMESITE = 'Lax'  # Or 'Strict' or 'None' if you're using cross-origin requests

# JWT Settings (configure expiration and other settings as needed)
from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=25),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': False,
     'TOKEN_TYPE': 'access',
    'BLACKLIST_AFTER_ROTATION': True,
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,
    'AUTH_HEADER_TYPES': ('Bearer',),
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'TOKEN_OBTAIN_SERIALIZER': 'myapp.serializers.CustomTokenObtainPairSerializer',
}

# CSRF settings: remove CSRF-related configurations since JWT doesn't use CSRF
# CSRF_COOKIE_HTTPONLY = False
# CSRF_COOKIE_NAME = "csrftoken"
# CSRF_HEADER_NAME = "X-CSRFToken"
# CSRF_TRUSTED_ORIGINS = []  # Empty, no CSRF checks for JWT
# CSRF_COOKIE_DOMAIN = "127.0.0.1"
# SESSION_COOKIE_HTTPONLY = True
# SESSION_COOKIE_NAME = "sessionid"
# SESSION_COOKIE_DOMAIN = "127.0.0.1"

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],  # For admin to work
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
   ]

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com' 
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = config('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD')


# LOGGING = {
#     'version': 1,
#     'disable_existing_loggers': False,
#     'handlers': {
#         'console': {
#             'level': 'DEBUG',
#             'class': 'logging.StreamHandler',
#         },
#     },
#     'loggers': {
#         'django': {
#             'handlers': ['console'],
#             'level': 'DEBUG',
#             'propagate': True,
#         },
#         'myapp': {  # This will catch our logger
#             'handlers': ['console'],
#             'level': 'DEBUG',
#             'propagate': True,
#         },
#     },
# }
