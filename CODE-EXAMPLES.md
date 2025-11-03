# Code Examples - Quick Reference for Exam

This document contains actual code patterns from the reference project that you can follow during your exam.

---

## 🗄️ Backend Examples

### 1. Sequelize Model (`backend/src/models/`)

```typescript
import { 
    AllowNull, 
    BelongsTo, 
    Column, 
    DataType, 
    Default, 
    ForeignKey, 
    Model, 
    PrimaryKey, 
    Table 
} from "sequelize-typescript";
import Audience from "./Audience";

@Table({
    underscored: true  // Converts camelCase to snake_case in DB
})
export default class Game extends Model {

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string

    @ForeignKey(() => Audience)
    @AllowNull(false)
    @Column(DataType.UUID)
    audienceId: string

    @AllowNull(false)
    @Column(DataType.STRING)
    name: string

    @AllowNull(false)
    @Column(DataType.TEXT)
    description: string

    @AllowNull(true)
    @Column(DataType.INTEGER)
    price: number

    // Define relationship
    @BelongsTo(() => Audience)
    audience: Audience
}
```

**Common Decorators:**
- `@Table({ underscored: true })` - Model configuration
- `@PrimaryKey` - Marks primary key
- `@Default(DataType.UUIDV4)` - Auto-generate UUID
- `@AllowNull(false)` - NOT NULL constraint
- `@Column(DataType.TYPE)` - Define column type
- `@ForeignKey(() => Model)` - Foreign key reference
- `@BelongsTo(() => Model)` - Many-to-one relationship
- `@HasMany(() => Model)` - One-to-many relationship

**Common DataTypes:**
- `DataType.UUID` - UUID string
- `DataType.STRING` - VARCHAR(255)
- `DataType.TEXT` - TEXT
- `DataType.INTEGER` - INT
- `DataType.FLOAT` - FLOAT
- `DataType.BOOLEAN` - BOOLEAN
- `DataType.DATE` - DATETIME

---

### 2. Database Connection (`backend/src/db/sequelize.ts`)

```typescript
import { Sequelize } from "sequelize-typescript";
import config from 'config'
import Audience from "../models/Audience";
import Game from "../models/Game";

const sequelize = new Sequelize({
    ...config.get('db'),  // Get config from config/default.json
    dialect: 'mysql',
    models: [Audience, Game],  // ⚠️ Register ALL models here!
    logging: console.log
})

export default sequelize
```

**Important:** Every new model MUST be added to the `models` array!

---

### 3. Configuration (`backend/config/default.json`)

```json
{
    "app": {
        "port": 3000,
        "name": "nature-hiking dev",
        "secret": "MySecret",
        "jwtSecret": "JwtSecret"
    },
    "db": {
        "host": "localhost",
        "port": 3306,
        "username": "root",
        "password": "",
        "database": "nature_hiking"  // ⚠️ Change this for your project!
    }
}
```

---

### 4. Controllers (`backend/src/controllers/`)

```typescript
import { NextFunction, Request, Response } from "express";
import Audience from "../../models/Audience";
import Game from "../../models/Game";
import { Op } from 'sequelize'

// Get games by audience ID (with relationship include)
export async function filterByAudience(
    req: Request<{audienceId: string}>, 
    res: Response, 
    next: NextFunction
) {
    try {
        const { games } = await Audience.findByPk(req.params.audienceId, {
            include: [Game]  // Include related games
        })
        res.json(games)
    } catch (e) {
        next(e)  // Pass error to error middleware
    }
}

// Filter with query parameters and operators
export async function filterByMaxPrice(
    req: Request, 
    res: Response, 
    next: NextFunction
) {
    try {
        const games = await Game.findAll({
            where: {
                price: {
                    [Op.lte]: req.query.maxPrice  // Less than or equal
                }
            },
            include: [Audience]  // Include related audience
        })
        res.json(games)
    } catch (e) {
        next(e)
    }
}

// Create new record
export async function createGame(
    req: Request, 
    res: Response, 
    next: NextFunction
) {
    try {
        const newGame = await Game.create(req.body)
        await newGame.reload({include: Audience})  // Reload with relationships
        res.json(newGame)
    } catch (e) {
        next(e)
    }
}
```

