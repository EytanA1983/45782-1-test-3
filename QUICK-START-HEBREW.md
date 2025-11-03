# 🚀 התחלה מהירה - אתרי טיולים

## 📁 מבנה הפרויקט

```
.
├── backend/                              # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── models/
│   │   │   ├── Region.ts                # ✅ מודל אזורים
│   │   │   └── HikingSite.ts            # ✅ מודל אתרי טיולים
│   │   ├── controllers/
│   │   │   ├── regions/controller.ts     # ✅ קונטרולר אזורים
│   │   │   └── hiking-sites/
│   │   │       ├── controller.ts         # ✅ קונטרולר אתרי טיולים
│   │   │       └── validator.ts          # ✅ ולידציות
│   │   ├── routers/
│   │   │   ├── regions.ts               # ✅ routes אזורים
│   │   │   └── hiking-sites.ts          # ✅ routes אתרי טיולים
│   │   ├── app.ts                       # ✅ עודכן עם routes חדשים
│   │   └── db/sequelize.ts              # ✅ עודכן עם models חדשים
│   ├── config/default.json              # ✅ DB: nature_hiking
│   └── nature-hiking.postman_collection.json  # ✅ אוסף Postman
│
├── frontend/                             # React + TypeScript + Vite
│   └── src/
│       ├── models/
│       │   ├── Region.ts                # ✅ ממשק אזור
│       │   ├── HikingSite.ts            # ✅ ממשק אתר טיולים
│       │   └── HikingSiteDraft.ts       # ✅ ממשק ליצירה
│       ├── services/
│       │   ├── regions.ts               # ✅ API calls לאזורים
│       │   └── hiking-sites.ts          # ✅ API calls לאתרים
│       └── components/
│           ├── hiking-sites/
│           │   ├── main/                # ✅ עמוד ראשי
│           │   ├── list/                # ✅ רשימת אתרים (Cards)
│           │   └── add/                 # ✅ טופס הוספה
│           └── layout/
│               ├── header/              # ✅ עודכן
│               ├── footer/              # ✅ עודכן
│               └── main/Main.tsx        # ✅ routing עודכן
│
├── database/
│   ├── nature_hiking.sql                # ✅ SQL עם נתונים
│   └── Dockerfile                       # ✅ עודכן
│
└── docker-compose.yaml                   # ✅ עודכן - nature_hiking
```

---

## 🎯 4 ה-Routes שנדרשו

### 1️⃣ החזרת רשימת האזורים
```http
GET /regions
```

### 2️⃣ החזרת אתרי טיולים לפי אזור
```http
GET /hiking-sites/by-region/:regionId
```

### 3️⃣ הוספת אתר טיולים חדש
```http
POST /hiking-sites
Content-Type: application/json

{
  "regionId": 1,
  "name": "שם האתר",
  "description": "תיאור...",
  "adultPrice": 28.00,
  "childPrice": 14.00
}
```

### 4️⃣ מחיקת אתר טיולים
```http
DELETE /hiking-sites/:id
```

---

## 🗄️ מבנה מסד הנתונים

### טבלת `regions`
```sql
id          INT (PK, AUTO_INCREMENT)
name        VARCHAR(255)
created_at  DATETIME
updated_at  DATETIME
```

**נתונים:** 6 אזורים - צפון, דרום, מרכז, שפלה, מישור החוף, ירושלים

### טבלת `hiking_sites`
```sql
id           INT (PK, AUTO_INCREMENT)
region_id    INT (FK → regions.id)
name         VARCHAR(255)
description  TEXT
adult_price  DECIMAL(10,2)
child_price  DECIMAL(10,2)
created_at   DATETIME
updated_at   DATETIME
```

**נתונים:** 12 אתרי טיולים לדוגמה (נחל תנינים, מערת הנטיפים, בניאס...)

---

## 💻 הרצה מהירה

### שלב 1: יצירת מסד הנתונים
```bash
mysql -u root -p < database/nature_hiking.sql
```

### שלב 2: התקנה והרצת Backend
```bash
cd backend
npm install
npm run dev
```
✅ Server: http://localhost:3000

### שלב 3: התקנה והרצת Frontend
```bash
cd frontend
npm install
npm run dev
```
✅ UI: http://localhost:5173

**או עם Docker:**
```bash
docker compose up -d
```
✅ UI: http://localhost:3012

---

