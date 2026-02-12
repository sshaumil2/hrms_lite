# HRMS Lite

A full-stack HRMS (Human Resource Management System) built with Django + MongoDB (MongoEngine) for backend APIs and React.js for frontend. Deployed using NginX, PM2 with ecosystem configuration for production-grade process management.

---

## Tech Stack

### Backend
- Django
- Django Rest Framework (DRF)
- MongoDB
- MongoEngine (ODM for MongoDB)
- django-cors-headers
- PM2
- Ecosystem config file

### Frontend
- React.js

### Database
- MongoDB

---

## Project Structure

```
hrms_lite/
│
├── hrms_backend/
│   ├── api/
│   ├── hrms_backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── ecosystem.config.js
│   └── venv/
│
├── hrms_frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── build/
│
└── README.md

```

## Architecture

```
React Frontend  --->  Django REST API  --->  MongoDB  
        |                  |  
        |                  |  
        +------ CORS ------+

```

# Local Development Setup

## 1) Clone Repository

git clone <repo-url>  
cd hrms_lite

---

## 2) Backend Setup (Django + MongoDB)

### Install Dependencies

pip install (4 dependencies which you will get during starting server)

---

### MongoDB Setup

Install MongoDB:  
https://www.mongodb.com/try/download/community

Start MongoDB:
mongod

---

### Run Backend Server

python manage.py runserver

Backend URL:
http://127.0.0.1:8000

---

## 3) Frontend Setup (React.js)

cd hrms_frontend  
npm install  

Run frontend:
npm start  

Frontend URL:
http://localhost:3000

# Author

Shaumil Sahariya  
Full Stack Developer  

