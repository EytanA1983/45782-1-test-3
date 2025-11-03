# 🌳 מערכת ניהול אתרי טיולים - החברה להגנת הטבע

**Exam Date:** Tuesday, November 4, 2025

פרויקט Full-Stack מלא לניהול אתרי טיולים בישראל עם מסד נתונים, API ו-React UI.

## 📚 קישורים מהירים
- **[📑 אינדקס כל הקבצים →](PROJECT-FILES-INDEX.md)** - מצא כל תיעוד במקום אחד
- **[🚀 התחלה מהירה בעברית →](QUICK-START-HEBREW.md)** - התחל לעבוד מיד
- **[📖 תיעוד מלא בעברית →](PROJECT-README-HEBREW.md)** - הבנה מעמיקה
- **[🔧 מדריך Git & GitHub →](GIT-WORKFLOW-GUIDE.md)** - commit, push, pull requests
- **[🎨 מדריך Git ויזואלי →](GIT-QUICK-VISUAL-GUIDE.md)** - תרשימים וחזותי

---

## 📚 Documentation Files

### 1. **EXAM-PREP-CHECKLIST.md** ⭐ START HERE
Step-by-step checklist covering the entire development process from git setup to Docker deployment. Follow this during your exam!

**What's inside:**
- ✅ Phase-by-phase checklist
- ✅ Time management tips
- ✅ Common pitfalls to avoid
- ✅ Quick reference commands
- ✅ Success indicators

### 2. **CODE-EXAMPLES.md** 💻 REFERENCE THIS
Real code examples from the reference project. Copy, understand, and adapt these patterns.

**What's inside:**
- ✅ Backend: Models, Controllers, Routers, Validators
- ✅ Frontend: Components, Services, Models
- ✅ Docker: docker-compose.yaml, Dockerfiles
- ✅ Database: SQL examples
- ✅ Common mistakes to avoid

### 3. **PROJECT-REFERENCE.md** 🗺️ UNDERSTAND THE STRUCTURE
Detailed overview of the reference project architecture and file organization.

**What's inside:**
- ✅ Complete file structure breakdown
- ✅ Technology stack explanation
- ✅ Data model documentation
- ✅ Development vs production setup
- ✅ Key patterns to remember

### 4. **GIT-WORKFLOW-GUIDE.md** 🔧 GIT & GITHUB GUIDE
Complete guide for working with Git and GitHub for any project.

**What's inside:**
- ✅ Initial setup and configuration
- ✅ Creating and managing repositories
- ✅ Daily workflow (add, commit, push, pull)
- ✅ Branches and Pull Requests
- ✅ Troubleshooting common issues
- ✅ Best practices and tips

### 5. **GIT-QUICK-VISUAL-GUIDE.md** 🎨 GIT VISUAL GUIDE
Quick visual guide with diagrams and examples.

**What's inside:**
- ✅ Visual flow diagrams
- ✅ Quick reference commands
- ✅ Common scenarios with solutions
- ✅ Daily checklist
- ✅ Emergency commands

---

## 🏗️ Reference Project Structure

```
.
├── backend/              # Node.js + Express + TypeScript + Sequelize
│   ├── config/          # Configuration files (database, app settings)
│   ├── src/
│   │   ├── app.ts       # Main application entry point
│   │   ├── db/          # Database connection
│   │   ├── models/      # Sequelize models
│   │   ├── controllers/ # Business logic
│   │   ├── routers/     # Route definitions
│   │   └── middlewares/ # Custom middlewares
│   ├── Dockerfile
│   └── package.json
│
├── frontend/            # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── models/      # TypeScript interfaces
│   │   ├── services/    # API calls (axios)
│   │   └── main.tsx     # App entry point
│   ├── Dockerfile
│   ├── Dockerfile.compose
│   └── package.json
│
├── database/            # MySQL
│   ├── Dockerfile
│   └── toys_r_us.sql   # Database schema and seed data
│
└── docker-compose.yaml  # Orchestrates all 3 containers
```

---

## 🚀 Quick Start Guide

### Option 1: Development Mode (No Docker)

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
# Runs on http://localhost:3000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

**Prerequisites:**
- MySQL running locally on port 3306
- Database created and seeded

---

### Option 2: Production Mode (Docker)

```bash
# Make sure Docker Desktop is running
docker compose up -d

# Check if all containers are running
docker ps

# View logs
docker compose logs -f

# Access the application
# Frontend: http://localhost:3012
# Backend: http://localhost:3020
# Database: localhost:3309
```

**Stop everything:**
```bash
docker compose down
```

---

## 🎯 Exam Day Strategy

### Phase 1: Setup (15 minutes)
1. Create git repository and clone
2. Create folder structure (backend, frontend, database)
3. Copy static files from reference project
4. Set up backend folder structure

### Phase 2: Backend Development (60-90 minutes)
1. Install dependencies
2. Configure database connection
3. Create Sequelize models
4. Implement controllers and validators
5. Set up routers
6. Test in Postman
7. Export Postman collection

### Phase 3: Frontend Development (60-90 minutes)
1. Set up React project structure
2. Create TypeScript models
3. Implement services (API calls)
4. Build components
5. Test in browser

### Phase 4: Build & Docker (30-45 minutes)
1. Run `npm run build` in backend and frontend
2. Export database
3. Update docker-compose.yaml
4. Test Docker deployment
5. Final verification

---

## 📋 Critical Reminders