## 🎨 ממשק המשתמש

### מסך ראשי כולל:
1. **Select Box** - בחירת אזור מהרשימה
2. **כפתור הוספה** - פותח טופס להוספת אתר חדש
3. **רשימת Cards** - כל אתר מוצג בכרטיס עם:
   - שם האתר (כותרת)
   - תיאור מפורט
   - מחיר למבוגר (או "חינם")
   - מחיר לילד (או "חינם")
   - כפתור מחיקה 🗑️

### טופס הוספה כולל:
- בחירת אזור (dropdown)
- שם האתר
- תיאור (textarea)
- מחיר למבוגר
- מחיר לילד
- כפתורי שמירה וביטול

---

## ✅ בדיקת תקינות

### Backend
```bash
cd backend
npm run build  # צריך לעבור בלי שגיאות
```

### Frontend
```bash
cd frontend
npm run build  # צריך לעבור בלי שגיאות
```

### API Testing
1. ייבא את `backend/nature-hiking.postman_collection.json` ל-Postman
2. הרץ את כל ה-requests
3. ודא שהכל עובד

---

## 📊 נתונים לדוגמה במערכת

### אזורים (6)
1. צפון
2. דרום
3. מרכז
4. שפלה
5. מישור החוף
6. ירושלים והסביבה

### אתרי טיולים (12)
**צפון:**
- נחל תנינים (₪28/₪14)
- מערת הנטיפים (₪62/₪31)
- גן לאומי בניאס (₪29/₪15)
- גן לאומי כורזים (₪22/₪11)

**דרום:**
- מכתש רמון (חינם)
- עין גדי (₪29/₪15)
- חוף קורל (חינם)

**מרכז:**
- יער בן שמן (חינם)

**שפלה:**
- תל גזר (₪14/₪7)

**מישור החוף:**
- חוף פלמחים (חינם)

**ירושלים והסביבה:**
- עין חמד (₪22/₪11)
- מצפה הר גילה (חינם)

---

## 🔍 קבצים חשובים

### Backend
- ✅ `backend/src/models/Region.ts` - מודל אזור
- ✅ `backend/src/models/HikingSite.ts` - מודל אתר טיולים
- ✅ `backend/src/controllers/hiking-sites/controller.ts` - 3 פונקציות
- ✅ `backend/src/controllers/hiking-sites/validator.ts` - ולידציות
- ✅ `backend/src/app.ts` - רישום routes
- ✅ `backend/config/default.json` - הגדרות DB

### Frontend
- ✅ `frontend/src/components/hiking-sites/main/HikingSitesMain.tsx` - קומפוננטה ראשית
- ✅ `frontend/src/components/hiking-sites/list/HikingSitesList.tsx` - רשימת Cards
- ✅ `frontend/src/components/hiking-sites/add/AddHikingSite.tsx` - טופס הוספה
- ✅ `frontend/src/services/hiking-sites.ts` - API calls

### Database
- ✅ `database/nature_hiking.sql` - סקריפט יצירת DB

### Docker
- ✅ `docker-compose.yaml` - הגדרות containers

---

## 🆘 בעיות נפוצות

### ❌ Backend לא עולה
**פתרון:**
- ודא ש-MySQL רץ
- בדוק שם DB בקובץ `config/default.json` → `nature_hiking`
- בדוק שהמודלים רשומים ב-`db/sequelize.ts`

### ❌ Frontend לא מציג נתונים
**פתרון:**
- ודא ש-Backend רץ על פורט 3000
- צור קובץ `.env` בתיקיית frontend עם:
  ```
  VITE_REST_SERVER_URL=http://localhost:3000
  ```
- בדוק Console בדפדפן לשגיאות

### ❌ Docker לא עולה
**פתרון:**
- ודא ש-Docker Desktop רץ
- בדוק conflicts: `docker ps`
- עצור containers ישנים: `docker compose down`
- הרץ מחדש: `docker compose up -d`

---

## 📚 תיעוד נוסף

- **[PROJECT-README-HEBREW.md](PROJECT-README-HEBREW.md)** - תיעוד מלא בעברית
- **[EXAM-PREP-CHECKLIST.md](EXAM-PREP-CHECKLIST.md)** - צ'קליסט לבחינה
- **[CODE-EXAMPLES.md](CODE-EXAMPLES.md)** - דוגמאות קוד

---

**בהצלחה! 🌳🚀**