**Common Sequelize Methods:**
- `Model.findAll()` - Get all records
- `Model.findByPk(id)` - Find by primary key
- `Model.findOne({ where: {...} })` - Find one matching record
- `Model.create(data)` - Create new record
- `Model.update(data, { where: {...} })` - Update records
- `Model.destroy({ where: {...} })` - Delete records

**Common Operators (import from 'sequelize'):**
- `[Op.eq]` - Equal (=)
- `[Op.ne]` - Not equal (!=)
- `[Op.gt]` - Greater than (>)
- `[Op.gte]` - Greater than or equal (>=)
- `[Op.lt]` - Less than (<)
- `[Op.lte]` - Less than or equal (<=)
- `[Op.like]` - LIKE
- `[Op.in]` - IN (array)

---

### 5. Validators (`backend/src/controllers/*/validator.ts`)

```typescript
import Joi from "joi";

// Validate URL parameters
export const gamesByAudienceIdValidator = Joi.object({
    audienceId: Joi.string().uuid().required()
})

// Validate request body
export const createGameValidator = Joi.object({
    audienceId: Joi.string().uuid().required(),
    name: Joi.string().min(2).max(255).required(),
    description: Joi.string().min(2).required(),
    price: Joi.number().min(1).required()
})
```

**Common Joi Validations:**
- `.string()` - String type
- `.number()` - Number type
- `.boolean()` - Boolean type
- `.uuid()` - UUID format
- `.email()` - Email format
- `.min(n)` - Minimum value/length
- `.max(n)` - Maximum value/length
- `.required()` - Field is required
- `.optional()` - Field is optional
- `.valid(...values)` - Enum values

---

### 6. Routers (`backend/src/routers/`)

```typescript
import { Router } from "express";
import { 
    createGame, 
    filterByAudience, 
    filterByMaxPrice 
} from "../controllers/games/controller";
import { 
    createGameValidator, 
    gamesByAudienceIdValidator 
} from "../controllers/games/validator";
import paramValidation from "../middlewares/param-validation";
import validation from "../middlewares/validation";

const router = Router()

// GET with param validation
router.get('/by-audience/:audienceId', 
    paramValidation(gamesByAudienceIdValidator), 
    filterByAudience
)

// GET without validation
router.get('/by-max-price', filterByMaxPrice)

// POST with body validation
router.post('/', 
    validation(createGameValidator), 
    createGame
)

export default router
```

**Router Methods:**
- `router.get(path, ...middlewares, handler)` - GET request
- `router.post(path, ...middlewares, handler)` - POST request
- `router.put(path, ...middlewares, handler)` - PUT request
- `router.delete(path, ...middlewares, handler)` - DELETE request

---

### 7. Main App (`backend/src/app.ts`)

```typescript
import express, { json } from 'express'
import logger from './middlewares/error/logger';
import responder from './middlewares/error/responder';
import notFound from './middlewares/not-found';
import config from 'config'
import sequelize from './db/sequelize';
import cors from 'cors'
import audiencesRouter from './routers/audiences'
import gamesRouter from './routers/games'

const app = express()

// Get configuration
const port = config.get<number>('app.port')
const appName = config.get<string>('app.name')

// Enable CORS
app.use(cors())

// Parse JSON body
app.use(json())

// Mount routers (⚠️ Register ALL routers here!)
app.use('/audiences', audiencesRouter)
app.use('/games', gamesRouter)

// 404 handler (must be after all routes)
app.use(notFound)

// Error middlewares (must be at the end)
app.use(logger)
app.use(responder)

// Sync database schema
sequelize.sync({ force: process.argv[2] === 'sync' })

// Start server
app.listen(port, () => console.log(`${appName} started on port ${port}`))
```

