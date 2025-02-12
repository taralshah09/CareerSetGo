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


#### Clone the Repository:
```bash
git clone https://github.com/taralshah09/CareerSetGo.git
```

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
cd backend
pip install -r requirements.txt
```

### Setting Up the Backend

#### Add DRF and CORS Headers to Installed Apps:
Open `settings.py` in your Django project and add the following to `INSTALLED_APPS`:

#### Run Migrations:
```bash
python manage.py migrate
```

## How to Run the Frontend


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

