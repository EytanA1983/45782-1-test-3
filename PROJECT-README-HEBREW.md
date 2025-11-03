# 🌳 מערכת ניהול אתרי טיולים - החברה להגנת הטבע

## תיאור הפרויקט

מערכת ניהול אתרי טיולים המאפשרת צפייה, הוספה ומחיקה של אתרי טיולים בארץ, מחולקים לפי אזורים גיאוגרפיים.

### תכונות המערכת
- ✅ צפייה ברשימת אזורים בארץ
- ✅ סינון אתרי טיולים לפי אזור
- ✅ הוספת אתר טיולים חדש
- ✅ מחיקת אתר טיולים קיים
- ✅ הצגת מידע מפורט על כל אתר (שם, תיאור, מחירים)

---

## 🏗️ ארכיטקטורת המערכת

### Backend
- **טכנולוגיות:** Node.js + Express + TypeScript
- **ORM:** Sequelize TypeScript
- **מסד נתונים:** MySQL
- **פורט:** 3000

### Frontend
- **טכנולוגיות:** React + TypeScript + Vite
- **ניהול מצב:** React Hooks
- **תקשורת:** Axios
- **פורט:** 5173

### Database
- **טכנולוגיות:** MySQL
- **טבלאות:**
  - `regions` - אזורים בארץ
  - `hiking_sites` - אתרי טיולים

---

## 📋 מבנה מסד הנתונים

### טבלת `regions`
| שדה | סוג | תיאור |
|-----|-----|-------|
| id | INTEGER | מזהה ייחודי (מפתח ראשי) |
| name | VARCHAR(255) | שם האזור |
| created_at | DATETIME | תאריך יצירה |
| updated_at | DATETIME | תאריך עדכון |

### טבלת `hiking_sites`
| שדה | סוג | תיאור |
|-----|-----|-------|
| id | INTEGER | מזהה ייחודי (מפתח ראשי) |
| region_id | INTEGER | מזהה אזור (מפתח זר) |
| name | VARCHAR(255) | שם האתר |
| description | TEXT | תיאור מפורט |
| adult_price | DECIMAL(10,2) | מחיר כניסה למבוגר |
| child_price | DECIMAL(10,2) | מחיר כניסה לילד |
| created_at | DATETIME | תאריך יצירה |
| updated_at | DATETIME | תאריך עדכון |

**הערה:** מחיר 0 משמעו כניסה חופשית

---

## 🚀 הוראות הפעלה

### דרישות מקדימות
- Node.js (גרסה 18 ומעלה)
- MySQL
- npm או yarn

### התקנה ראשונית

#### 1. התקנת Backend
```bash
cd backend
npm install
```

#### 2. הגדרת מסד הנתונים
1. צור מסד נתונים חדש בשם `nature_hiking`
2. ייבא את הקובץ `database/nature_hiking.sql`

```sql
mysql -u root -p < database/nature_hiking.sql
```

#### 3. התקנת Frontend
```bash
cd frontend
npm install
```

#### 4. הגדרת משתני סביבה
צור קובץ `.env` בתיקיית `frontend` עם התוכן הבא:
```
VITE_REST_SERVER_URL=http://localhost:3000
```

---

## 🏃 הרצת האפליקציה

### מצב פיתוח (Development)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
השרת יופעל על `http://localhost:3000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
הממשק יופעל על `http://localhost:5173`

---

## 🐳 הרצה עם Docker

### הפעלת המערכת
```bash
docker compose up -d
```

### גישה לשירותים
- **Frontend:** http://localhost:3012
- **Backend:** http://localhost:3020
- **Database:** localhost:3309

### עצירת המערכת
```bash
docker compose down
```

---

## 📡 API Endpoints

### Regions (אזורים)

#### קבלת כל האזורים
```http
GET /regions
```