### Configuration
- [ ] Database name matches in `backend/config/default.json` and `docker-compose.yaml`
- [ ] Container names in `docker-compose.yaml` are unique
- [ ] Ports don't conflict with existing containers
- [ ] SQL export file name in `database/Dockerfile` is correct

### Code
- [ ] All models registered in `db/sequelize.ts`
- [ ] All routers mounted in `app.ts`
- [ ] Validators imported and used in routers
- [ ] Error handling with try-catch and next(e)
- [ ] Environment variables set correctly

### Testing
- [ ] Test each endpoint in Postman before moving on
- [ ] Frontend displays data correctly
- [ ] `npm run build` succeeds in both projects
- [ ] Docker containers all start successfully

---

## 🔧 Useful Commands

### Git
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <url>
git push -u origin main
```

### NPM
```bash
npm install                # Install dependencies
npm run dev               # Development mode
npm run build             # Production build
npm start                 # Run production build
```

### Docker
```bash
docker compose up -d                    # Start containers
docker compose down                     # Stop containers
docker compose logs -f                  # View all logs
docker compose logs -f backend          # View backend logs
docker compose restart backend          # Restart backend
docker ps                               # List running containers
docker exec -it <container> bash        # Enter container shell
```

### MySQL
```bash
# Connect to MySQL in Docker
docker exec -it <db-container-name> mysql -u root -p

# Export database (in phpMyAdmin)
# ⚠️ Don't forget to check "Add CREATE DATABASE" option!

# Import database
mysql -u root -p < database.sql
```

---

## 🐛 Troubleshooting

### Backend won't start
- Check database connection in config
- Verify MySQL is running
- Check for syntax errors in models
- Make sure all models are registered

### Frontend can't connect to backend
- Check VITE_REST_SERVER_URL in .env
- Verify backend is running
- Check CORS is enabled in backend
- Check browser console for errors

### Docker issues
- Restart Docker Desktop
- Check for port conflicts: `docker ps -a`
- Stop conflicting containers: `docker stop <container>`
- Remove old containers: `docker rm <container>`
- Check logs: `docker compose logs -f`

### Database issues
- Verify database name in config
- Check SQL export file exists
- Ensure MySQL container is healthy
- Check foreign key constraints

---

## 📖 Study Recommendations

### Must Know
1. **Sequelize decorators:** @Table, @Column, @PrimaryKey, @ForeignKey, @BelongsTo, @HasMany
2. **Express patterns:** Router, middleware, error handling
3. **Joi validation:** Common validators and patterns
4. **React hooks:** useState, useEffect
5. **Axios:** GET, POST, PUT, DELETE requests
6. **Docker Compose:** Service definitions and dependencies

### Practice
- Create a model with relationships
- Write CRUD controllers
- Set up validation with Joi
- Build a form component in React
- Make API calls with axios
- Write docker-compose.yaml from scratch

### Reference During Exam
- Keep CODE-EXAMPLES.md open
- Follow EXAM-PREP-CHECKLIST.md
- Use this reference project for copy-paste

---

## 📦 Project: Nature Protection Society - Hiking Sites

**What it does:**
- Manages hiking sites across Israel regions
- CRUD operations for hiking sites
- Filter sites by geographic region
- Full-stack with Docker deployment
- Hebrew UI (RTL support)

**Data Model:**
- **Region:** id, name (צפון, דרום, מרכז, שפלה, מישור החוף, ירושלים)
- **HikingSite:** id, name, description, adultPrice, childPrice, regionId (FK)
- **Relationship:** One Region → Many HikingSites

**API Endpoints:**
- `GET /regions` - List all regions
- `GET /hiking-sites/by-region/:regionId` - Sites by region
- `POST /hiking-sites` - Create new hiking site
- `DELETE /hiking-sites/:id` - Delete hiking site

**Features:**
- Select dropdown to choose region
- Display sites as cards with full details
- Add new hiking sites with form
- Delete sites with confirmation

---

## 🎓 Before the Exam

### Technical Setup
- [ ] Docker Desktop installed and working
- [ ] Node.js installed (v18+)
- [ ] MySQL installed (or use Docker)
- [ ] Postman installed
- [ ] Code editor ready (VSCode recommended)
- [ ] Git configured

### Knowledge Check
- [ ] Understand Sequelize models and relationships
- [ ] Know Express router and middleware order
- [ ] Comfortable with React hooks
- [ ] Familiar with axios API calls
- [ ] Can write Joi validators
- [ ] Understand Docker Compose basics

### Materials Ready
- [ ] This repository accessible
- [ ] Documentation files printed or on second screen
- [ ] Reference project ready to copy from
- [ ] Postman collection ready to import

---

## 🌟 Final Tips

1. **Start with the checklist** - Don't skip steps
2. **Test frequently** - After each endpoint, test in Postman
3. **Copy wisely** - Understand what you're copying, don't just paste
4. **Time management** - Don't spend too long on one feature
5. **Error messages** - Read them carefully, they usually tell you what's wrong
6. **Database first** - Get your data model right before building APIs
7. **Build early** - Run `npm run build` before the end to catch issues
8. **Docker last** - Only dockerize when everything works locally

---

## 📞 Need Help?

During the exam, if you get stuck:
1. Check the error message carefully
2. Look in CODE-EXAMPLES.md for similar patterns
3. Verify your configuration files
4. Check the console/terminal for errors
5. Compare with reference project

---

**Good luck on Tuesday! You've got this! 🚀💪**

*Last updated: October 31, 2025*

