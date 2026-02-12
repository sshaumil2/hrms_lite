# HRMS Lite

A full-stack HRMS (Human Resource Management System) built with Django + MongoDB (MongoEngine) for backend APIs and React.js for frontend. Deployed using NginX, PM2 with ecosystem configuration for production-grade process management.

---

## Application Features & Modules

### Dashboard
The dashboard is the default landing page of the system and provides a real-time overview of the organization.

Features:
- Total Employees Count
- Total Present Employees (Today)
- Total Absent Employees (Today)
- Not Marked Attendance Employees (Today)

This section provides administrators with a quick operational summary of daily workforce status.

---

### Employee Management

This module allows full employee lifecycle management.

Features:
- View all employees in a structured data table
- Add new employees using the "Add" button
- Edit employee details using the "Edit" action
- Delete employees using the "Delete" action
- Export employee data:
  - Download as CSV
  - Print employee records

Known Limitation:
- After deleting an employee, a manual page refresh is required due to a DataTable state refresh issue. The server is small so it can give empty fields sometimes. If you will feel this, please refresh once so that data can be captured. All other operations function in real-time without refresh. 

---

### Attendance (Today)

This section displays only today's attendance records.

Features:
- View today's attendance entries
- Add attendance using the "Add" button
- Real-time attendance tracking for the current date

---

### Employee Present Days

This module provides analytical insights into attendance history.

Features:
- Displays each employee’s total present days
- Numeric representation for quick analysis
- Useful for HR reporting and performance tracking

---

### Employee Attendance Records

This module provides detailed attendance history per employee.

Features:
- List of all employees
- Right-side column action: "View Attendance Record"
- On click:
  - Displays complete attendance history of the selected employee
  - Includes all past attendance entries
  - Employee-wise attendance tracking and auditing
  - We can filter by searching for name, date, employee id, etc.

---

System Capabilities Summary:
- Centralized HR management system
- Real-time attendance tracking
- MongoDB-powered scalable backend
- REST API-based architecture
- Secure API communication with CORS handling
- Modular frontend with React.js
- Production-ready deployment using PM2
- Ecosystem-based process management
- Scalable architecture for enterprise usage
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

