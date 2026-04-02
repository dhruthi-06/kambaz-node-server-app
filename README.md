# Kambaz - Backend

RESTful API backend for the Kambaz Learning Management System. Built with Node.js, Express, and MongoDB, this server provides a comprehensive API for authentication, course management, assignments, quizzes, enrollments, modules, and all data operations for the Kambaz platform.

**Live API:** https://kambaz-complete-project-backend.onrender.com  
**Frontend Application:** https://kambaz-complete-project-frontend.vercel.app

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Authentication](#authentication)
- [Development Guidelines](#development-guidelines)
- [Deployment](#deployment)

---

## Overview

This backend application provides a robust, scalable RESTful API for the Kambaz Learning Management System. It handles all server-side operations including user authentication, database interactions, and business logic for courses, assignments, quizzes, enrollments, and module management. The API follows RESTful principles and implements proper error handling, validation, and security measures.

---

## Features

### Authentication & Authorization
- JWT-based authentication system
- Secure password hashing with bcrypt
- Role-based access control (Student, Instructor, Admin)
- Session management

### Course Management
- CRUD operations for courses
- Course publishing and unpublishing
- Enrollment and member management
- Course statistics and analytics

### Assignment System
- Create, update, and delete assignments
- Submission handling and file upload support
- Assignment grading and due date management
- Late submission tracking

### Quiz Management
- Quiz creation and editing with multiple question types
- Attempt tracking, automatic and manual grading
- Quiz statistics and time limit enforcement

### Module & Lesson Organization
- Hierarchical module structure with lesson management
- Module ordering and prerequisites
- Content publishing controls and progress tracking

### User & Enrollment Management
- User profile management and directory
- Role assignment and enrollment tracking
- Student roster management and enrollment analytics

---

## Tech Stack

**Core Technologies**
- Runtime: Node.js (v16+)
- Framework: Express.js
- Language: JavaScript (ES6+)
- Database: MongoDB with Mongoose ODM
- Authentication: JWT (JSON Web Tokens)
- Password Hashing: bcrypt

**Additional Libraries**
- CORS, dotenv, express-validator, multer, mongoose

**Development Tools**
- nodemon: Development auto-restart

---

## Project Structure

```
kambaz-node-server-app/
├── Kambaz/
│   ├── Assignments/
│   │   ├── dao.js
│   │   ├── model.js
│   │   ├── routes.js
│   │   └── schema.js
│   ├── Courses/
│   │   ├── dao.js
│   │   ├── model.js
│   │   ├── routes.js
│   │   └── schema.js
│   ├── Database/
│   │   ├── assignments.js
│   │   ├── courses.js
│   │   ├── enrollments.js
│   │   ├── modules.js
│   │   ├── users.js
│   │   └── index.js
│   ├── Enrollments/
│   │   ├── dao.js
│   │   ├── model.js
│   │   ├── routes.js
│   │   └── schema.js
│   ├── Modules/
│   │   ├── dao.js
│   │   ├── model.js
│   │   ├── routes.js
│   │   └── schema.js
│   ├── QuizAttempts/
│   │   ├── dao.js
│   │   ├── model.js
│   │   ├── routes.js
│   │   └── schema.js
│   ├── Quizzes/
│   │   ├── dao.js
│   │   ├── model.js
│   │   ├── routes.js
│   │   └── schema.js
│   └── Users/
│       ├── dao.js
│       ├── migration.js
│       ├── model.js
│       ├── routes.js
│       └── schema.js
├── Labs/
├── .env
├── .gitignore
├── hello.js
├── index.js
├── package.json
├── server.js
└── vercel.json
```

> Note: `vercel.json` is kept as a backup deployment option; primary deployment is on Render.

---

## Installation

**Prerequisites**
- Node.js: v16.0.0 or higher
- MongoDB: Local installation or MongoDB Atlas account
- npm: v8.0.0 or higher

**Setup Steps**

1. Clone the repository:
```bash
git clone https://github.com/dhruthi-06/kambaz-complete-project-backend.git
cd kambaz-complete-project-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```
PORT=4000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/kambaz
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=24h
FRONTEND_URL=http://localhost:3000
```

4. Start MongoDB (if using local):
```bash
mongod
```

5. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

Server runs at `http://localhost:4000`.

**Available Scripts**
```bash
npm start       # Production server
npm run dev     # Development with auto-restart
npm run seed    # Seed database with sample data
```

---

## API Endpoints

**Base URLs**
- Development: `http://localhost:4000/api`
- Production: `https://kambaz-complete-project-backend.onrender.com`

### Users (`/api/users`)
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/users/signup` | Register new user | No |
| POST | `/api/users/signin` | User login | No |
| POST | `/api/users/signout` | User logout | Yes |
| GET | `/api/users/profile` | Get current user profile | Yes |
| PUT | `/api/users/profile` | Update user profile | Yes |
| GET | `/api/users` | Get all users | Yes |
| GET | `/api/users/:userId` | Get user by ID | Yes |
| PUT | `/api/users/:userId` | Update user | Admin |
| DELETE | `/api/users/:userId` | Delete user | Admin |

### Courses (`/api/courses`)
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/courses` | Get all courses | No |
| GET | `/api/courses/:courseId` | Get course by ID | No |
| POST | `/api/courses` | Create course | Instructor |
| PUT | `/api/courses/:courseId` | Update course | Instructor |
| DELETE | `/api/courses/:courseId` | Delete course | Instructor |
| GET | `/api/courses/:courseId/users` | Get course members | Yes |

### Assignments
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/courses/:courseId/assignments` | Get course assignments | Yes |
| GET | `/api/assignments/:assignmentId` | Get assignment by ID | Yes |
| POST | `/api/courses/:courseId/assignments` | Create assignment | Instructor |
| PUT | `/api/assignments/:assignmentId` | Update assignment | Instructor |
| DELETE | `/api/assignments/:assignmentId` | Delete assignment | Instructor |
| POST | `/api/assignments/:assignmentId/submit` | Submit assignment | Student |
| PUT | `/api/assignments/:assignmentId/grade` | Grade assignment | Instructor |

### Quizzes
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/courses/:courseId/quizzes` | Get course quizzes | Yes |
| GET | `/api/quizzes/:quizId` | Get quiz by ID | Yes |
| POST | `/api/courses/:courseId/quizzes` | Create quiz | Instructor |
| PUT | `/api/quizzes/:quizId` | Update quiz | Instructor |
| DELETE | `/api/quizzes/:quizId` | Delete quiz | Instructor |
| POST | `/api/quizzes/:quizId/attempt` | Start quiz attempt | Student |
| PUT | `/api/quizzes/:quizId/attempt/:attemptId` | Submit attempt | Student |
| GET | `/api/quizzes/:quizId/attempts` | Get all attempts | Instructor |

### Modules
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/courses/:courseId/modules` | Get course modules | Yes |
| GET | `/api/modules/:moduleId` | Get module by ID | Yes |
| POST | `/api/courses/:courseId/modules` | Create module | Instructor |
| PUT | `/api/modules/:moduleId` | Update module | Instructor |
| DELETE | `/api/modules/:moduleId` | Delete module | Instructor |

### Enrollments
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/users/:userId/enrollments` | Get user enrollments | Yes |
| GET | `/api/courses/:courseId/enrollments` | Get course enrollments | Yes |
| POST | `/api/courses/:courseId/enroll` | Enroll in course | Yes |
| DELETE | `/api/courses/:courseId/unenroll` | Unenroll from course | Yes |

---

## Database Schema

### User
```json
{
  "username": "String (unique, required)",
  "password": "String (hashed)",
  "firstName": "String",
  "lastName": "String",
  "email": "String (unique)",
  "role": "STUDENT | INSTRUCTOR | ADMIN",
  "dob": "Date"
}
```

### Course
```json
{
  "name": "String (required)",
  "number": "String (unique)",
  "description": "String",
  "instructor": "ObjectId → User",
  "startDate": "Date",
  "endDate": "Date",
  "credits": "Number",
  "published": "Boolean"
}
```

### Assignment
```json
{
  "title": "String (required)",
  "course": "ObjectId → Course",
  "description": "String",
  "points": "Number",
  "dueDate": "Date",
  "submissions": [{ "student": "ObjectId", "grade": "Number", "files": "[String]" }]
}
```

### Quiz
```json
{
  "title": "String (required)",
  "course": "ObjectId → Course",
  "type": "Graded Quiz | Practice Quiz | Graded Survey",
  "points": "Number",
  "timeLimit": "Number",
  "questions": [{ "type": "String", "question": "String", "choices": "[String]", "correctAnswer": "String" }],
  "published": "Boolean"
}
```

### QuizAttempt
```json
{
  "quiz": "ObjectId → Quiz",
  "student": "ObjectId → User",
  "answers": [{ "question": "ObjectId", "answer": "String", "isCorrect": "Boolean" }],
  "score": "Number",
  "startedAt": "Date",
  "submittedAt": "Date"
}
```

### Module
```json
{
  "name": "String (required)",
  "course": "ObjectId → Course",
  "order": "Number",
  "lessons": [{ "name": "String", "type": "String", "content": "String" }]
}
```

### Enrollment
```json
{
  "user": "ObjectId → User",
  "course": "ObjectId → Course",
  "role": "STUDENT | INSTRUCTOR | TA",
  "status": "active | completed | dropped",
  "grade": "Number"
}
```

---

## Authentication

The API uses JWT for authentication.

**Flow:** Sign up/in → server issues JWT → client includes token in `Authorization: Bearer <token>` header → server validates on protected routes.

**Role Permissions**
- Student: View courses, submit assignments, take quizzes
- Instructor: All student permissions + create/edit courses, assignments, quizzes, grade submissions
- Admin: Full system access

---

## Architecture

Each module follows the **DAO pattern** (Data Access Object) for clean separation between route handling and data operations. Routes call DAO functions, which interact with Mongoose models directly.

**CORS Configuration**
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

---

## Security Features
- Password hashing with bcrypt
- JWT-based authentication
- CORS configuration
- Input validation middleware
- Mongoose sanitization against NoSQL injection
- Environment variables for all secrets

---

## Development Guidelines

- Follow RESTful API design principles
- Use consistent naming conventions
- Implement proper error handling with try-catch
- Keep functions small and focused

**Error Handling Pattern**
```javascript
try {
  const course = await dao.findCourseById(courseId);
  if (!course) return res.status(404).json({ message: 'Course not found' });
  res.json(course);
} catch (error) {
  res.status(500).json({ message: 'Server error', error: error.message });
}
```

---

## Deployment

The backend is deployed on Render with automatic deployments from GitHub.

**Environment Variables (set in Render dashboard)**
```
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=https://kambaz-complete-project-frontend.vercel.app
NODE_ENV=production
```

Every push to `main` triggers an automatic redeploy. Render provides automatic HTTPS, built-in health checks, and real-time deployment logs.

> Note: Free tier instances sleep after 15 minutes of inactivity and may have a ~30–50 second cold start. Use a service like UptimeRobot to ping the API periodically if needed.

---

## Author

**Dhruthi Rajesh**
- GitHub: [@dhruthi-06](https://github.com/dhruthi-06)
- Project: Academic Assignment

---

## Acknowledgments
- Built with [Node.js](https://nodejs.org/) and [Express.js](https://expressjs.com/)
- Database: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- Authentication: JWT
- Deployed on [Render](https://render.com/)

---

*This is a student project created for educational purposes as part of a web development course, demonstrating full-stack development practices, RESTful API design, and database management.*
