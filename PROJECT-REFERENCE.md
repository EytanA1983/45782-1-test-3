# Project Reference - Toys R Us Game Management System

This document provides an overview of the reference project structure you can use as a template for your exam.

---

## 🏗️ Project Architecture

This is a **full-stack application** with:
- **Backend:** Node.js + Express + TypeScript + Sequelize ORM
- **Frontend:** React + TypeScript + Vite
- **Database:** MySQL
- **Deployment:** Docker Compose

---

## 📁 Backend Structure (`/backend`)

### Main Files
```
backend/
├── Dockerfile                              # Backend container configuration
├── package.json                            # Dependencies and scripts
├── tsconfig.json                          # TypeScript configuration
└── toys r us.postman_collection.json      # API tests
```

### Configuration (`/backend/config/`)
- `default.json` - Default configuration (database connection, etc.)
- `docker.json` - Docker-specific overrides
- `compose.json` - Docker Compose overrides
- `production.json` - Production overrides
- `custom-environment-variables.json` - Environment variable mappings

### Source Code (`/backend/src/`)

#### 📝 Models (`/backend/src/models/`)
- `Audience.ts` - Audience/user model
- `Game.ts` - Game model

**Key patterns:**
- Uses Sequelize TypeScript decorators (@Table, @Column, @PrimaryKey, etc.)
- Defines relationships between models

#### 🎮 Controllers (`/backend/src/controllers/`)
```
controllers/
├── audiences/
│   └── controller.ts          # Audience CRUD operations
└── games/
    ├── controller.ts          # Game CRUD operations
    └── validator.ts           # Joi validation schemas
```

**Key patterns:**
- Express RequestHandler functions
- Try-catch error handling
- Status code management
- Validation integration

#### 🛤️ Routers (`/backend/src/routers/`)
- `audiences.ts` - Routes for audience endpoints
- `games.ts` - Routes for game endpoints

**Key patterns:**
- Express Router
- Route-controller mapping
- Middleware integration (validation)

#### 🛡️ Middlewares (`/backend/src/middlewares/`)
```
middlewares/
├── error/
│   ├── logger.ts             # Error logging
│   └── responder.ts          # Error response formatting
├── not-found.ts              # 404 handler
├── param-validation.ts       # Validation middleware
└── validation.ts             # Joi validation wrapper
```

#### 🗄️ Database (`/backend/src/db/`)
- `sequelize.ts` - Sequelize instance configuration and model registration

#### 🚀 Entry Point
- `app.ts` - Express app setup, middleware registration, router mounting

---

## 📁 Frontend Structure (`/frontend`)

### Main Files
```
frontend/
├── Dockerfile                    # Frontend container (development)
├── Dockerfile.compose           # Frontend container (production with nginx)
├── nginx.conf                   # Nginx configuration for production
├── package.json                 # Dependencies and scripts
├── vite.config.ts              # Vite build configuration
├── tsconfig.json               # TypeScript base config
├── tsconfig.app.json           # App-specific TypeScript config
├── tsconfig.node.json          # Node-specific TypeScript config
├── eslint.config.js            # ESLint configuration
└── index.html                  # HTML entry point
```

### Source Code (`/frontend/src/`)

#### 📋 Models (`/frontend/src/models/`)
- `Audience.ts` - Audience TypeScript interface
- `Game.ts` - Game TypeScript interface
- `GameDraft.ts` - Game draft/form interface

#### 🌐 Services (`/frontend/src/services/`)
- `audiences.ts` - API calls for audience endpoints
- `games.ts` - API calls for game endpoints

**Key patterns:**
- Axios HTTP client
- Environment-based base URL
- Async/await
- Error handling

#### 🎨 Components (`/frontend/src/components/`)

```
components/
├── app/
│   ├── App.tsx                      # Main app component
│   └── App.css
├── layout/
│   ├── header/                      # Header component
│   ├── footer/                      # Footer component
│   ├── layout/                      # Main layout wrapper
│   ├── main/                        # Main content area
│   └── not-found/                   # 404 page
├── games/
│   ├── list/                        # Game list component
│   └── new/                         # New game form
└── common/
    ├── spinner/                     # Loading spinner
    └── spinner-button/              # Button with loading state
```