**Middleware Order:**
1. CORS
2. Body parsers (json, urlencoded)
3. Custom middlewares
4. Routers
5. 404 handler
6. Error middlewares

---

## 🎨 Frontend Examples

### 1. TypeScript Models (`frontend/src/models/`)

```typescript
// GameDraft.ts - For creating new games
export interface GameDraft {
    name: string
    description: string
    price: number
    audienceId: string
}

// Game.ts - Full game with DB fields
import { GameDraft } from "./GameDraft";

export interface Game extends GameDraft {
    id: string
    createdAt: string
    updatedAt: string
}
```

**Pattern:** 
- `Draft` interface = fields user provides
- Full interface = extends Draft + DB-generated fields

---

### 2. Services (`frontend/src/services/`)

```typescript
import axios from "axios";
import { Game } from "../models/Game";
import { GameDraft } from "../models/GameDraft";

class GamesService {
    // GET with path parameter
    async getByAudienceId(audienceId: string): Promise<Game[]> {
        const { data } = await axios.get<Game[]>(
            `${import.meta.env.VITE_REST_SERVER_URL}/games/by-audience/${audienceId}`
        );
        return data;
    }

    // GET with query parameter
    async getByMaxPrice(maxPrice: number): Promise<Game[]> {
        const { data } = await axios.get<Game[]>(
            `${import.meta.env.VITE_REST_SERVER_URL}/games/by-max-price?maxPrice=${maxPrice}`
        );
        return data;
    }

    // POST
    async create(draft: GameDraft): Promise<Game> {
        const { data } = await axios.post<Game>(
            `${import.meta.env.VITE_REST_SERVER_URL}/games`, 
            draft
        );
        return data;
    }

    // PUT
    async update(id: string, draft: GameDraft): Promise<Game> {
        const { data } = await axios.put<Game>(
            `${import.meta.env.VITE_REST_SERVER_URL}/games/${id}`, 
            draft
        );
        return data;
    }

    // DELETE
    async delete(id: string): Promise<void> {
        await axios.delete(
            `${import.meta.env.VITE_REST_SERVER_URL}/games/${id}`
        );
    }
}

export default new GamesService();
```

**Environment Variable:**
Create `.env` file in frontend root:
```
VITE_REST_SERVER_URL=http://localhost:3000
```

---

### 3. React Component with Data Fetching

```typescript
import { useEffect, useState } from 'react'
import { Game } from '../../../models/Game'
import gamesService from '../../../services/games'
import './List.css'

export default function List() {
    const [games, setGames] = useState<Game[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchGames = async () => {
            try {
                setLoading(true)
                const data = await gamesService.getByMaxPrice(100)
                setGames(data)
            } catch (err) {
                setError('Failed to load games')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        
        fetchGames()
    }, []) // Empty dependency array = run once on mount

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div className='List'>
            {games.map(game => (
                <div key={game.id} className='game-card'>
                    <h3>{game.name}</h3>
                    <p>{game.description}</p>
                    <p>Price: ${game.price}</p>
                </div>
            ))}
        </div>
    )
}
```

---

### 4. React Form Component

```typescript
import { useState } from 'react'
import { GameDraft } from '../../../models/GameDraft'
import gamesService from '../../../services/games'
import './NewGame.css'

interface Props {
    onSuccess?: () => void
}

export default function NewGame({ onSuccess }: Props) {
    const [formData, setFormData] = useState<GameDraft>({
        name: '',
        description: '',
        price: 0,
        audienceId: ''
    })
    const [submitting, setSubmitting] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' ? Number(value) : value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        try {
            setSubmitting(true)
            await gamesService.create(formData)
            alert('Game created successfully!')
            onSuccess?.()
        } catch (err) {
            alert('Failed to create game')
            console.error(err)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <form className='NewGame' onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Game Name"
                required
            />
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                required
            />
            <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                required
            />
            <input
                type="text"
                name="audienceId"
                value={formData.audienceId}
                onChange={handleChange}
                placeholder="Audience ID"
                required
            />
            <button type="submit" disabled={submitting}>
                {submitting ? 'Creating...' : 'Create Game'}
            </button>
        </form>
    )
}
```

