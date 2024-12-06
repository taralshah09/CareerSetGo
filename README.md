# CareerSetGo

A full-stack app with Django REST Framework (backend) and React (frontend) for managing job listings.
### 2. Backend Setup

#### Install Dependencies

Navigate to the backend folder and install requirements:

```bash
cd backend copy
pip install -r requirements.txt
```
```bash
python manage.py makemigrations
python manage.py migrate
```

#### Populate Data

Run these commands to add job listings and users:

```bash
python manage.py populate_jobs
python manage.py populate_data
python manage.py addusers
```

#### Run the Backend Server

```bash
python manage.py runserver
```

Backend will be available at `http://127.0.0.1:8000/`.


That's it! Your api should now be up and running.