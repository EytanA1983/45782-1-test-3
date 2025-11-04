# 📅 Development Teams Meetings Management System

**Exam Project - November 4, 2025**

Full-Stack application for managing development team meetings with MySQL database, Node.js REST API, and React frontend.

---

## 🎯 Project Overview

This system allows development teams to:
- ✅ View all development teams
- ✅ Schedule meetings for specific teams
- ✅ View meetings filtered by team
- ✅ Check available meeting rooms in real-time
- ✅ Prevent double-booking of teams
- ✅ Display meeting duration

---

## 🏗️ Architecture

### **Backend (Node.js + TypeScript)**
- Express REST API
- Sequelize ORM with MySQL
- Joi validation
- CORS enabled

### **Frontend (React + TypeScript)**
- Vite build tool
- React Router for navigation
- Axios for API calls
- Responsive CSS design

### **Database (MySQL)**
- Teams table (development teams)
- Meetings table (scheduled meetings)
- Foreign key relationships

### **Deployment (Docker)**
- Multi-container setup with Docker Compose
- MySQL container with initialization
- Backend Node.js container
- Frontend Nginx container

---

## 📊 Database Schema

### Teams Table
```sql
- id (INT, AUTO_INCREMENT, PRIMARY KEY)
- name (VARCHAR, NOT NULL)
- created_at, updated_at (DATETIME)
```

### Meetings Table
```sql
- id (INT, AUTO_INCREMENT, PRIMARY KEY)
- team_id (INT, FOREIGN KEY → teams.id)
- start_time (DATETIME, NOT NULL)
- end_time (DATETIME, NOT NULL)
- description (TEXT, NOT NULL)
- room (VARCHAR, NOT NULL)
- created_at, updated_at (DATETIME)
```

---

## 🚀 Quick Start

### Option 1: Development Mode

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Database:**
- Import `database/dev_teams_meetings.sql` to MySQL

### Option 2: Production (Docker)

```bash
docker compose up -d --build
```

**Access:**
- Frontend: http://localhost:3012
- Backend API: http://localhost:3020

---

## 📡 API Endpoints

### Teams
- `GET /teams` - Get all development teams

### Meetings
- `GET /meetings/by-team/:teamId` - Get meetings by team
- `GET /meetings/available-rooms?startTime=...&endTime=...` - Get available rooms
- `POST /meetings` - Create new meeting
- Body: `{ teamId, startTime, endTime, description, room }`

---

## ✨ Key Features

### 🎨 Smart Room Selection
- Real-time availability checking
- AutoComplete dropdown with available rooms
- Visual feedback showing number of available rooms

### 🚫 Conflict Prevention
- Prevents overlapping meetings for the same team
- Returns error with conflicting meetings details

### ⏱️ Meeting Duration Display
- Automatic calculation and display
- Format: "2h 30m" or "45m"

### 📱 Responsive Design
- Modern gradient UI
- Card-based meeting display
- Mobile-friendly layout

---

## 🧪 Testing

### Postman Collection
Import `backend/dev-teams-meetings.postman_collection.json` for API testing.

**Example Requests:**
1. Get all teams
2. Get Team UI meetings
3. Create new meeting
4. Check available rooms

---

## 📁 Project Structure

```
├── backend/
│   ├── src/
│   │   ├── models/         # Team, Meeting
│   │   ├── controllers/    # Business logic
│   │   ├── routers/        # API routes
│   │   └── middlewares/    # Validation, error handling
│   └── config/             # Environment configs
│
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API services
│   │   └── models/         # TypeScript interfaces
│   └── public/
│
├── database/
│   ├── dev_teams_meetings.sql  # Schema + seed data
│   └── Dockerfile
│
└── docker-compose.yaml     # Container orchestration
```

---

## 🛠️ Technologies Used

**Backend:**
- Node.js 22
- TypeScript
- Express 5
- Sequelize ORM
- Joi validation
- MySQL2 driver

**Frontend:**
- React 19
- TypeScript
- Vite 7
- Axios
- React Router

**DevOps:**
- Docker & Docker Compose
- Nginx (production)
- MySQL 8

---

## 🎓 Exam Requirements Completed

✅ **Database:**
- Teams table with auto-increment ID and name
- Meetings table with all required fields
- Foreign key relationships
- Sample data included

✅ **Backend:**
- GET all teams
- GET meetings by team
- POST new meeting
- Joi validation on all inputs

✅ **Frontend:**
- Team selection dropdown
- Meetings display (cards)
- Add meeting form with all fields
- All fields required

✅ **Bonus Features:**
- Prevent overlapping meetings ⭐
- Display meeting duration ⭐
- Real-time room availability ⭐

---

## 📝 Notes

- Database is pre-populated with 6 teams and 10 sample meetings
- All code comments and UI text are in English
- Includes full error handling and validation
- Docker setup with health checks
- Production-ready build configuration

---

## 👨‍💻 Development

Built for exam on November 4, 2025

**Stack:** Node.js + React + MySQL + Docker
**Pattern:** REST API + Component-based UI
**Focus:** Clean code, validation, user experience

---

## 🚢 Deployment

The application runs in 3 Docker containers:
1. **dev-teams-db** - MySQL database (port 3309)
2. **dev-teams-backend** - Node.js API (port 3020)
3. **dev-teams-frontend** - React app (port 3012)

All containers are networked and the backend waits for the database health check before starting.

---

**Ready for evaluation! 🎯**