**תגובה לדוגמה:**
```json
[
  {
    "id": 1,
    "name": "צפון",
    "createdAt": "2025-11-01T10:00:00.000Z",
    "updatedAt": "2025-11-01T10:00:00.000Z"
  }
]
```

---

### Hiking Sites (אתרי טיולים)

#### קבלת אתרים לפי אזור
```http
GET /hiking-sites/by-region/:regionId
```

**פרמטרים:**
- `regionId` (number) - מזהה האזור

**תגובה לדוגמה:**
```json
[
  {
    "id": 1,
    "regionId": 1,
    "name": "נחל תנינים",
    "description": "שמורת טבע יפהפייה עם מעיינות מים צלולים...",
    "adultPrice": 28.00,
    "childPrice": 14.00,
    "createdAt": "2025-11-01T10:00:00.000Z",
    "updatedAt": "2025-11-01T10:00:00.000Z",
    "region": {
      "id": 1,
      "name": "צפון"
    }
  }
]
```

#### יצירת אתר חדש
```http
POST /hiking-sites
Content-Type: application/json
```

**גוף הבקשה:**
```json
{
  "regionId": 1,
  "name": "גן לאומי חרובים",
  "description": "יער חרובים עתיק עם מסלולי הליכה מקסימים",
  "adultPrice": 28.00,
  "childPrice": 14.00
}
```

**ולידציה:**
- `regionId` - חובה, מספר שלם חיובי
- `name` - חובה, 2-255 תווים
- `description` - חובה, מינימום 10 תווים
- `adultPrice` - חובה, מספר ≥ 0
- `childPrice` - חובה, מספר ≥ 0

#### מחיקת אתר
```http
DELETE /hiking-sites/:id
```

**פרמטרים:**
- `id` (number) - מזהה האתר למחיקה

**תגובה:**
- `204 No Content` - המחיקה הצליחה
- `404 Not Found` - האתר לא נמצא

---

## 🧪 בדיקה עם Postman

1. ייבא את הקובץ `backend/nature-hiking.postman_collection.json` ל-Postman
2. הקולקשן כולל את כל ה-endpoints עם דוגמאות
3. ודא שהשרת רץ לפני הבדיקה

---

## 📁 מבנה הקבצים

```
.
├── backend/
│   ├── config/                      # קבצי הגדרות
│   │   └── default.json            # הגדרות ברירת מחדל
│   ├── src/
│   │   ├── app.ts                  # נקודת כניסה ראשית
│   │   ├── db/
│   │   │   └── sequelize.ts        # חיבור למסד נתונים
│   │   ├── models/
│   │   │   ├── Region.ts           # מודל אזור
│   │   │   └── HikingSite.ts       # מודל אתר טיולים
│   │   ├── controllers/
│   │   │   ├── regions/
│   │   │   │   └── controller.ts   # לוגיקה לאזורים
│   │   │   └── hiking-sites/
│   │   │       ├── controller.ts   # לוגיקה לאתרים
│   │   │       └── validator.ts    # ולידציות
│   │   ├── routers/
│   │   │   ├── regions.ts          # נתיבים לאזורים
│   │   │   └── hiking-sites.ts     # נתיבים לאתרים
│   │   └── middlewares/            # middleware functions
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── hiking-sites/
│   │   │   │   ├── main/           # עמוד ראשי
│   │   │   │   ├── list/           # רשימת אתרים
│   │   │   │   └── add/            # טופס הוספה
│   │   │   └── layout/             # מבנה עמוד
│   │   ├── models/                 # ממשקי TypeScript
│   │   │   ├── Region.ts
│   │   │   ├── HikingSite.ts
│   │   │   └── HikingSiteDraft.ts
│   │   └── services/               # קריאות API
│   │       ├── regions.ts
│   │       └── hiking-sites.ts
│   ├── Dockerfile
│   ├── Dockerfile.compose
│   └── package.json
│
├── database/
│   ├── Dockerfile
│   └── nature_hiking.sql           # סקריפט יצירת DB
│
├── docker-compose.yaml
└── PROJECT-README-HEBREW.md
```