**Key patterns:**
- React functional components
- React hooks (useState, useEffect)
- React Router for navigation
- CSS modules for styling

#### 🎯 Entry Point
- `main.tsx` - React app initialization and routing setup
- `index.css` - Global styles

---

## 📁 Database Structure (`/database`)

```
database/
├── Dockerfile                      # MySQL container configuration
└── toys_r_us.sql                  # Database schema and seed data
```

**The SQL file contains:**
- CREATE DATABASE statement
- Table definitions
- Initial/seed data
- Constraints and indexes

---

## 🐳 Docker Configuration

### `docker-compose.yaml`

Defines 3 services:

#### 1. Database Service
```yaml
- Container: nature-hiking-db
- Port: 3309:3306
- Database: nature_hiking
- Health check: mysqladmin ping
```

#### 2. Backend Service
```yaml
- Container: nature-hiking-backend
- Port: 3020:3000
- Depends on: database (waits for health check)
- Environment: NODE_ENV=compose
```

#### 3. Frontend Service
```yaml
- Container: nature-hiking-frontend
- Port: 3012:80
- Uses: nginx for serving static files
```

---

## 🔑 Key Technologies & Packages

### Backend
- **express** (v5.1.0) - Web framework
- **sequelize-typescript** (v2.1.6) - ORM
- **mysql2** (v3.15.1) - MySQL driver
- **joi** (v18.0.1) - Validation
- **jsonwebtoken** (v9.0.2) - JWT authentication
- **cors** (v2.8.5) - CORS handling
- **config** (v4.1.1) - Configuration management

### Frontend
- **react** (v19.1.1) - UI library
- **react-router-dom** (v7.8.2) - Routing
- **axios** (v1.11.0) - HTTP client
- **react-hook-form** (v7.62.0) - Form management
- **@reduxjs/toolkit** (v2.8.2) - State management
- **vite** (v7.1.2) - Build tool

---

## 📊 Data Models

### Audience Model
Fields you might find:
- id (Primary Key)
- name
- description
- age range
- timestamps

### Game Model
Fields you might find:
- id (Primary Key)
- name/title
- description
- price
- audience_id (Foreign Key)
- stock/inventory
- timestamps

---

## 🧪 Testing

### Postman Collection
`toys r us.postman_collection.json` contains:
- All API endpoints
- Request examples
- Test cases
- Environment variables (if any)

**Import this into Postman** to test your API during development.

---

## 🚀 Running the Application

### Development Mode

**Backend:**
```bash
cd backend
npm install
npm run dev
# Runs on http://localhost:3000
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

### Production Mode (Docker)

```bash
docker compose up -d
# Backend: http://localhost:3020
# Frontend: http://localhost:3012
# Database: localhost:3309
```

---

## 💡 Tips for Your Exam

### What to Study
1. **Sequelize models:** Decorators, relationships, data types
2. **Express routing:** Router setup, middleware order
3. **Joi validation:** Schema definition, validation patterns
4. **React hooks:** useState, useEffect, custom hooks
5. **Axios:** GET, POST, PUT, DELETE requests
6. **Docker Compose:** Service definition, dependencies, environment variables

### Common Patterns to Remember

**Controller pattern:**
```typescript
export const getAll = async (req: Request, res: Response) => {
    try {
        const items = await Model.findAll();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: 'Message' });
    }
};
```

**Service pattern:**
```typescript
export const getAll = async (): Promise<Model[]> => {
    const response = await axios.get(`${BASE_URL}/endpoint`);
    return response.data;
};
```

**Component pattern:**
```typescript
export const Component = () => {
    const [data, setData] = useState<Type[]>([]);
    
    useEffect(() => {
        const fetchData = async () => {
            const result = await service.getAll();
            setData(result);
        };
        fetchData();
    }, []);
    
    return <div>{/* JSX */}</div>;
};
```

---

**This reference project is your template. Study it, understand it, and you'll be ready for Tuesday! 💪**

