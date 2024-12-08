# Discussion forum application

## Desktop View
<img src="https://user-images.githubusercontent.com/48129546/185688203-73d67086-9a7c-4380-be23-eed209b687f1.png" width="900"/>

## Mobile View
<p float="left">
    <img src="https://user-images.githubusercontent.com/48129546/185688445-61e2566d-8fe1-4cba-9460-d937537e0df7.png" width="260" />
    <img src="https://user-images.githubusercontent.com/48129546/185689253-0e0710fc-3e0b-477f-a3c3-160f3e874359.png" width="260"/>
    <img src="https://user-images.githubusercontent.com/48129546/185689742-6ca65a9d-b384-4d2d-ad2e-4663acb47ff6.png" width="260"/>
<p>


## Description
The discussion forum application is built by Django and React. The forum web app allows any user to view threads. Users can register and login to create new thread and reply to any threads to join any discussion.


## Functions and Features
### Functions
-   Registration
-   Login / Logout
-   Browse all threads sorted by updating date
-   Browse threads by topic
-   Add new thread
-   Add new post to reply in a thread
-   Bookmark Page
-   User Profile Page (Edit Avatar and biography)

### Features
-   Token Based Authentication
-   Infinite Scrolling 
-   Mobile Responsive
-   Guest / unauthenticated user browse all the threads and posts


## Tech Stack
-   Python Django
-   React.js
-   HTML5 / CSS
-   Material UI
-   React Bootstrap
-   sqlite3
-   Django REST framework


## Contained Files
In `src`, `public` folder, it stores all the files of frontend built by React.  
-   `./build` a build directory with a production build of the forum app.
-   `./public` contain favicon and index.html etc.
-   `./src` stores all files of React components and pages.
    -   `./components` contain different components of forum app such as Header, footer, AppBar and various forms.
    -   `./pages` store defined pages, for example, Home.js, Login.js, signup.js and Thread.js etc.
    -   `./utils` contain PrivateRoute.js for the implementation of private routes
    -   `/App.css` styling of the forum app
    -   `./index.js/` the top structure level of forum app which has App.js component as its child
    -   `./App.js` the forum app components
  
In `myforum` folder, it contains settings and url configuration of the forum app.
In `api` folder, it consists of a wide range of files of the backend and views.
-   `./admin.py` registration of models
-   `./apps.py`  app config
-   `./models.py` defined database models
-   `./serializers.py` different classes to serialize database models
-   `./signals.py` automatically generate profile for each user creation
-   `./tests.py` empty file
-   `./urls.py` routes of the forum app API to provide endpoints for the client
-   `./views.py` consists of different functions to build the API



## Getting Started 
The React app is already integrated to Django app for an easy start.  
First, clone or download the repository from gitHub.  
To run the application in local, please following commands.  
```
virtualenv myenv

myenv\Scripts\activate

pip install -r requirements.txt

python manage.py runserver

The application will be available on http://127.0.0.1:8000/
```

## Additional Information
I built this forum app in conda virtual environement using Anaconda 3.  
The npm packages used in frontend is output as file in the following path.
```
./react/frontend/npmlist.json
```


## Application API
The application supports the following API routes:  

Generate token and refresh token
```
api/token/ 
api/token/refresh/
```  

Resigter / sign up 
```
api/register/ 
```  

Get user's profile
```
api/profile/<int:user_id>
```  

Retrieve all threads
```
api/threads/
```  

Retrieve a single thread
```
api/threads/<int:thread_id>
```  

Get all the posts/replies of a thread
```
api/threads/<int:thread_id>/posts 
```  

Get the top 5 threads sorted by number of replies
```
api/topThreads/
```  

Get threads by topic
```
api/threads/topic/<int:topic_id>
```  

Create/add a new thread
```
api/createThread/
```  

Create/add a new post (reply a thread)
```
api/createPost/ 
```  

Add bookmark / Remove bookmark
```
api/pin/ 
```

Check user's bookmark of a given thread
```
api/pin/<int:thread_id>&&<int:user_id>
```

Get all bookmarked threads
```
api/bookmark/<int:user_id> 
```

## Further work
- deploy to heroku ✔
- writing unit test 

## Requirements
In this project, you are asked to build a web application of your own. The nature of the application is up to you, subject to a few requirements:
- Your web application must be sufficiently distinct from the other projects in this course (and, in addition, may not be based on the old CS50W Pizza    project), and more complex than those.
    - A project that appears to be a social network is a priori deemed by the staff to be indistinct from Project 4, and should not be submitted; it will be rejected.
    - A project that appears to be an e-commerce site is strongly suspected to be indistinct from Project 2, and your README.md file should be very clear as to why it’s not. Failing that, it should not be submitted; it will be rejected.

- Your web application must utilize Django (including at least one model) on the back-end and JavaScript on the front-end.
    -   Under its own header within the README called Distinctiveness and Complexity: Why you believe your project satisfies the distinctiveness and complexity requirements, mentioned above.
    -   What’s contained in each file you created.
    -   How to run your application.
    -   Any other additional information the staff should know about your project.
- Your web application must be mobile-responsive.
- In a README.md in your project’s main directory, include a writeup describing your project, and specifically your file MUST include all of the following:
- If you’ve added any Python packages that need to be installed in order to run your web application, be sure to add them to a requirements.txt file!
- Though there is not a hard requirement here, a README.md in the neighborhood of 500 words is likely a solid target, assuming the other requirements are also satisfied.

## Demonstration
Watch the video in YouTube!
:point_right:https://youtu.be/zzLLeG3HUvA
