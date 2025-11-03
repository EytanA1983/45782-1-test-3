# Full-Stack Application Build Process - Exam Prep Checklist

## Exam Date: Tuesday

This checklist provides a step-by-step guide for building a full-stack application with Docker containerization.

---

## Phase 1: Initial Setup & Git

- [ ] **1. Create git repository**
- [ ] **2. Clone repository to local machine**
- [ ] **3. Create 3 basic folders:**
  - [ ] `backend/`
  - [ ] `database/`
  - [ ] `frontend/`
- [ ] **4. Open reference project** (this folder serves as your reference)
- [ ] **5. Copy all static files:**
  - [ ] Dockerfiles
  - [ ] docker-compose.yaml
  - [ ] .dockerignore files

---

## Phase 2: Backend Setup

### 2.1 Folder Structure
- [ ] **6a. Create the backend folder structure**
  - [ ] `src/`
  - [ ] `src/controllers/`
  - [ ] `src/models/`
  - [ ] `src/routers/`
  - [ ] `src/middlewares/`
  - [ ] `src/db/`
  - [ ] `config/`

### 2.2 Copy Essential Files
- [ ] **6b. Copy `db/` folder** from reference
- [ ] **6c. Copy middlewares from `middlewares/` folder:**
  - [ ] `error/logger.ts`
  - [ ] `error/responder.ts`
  - [ ] `not-found.ts`
  - [ ] `param-validation.ts`
  - [ ] `validation.ts`

---

## Phase 3: Backend Development

### 3.1 Initial Configuration
- [ ] **7. Now we can start working on backend**
- [ ] **8. Run `npm install`** in backend directory
- [ ] **9. Create MySQL database** (manually in phpMyAdmin or MySQL Workbench)
- [ ] **10. Update `config/default.json`** with database name

### 3.2 Database Models
- [ ] **11. Create Sequelize models** in `src/models/`
  - [ ] Define model classes
  - [ ] Add proper decorators (@Table, @Column, etc.)
  - [ ] Set up relationships if needed
- [ ] **12. Fix `db/sequelize.ts`** with new model imports
- [ ] **13. Remove red missing imports from `app.ts`**

### 3.3 First Run & Database Verification
- [ ] **14. Run the app for the 1st time** - hopefully database tables will be created
  - Run: `npm run dev`
- [ ] **15. Verify database was created properly**
  - Check tables exist
  - Verify structure matches models
  - Fix any issues if needed

### 3.4 Database Seeding
- [ ] **16. Feed data into the database** (insert test/initial data)
- [ ] **17. Export database**
  - ⚠️ **IMPORTANT:** In phpMyAdmin, don't forget to check "Add CREATE DATABASE..." option
- [ ] **18. Save the export** in `database/` folder (e.g., `database/my_app.sql`)
- [ ] **19. Modify `database/Dockerfile`** with new SQL export file name

### 3.5 API Development Loop
- [ ] **20. In a loop, for each endpoint:**
  - [ ] **a. Develop controller** in `src/controllers/`
  - [ ] **b. Create validators as required** (using Joi)
  - [ ] **c. Add routing** to controller with validation if required
  - [ ] **d. Add router to `app.ts`**
  - [ ] **e. Test in Postman** (save to designated collection)
  - [ ] **f. Repeat** until all routes are working

- [ ] **21. Export Postman collection** and save in root of backend directory

---

## Phase 4: Frontend Development

### 4.1 Initial Setup
- [ ] **22. Copy React folder structure** from reference
  - ⚠️ **EXCEPT:** `src/redux/` and `src/hooks/` (develop these yourself if needed)
- [ ] **23. Develop models** in `src/models/`
  - [ ] Create TypeScript interfaces/types matching backend models
- [ ] **24. Develop services** in `src/services/`
  - [ ] API calls using axios
  - [ ] Error handling

### 4.2 UI Development
- [ ] **25. Adjust layout** to the current app
  - [ ] Update header/footer
  - [ ] Adjust navigation
  - [ ] Modify styling
- [ ] **26. Develop components**
  - [ ] List components
  - [ ] Form components
  - [ ] Common/reusable components

---

## Phase 5: Build Verification

- [ ] **27. Run build in backend**
  - Run: `npm run build`
  - Verify: No errors
- [ ] **27. Run build in frontend**
  - Run: `npm run build`
  - Verify: No errors

---

## Phase 6: Docker Deployment

### 6.1 Configuration
- [ ] **28a. Change container names** in `docker-compose.yaml`
  - Prevent collision with previous existing containers
  - Example: `my-app-db`, `my-app-backend`, `my-app-frontend`

- [ ] **28b. Update MYSQL_DATABASE environment variable**
  - In `docker-compose.yaml` under database service
  - Must match database name in `backend/config/default.json`

### 6.2 Pre-Launch Checks
- [ ] **28c. Make sure all previous containers are down**
  - Run: `docker ps` to check running containers
  - Stop any conflicting containers
  - ⚠️ Note: MySQL and phpMyAdmin are generally the only other containers that can stay running
  - Check ports are not being used: 3306, 3000, 5173, 80

### 6.3 Launch
- [ ] **28d. 🙏 Pray and run `docker compose up -d` and pray again 🙏**
  - Wait for containers to start
  - Check logs: `docker compose logs -f`
  - Verify all 3 containers are running: `docker ps`

### 6.4 Post-Launch Verification
- [ ] **Test database container:** Can connect to MySQL
- [ ] **Test backend container:** API endpoints respond correctly
- [ ] **Test frontend container:** Application loads in browser
- [ ] **Test full integration:** Frontend can communicate with backend and data flows properly

---

## Quick Reference Commands

### Backend
```bash
cd backend
npm install
npm run dev        # Development mode
npm run build      # Production build
npm start          # Run production build
```

### Frontend
```bash
cd frontend
npm install
npm run dev        # Development mode
npm run build      # Production build
npm run preview    # Preview production build
```

### Docker
```bash
docker compose up -d              # Start all containers
docker compose down               # Stop all containers
docker compose logs -f            # View logs
docker compose logs -f <service>  # View specific service logs
docker ps                         # List running containers
docker compose restart <service>  # Restart a service
```

### Database
```bash
# Connect to MySQL container
docker exec -it <container-name> mysql -u root -p

# Export database
mysqldump -u root -p <database-name> > backup.sql
```

---

## Important Notes & Tips

### Configuration Files to Update
1. **`backend/config/default.json`** - Database name and connection details
2. **`docker-compose.yaml`** - Container names, ports, environment variables
3. **`database/Dockerfile`** - SQL export file name
4. **`.env` files** (if applicable) - API URLs, environment-specific settings

### Common Pitfalls
- ❌ Forgetting to update database name in both backend config and docker-compose
- ❌ Port conflicts with existing containers
- ❌ Not checking "Add CREATE DATABASE" when exporting from phpMyAdmin
- ❌ Missing model imports in `db/sequelize.ts`
- ❌ Not testing each endpoint before moving to the next

### Time Management
- Backend setup & API development: ~40% of time
- Frontend development: ~40% of time
- Docker & deployment: ~15% of time
- Testing & debugging: ~5% of time (ongoing)

### Success Indicators
✅ No red errors in code editor
✅ `npm run build` succeeds in both backend and frontend
✅ All Postman tests pass
✅ All Docker containers start and stay running
✅ Frontend can fetch and display data from backend

---

**Good luck on your exam Tuesday! 🚀**

*Reference project location: `C:\Users\maore\Desktop\01-preps-for-test\`*