---

## 🐳 Docker Examples

### 1. Docker Compose (`docker-compose.yaml`)

```yaml
version: '3.8'

services:
  # Database Service
  database:
    container_name: myapp-db        # ⚠️ Change this!
    environment:
      - MYSQL_ALLOW_EMPTY_PASSWORD=1
      - MYSQL_DATABASE=my_database  # ⚠️ Must match backend config!
      - MYSQL_TCP_PORT=3306
    ports:
      - "3307:3306"                 # ⚠️ Change external port if needed!
    build: ./database
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "127.0.0.1"]
      interval: 1m30s
      timeout: 30s
      retries: 5
      start_period: 30s
  
  # Backend Service
  backend:
    container_name: myapp-backend    # ⚠️ Change this!
    environment:
      - NODE_ENV=compose
    ports:
      - "3010:3000"                  # ⚠️ Change external port if needed!
    build: ./backend
    depends_on:
      database:
        condition: service_healthy   # Wait for DB to be ready
        
  # Frontend Service
  frontend:
    container_name: myapp-frontend   # ⚠️ Change this!
    ports: 
      - "3011:80"                    # ⚠️ Change external port if needed!
    build:
      context: ./frontend
      dockerfile: Dockerfile.compose
```

---

### 2. Backend Dockerfile

```dockerfile
FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

---

### 3. Database Dockerfile

```dockerfile
FROM mysql:9
COPY my_database.sql /docker-entrypoint-initdb.d/
# ⚠️ Change filename to match your SQL export!
```

---

## 📊 SQL Database Example

```sql
-- Database creation
CREATE DATABASE IF NOT EXISTS `toys_r_us`;
USE `toys_r_us`;

-- Table structure
CREATE TABLE `audiences` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB;

-- Insert data
INSERT INTO `audiences` (`id`, `name`, `created_at`, `updated_at`) VALUES
('589de178-0bd2-4798-9684-16750ae3b7dd', 'youth', '2025-10-28 07:57:47', '2025-10-28 07:57:47'),
('bcca07fe-3aef-4227-8b92-2c292212d051', 'kids', '2025-10-28 07:57:29', '2025-10-28 07:57:29');

-- Primary keys
ALTER TABLE `audiences`
  ADD PRIMARY KEY (`id`);

-- Foreign keys
ALTER TABLE `games`
  ADD CONSTRAINT `games_ibfk_1` 
  FOREIGN KEY (`audience_id`) 
  REFERENCES `audiences` (`id`);
```

---

## ⚠️ Common Mistakes to Avoid

1. **Forgetting to register models** in `db/sequelize.ts`
2. **Database name mismatch** between config and docker-compose
3. **Not importing validators** in routers
4. **Wrong middleware order** in app.ts
5. **Missing `await`** in async functions
6. **Forgetting `try-catch`** in controllers
7. **Not calling `next(e)`** in error handling
8. **Port conflicts** in docker-compose
9. **Wrong environment variable** name in Vite (must start with `VITE_`)
10. **Not checking "Add CREATE DATABASE"** when exporting SQL

---

## ✅ Pre-Exam Checklist

### Before You Start
- [ ] Reference project is accessible
- [ ] You understand the data model
- [ ] You know what features to implement
- [ ] Docker Desktop is running

### During Development
- [ ] Test each endpoint in Postman before moving on
- [ ] Check console for errors frequently
- [ ] Run `npm run build` periodically
- [ ] Commit to git after each major milestone

### Before Docker
- [ ] All endpoints work in Postman
- [ ] Frontend can display data
- [ ] `npm run build` succeeds in both backend and frontend
- [ ] Database name matches in all config files
- [ ] Container names are unique

---

**You've got this! 💪 Good luck on Tuesday!**

