# CareerSetGo

## Overview
CareerSetGo is a project that integrates Django Rest Framework (DRF) with a React frontend, providing a robust platform for career-related functionalities.

## Installation Guide

### Prerequisites
Before installing the project, ensure you have the following installed:
- **Python**: Version 3.8 or higher
- **Node.js**: Version 14 or higher
- **Django**: Version 4.2 or 5.0
- **npm**: Node package manager

### Creating a Virtual Environment (for Django)
It is recommended to install Django and DRF within a virtual environment. Follow these steps based on your operating system:

#### On Windows:
```bash
python -m venv env
env\Scripts\activate
```

#### On Mac/Linux:
```bash
python3 -m venv env
source env/bin/activate
```

### Installing Django and Django REST Framework
Once your virtual environment is activated, install Django and DRF using pip:
```bash
pip install django djangorestframework django-cors-headers
```

### Setting Up the Backend

#### Create a Django Project:
```bash
django-admin startproject backend
cd backend
```

#### Add DRF and CORS Headers to Installed Apps:
Open `settings.py` in your Django project and add the following to `INSTALLED_APPS`:
```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
]
```

#### Configure CORS:
Add the following settings in `settings.py`:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # React app's origin
    "https://*.127.0.0.1"
]
```

#### Database Configuration:
Using SQLite for development, add this in `settings.py`:
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

#### Run Migrations:
```bash
python manage.py migrate
```

## How to Run the Frontend

#### Clone the Repository:
```bash
git clone https://github.com/taralshah09/CareerSetGo.git
```

#### Navigate to the Frontend Directory:
```bash
cd frontend
```

#### Install the Necessary Packages:
```bash
npm install
```

#### Start the Development Server:
```bash
npm run dev
```

## Running the Backend
To run the backend server, navigate to the backend directory and use:
```bash
python manage.py runserver
```
```