---

## 🎨 ממשק המשתמש

### עמוד ראשי
1. **בחירת אזור** - תיבת בחירה (Select) המציגה את כל האזורים
2. **כפתור הוספה** - מאפשר הוספת אתר חדש
3. **רשימת אתרים** - כרטיסים (Cards) המציגים:
   - שם האתר
   - תיאור מפורט
   - מחיר למבוגר
   - מחיר לילד
   - כפתור מחיקה

### טופס הוספת אתר
- בחירת אזור
- שם האתר
- תיאור
- מחיר למבוגר
- מחיר לילד
- כפתורי שמירה וביטול

---

## 🛠️ טיפים לפיתוח

### הוספת אזור חדש
1. הוסף רשומה ל-`regions` במסד הנתונים
2. הטבלה תתעדכן אוטומטית בממשק

### שינוי פורטים
- Backend: `backend/config/default.json` → `app.port`
- Frontend Dev: `frontend/vite.config.ts` → `server.port`
- Docker: `docker-compose.yaml` → `ports`

### הוספת שדה חדש
1. עדכן את המודל ב-`backend/src/models/`
2. עדכן את הממשק ב-`frontend/src/models/`
3. עדכן את הולידציה ב-`validator.ts`
4. עדכן את הטופס והרשימה בקומפוננטות

---

## 🐛 פתרון בעיות

### Backend לא עולה
- ✅ ודא ש-MySQL רץ
- ✅ בדוק את פרטי החיבור ב-`config/default.json`
- ✅ וודא שהמודלים רשומים ב-`db/sequelize.ts`

### Frontend לא מתחבר ל-Backend
- ✅ ודא ש-Backend רץ על פורט 3000
- ✅ בדוק את `VITE_REST_SERVER_URL` ב-`.env`
- ✅ בדוק את קונסול הדפדפן לשגיאות

### Docker לא עולה
- ✅ ודא ש-Docker Desktop רץ
- ✅ בדוק קונפליקטים בפורטים: `docker ps`
- ✅ בדוק לוגים: `docker compose logs -f`

### שגיאות במסד נתונים
- ✅ ודא שהטבלאות נוצרו
- ✅ בדוק את שם ה-DB ב-`default.json` ו-`docker-compose.yaml`
- ✅ נסה לרוקן cache: `docker compose down -v`

---

## 📚 משאבים נוספים

### תיעוד טכנולוגיות
- [Express.js](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)

### קבצי עזר במאגר
- `EXAM-PREP-CHECKLIST.md` - צ'קליסט מפורט להכנה לבחינה
- `CODE-EXAMPLES.md` - דוגמאות קוד לכל חלקי המערכת
- `PROJECT-REFERENCE.md` - תיעוד מפורט של הארכיטקטורה

---

## ✅ רשימת בדיקה לפני הגשה

### Backend
- [ ] כל המודלים מוגדרים נכון
- [ ] כל הקונטרולרים עובדים
- [ ] הולידציות פועלות
- [ ] כל ה-routes רשומים ב-`app.ts`
- [ ] `npm run build` עובר בהצלחה

### Frontend
- [ ] כל הקומפוננטות מוצגות נכון
- [ ] בחירת אזור מציגה את האתרים הנכונים
- [ ] הוספת אתר עובדת
- [ ] מחיקת אתר עובדת
- [ ] `npm run build` עובר בהצלחה

### Docker
- [ ] שמות קונטיינרים ייחודיים
- [ ] שם מסד נתונים תואם בכל מקום
- [ ] כל 3 הקונטיינרים עולים
- [ ] האפליקציה נגישה דרך הדפדפן

---

## 👨‍💻 מחבר

פרויקט זה נוצר כחלק מקורס פיתוח Full-Stack.

**בהצלחה בבחינה! 🚀**

