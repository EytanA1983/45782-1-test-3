# 📑 אינדקס קבצים - כל התיעוד במקום אחד

## 📖 קבצי תיעוד ראשיים

### 🚀 התחלה מהירה
| קובץ | תיאור | מתי להשתמש |
|------|--------|------------|
| **[README.md](README.md)** | סקירה כללית של הפרויקט | נקודת התחלה |
| **[QUICK-START-HEBREW.md](QUICK-START-HEBREW.md)** | מדריך התחלה מהירה בעברית | כשרוצים להתחיל מהר |
| **[PROJECT-README-HEBREW.md](PROJECT-README-HEBREW.md)** | תיעוד מלא בעברית | הבנה מעמיקה |

### 📚 מדריכי לימוד
| קובץ | תיאור | מתי להשתמש |
|------|--------|------------|
| **[EXAM-PREP-CHECKLIST.md](EXAM-PREP-CHECKLIST.md)** | צ'קליסט צעד-צעד לבחינה | במהלך הבחינה/הכנה |
| **[CODE-EXAMPLES.md](CODE-EXAMPLES.md)** | דוגמאות קוד מעשיות | כשצריך להעתיק קוד |
| **[PROJECT-REFERENCE.md](PROJECT-REFERENCE.md)** | ארכיטקטורה ומבנה | הבנת המערכת |

### 🔧 מדריכי Git
| קובץ | תיאור | מתי להשתמש |
|------|--------|------------|
| **[GIT-WORKFLOW-GUIDE.md](GIT-WORKFLOW-GUIDE.md)** | מדריך Git & GitHub מלא | כשצריך לעבוד עם Git |
| **[GIT-QUICK-VISUAL-GUIDE.md](GIT-QUICK-VISUAL-GUIDE.md)** | מדריך ויזואלי מהיר | תזכורת מהירה |

### 📝 קבצי מעקב
| קובץ | תיאור | מתי להשתמש |
|------|--------|------------|
| **[CHANGES-SUMMARY.md](CHANGES-SUMMARY.md)** | סיכום כל השינויים שנעשו | להבין מה השתנה |
| **[PROJECT-FILES-INDEX.md](PROJECT-FILES-INDEX.md)** | קובץ זה - אינדקס כל הקבצים | מציאת תיעוד |

---

## 🎯 מהיר - איזה קובץ לקרוא?

### 🏃 אני ממהר! רוצה להתחיל עכשיו!
→ **[QUICK-START-HEBREW.md](QUICK-START-HEBREW.md)**

### 📖 רוצה להבין הכל לעומק
→ **[PROJECT-README-HEBREW.md](PROJECT-README-HEBREW.md)**

### 💻 צריך דוגמאות קוד להעתיק
→ **[CODE-EXAMPLES.md](CODE-EXAMPLES.md)**

### ✅ אני בבחינה, מה לעשות?
→ **[EXAM-PREP-CHECKLIST.md](EXAM-PREP-CHECKLIST.md)**

### 🔧 איך עושים commit ו-push?
→ **[GIT-QUICK-VISUAL-GUIDE.md](GIT-QUICK-VISUAL-GUIDE.md)**

### 🤔 איך עושים Pull Request?
→ **[GIT-WORKFLOW-GUIDE.md](GIT-WORKFLOW-GUIDE.md)** (חלק Pull Requests)

### 🏗️ איך המערכת בנויה?
→ **[PROJECT-REFERENCE.md](PROJECT-REFERENCE.md)**

### 🔍 מה השתנה מהפרויקט המקורי?
→ **[CHANGES-SUMMARY.md](CHANGES-SUMMARY.md)**

---

## 📂 מבנה קבצי הפרויקט

### Backend
```
backend/
├── src/
│   ├── models/
│   │   ├── Region.ts              # מודל אזורים
│   │   └── HikingSite.ts          # מודל אתרי טיולים
│   ├── controllers/
│   │   ├── regions/
│   │   │   └── controller.ts      # קונטרולר אזורים
│   │   └── hiking-sites/
│   │       ├── controller.ts      # קונטרולר אתרי טיולים
│   │       └── validator.ts       # ולידציות
│   ├── routers/
│   │   ├── regions.ts             # routes אזורים
│   │   └── hiking-sites.ts        # routes אתרי טיולים
│   ├── middlewares/               # middleware functions
│   ├── db/
│   │   └── sequelize.ts           # חיבור DB
│   └── app.ts                     # נקודת כניסה
├── config/
│   └── default.json               # הגדרות (DB: nature_hiking)
├── nature-hiking.postman_collection.json  # בדיקות API
├── package.json
├── tsconfig.json
└── Dockerfile
```

### Frontend
```
frontend/
├── src/
│   ├── models/
│   │   ├── Region.ts              # ממשק אזור
│   │   ├── HikingSite.ts          # ממשק אתר טיולים
│   │   └── HikingSiteDraft.ts     # ממשק ליצירה
│   ├── services/
│   │   ├── regions.ts             # API calls אזורים
│   │   └── hiking-sites.ts        # API calls אתרי טיולים
│   ├── components/
│   │   ├── hiking-sites/
│   │   │   ├── main/              # עמוד ראשי
│   │   │   ├── list/              # רשימת אתרים
│   │   │   └── add/               # טופס הוספה
│   │   └── layout/                # Header, Footer, Main
│   ├── main.tsx
│   └── index.css
├── package.json
├── vite.config.ts
└── Dockerfile
```

### Database
```
database/
├── nature_hiking.sql              # SQL עם נתונים
└── Dockerfile
```

### Docker
```
docker-compose.yaml                # orchestration
```

---

## 🎓 לפי נושאים

### מודלים ומסד נתונים
- **Backend Models:** `backend/src/models/`
- **Frontend Models:** `frontend/src/models/`
- **SQL:** `database/nature_hiking.sql`
- **תיעוד:** [PROJECT-README-HEBREW.md](PROJECT-README-HEBREW.md#-מבנה-מסד-הנתונים)

### API Endpoints
- **Controllers:** `backend/src/controllers/`
- **Routers:** `backend/src/routers/`
- **Validators:** `backend/src/controllers/hiking-sites/validator.ts`
- **תיעוד:** [PROJECT-README-HEBREW.md](PROJECT-README-HEBREW.md#-api-endpoints)
- **Postman:** `backend/nature-hiking.postman_collection.json`

### קומפוננטות React
- **Main Page:** `frontend/src/components/hiking-sites/main/`
- **List:** `frontend/src/components/hiking-sites/list/`
- **Add Form:** `frontend/src/components/hiking-sites/add/`
- **תיעוד:** [CODE-EXAMPLES.md](CODE-EXAMPLES.md#-frontend-examples)

### Docker
- **Docker Compose:** `docker-compose.yaml`
- **Backend Dockerfile:** `backend/Dockerfile`
- **Frontend Dockerfile:** `frontend/Dockerfile` & `frontend/Dockerfile.compose`
- **Database Dockerfile:** `database/Dockerfile`
- **תיעוד:** [PROJECT-README-HEBREW.md](PROJECT-README-HEBREW.md#-הרצה-עם-docker)

### Git
- **מדריך מלא:** [GIT-WORKFLOW-GUIDE.md](GIT-WORKFLOW-GUIDE.md)
- **מדריך ויזואלי:** [GIT-QUICK-VISUAL-GUIDE.md](GIT-QUICK-VISUAL-GUIDE.md)

---

## 📝 רשימת קריאה מומלצת

### לפני הבחינה
1. קרא **[QUICK-START-HEBREW.md](QUICK-START-HEBREW.md)** - הבנה כללית
2. עבור על **[CODE-EXAMPLES.md](CODE-EXAMPLES.md)** - לימוד הדפוסים
3. תרגל עם **[EXAM-PREP-CHECKLIST.md](EXAM-PREP-CHECKLIST.md)**
4. הבן את **[GIT-QUICK-VISUAL-GUIDE.md](GIT-QUICK-VISUAL-GUIDE.md)**

### במהלך הבחינה
1. פתח **[EXAM-PREP-CHECKLIST.md](EXAM-PREP-CHECKLIST.md)** - עקוב צעד-צעד
2. השתמש ב-**[CODE-EXAMPLES.md](CODE-EXAMPLES.md)** - העתק דוגמאות
3. במקרה חירום: **[PROJECT-README-HEBREW.md](PROJECT-README-HEBREW.md#-פתרון-בעיות)**

### לאחר הבחינה
1. קרא **[CHANGES-SUMMARY.md](CHANGES-SUMMARY.md)** - הבנה מלאה
2. למד **[GIT-WORKFLOW-GUIDE.md](GIT-WORKFLOW-GUIDE.md)** - עבודה מקצועית
3. העמק ב-**[PROJECT-REFERENCE.md](PROJECT-REFERENCE.md)** - הבנה ארכיטקטונית

---

## 🔍 חיפוש מהיר

### איך ל...?

**יצור מודל Sequelize**
→ [CODE-EXAMPLES.md](CODE-EXAMPLES.md#1-sequelize-model-backendmodels) (שורה 15)

**ליצור קונטרולר**
→ [CODE-EXAMPLES.md](CODE-EXAMPLES.md#4-controllers-backendsrccontrollers) (שורה 120)

**ליצור validator עם Joi**
→ [CODE-EXAMPLES.md](CODE-EXAMPLES.md#5-validators-backendsrccontrollersvalidatorts) (שורה 180)

**ליצור router**
→ [CODE-EXAMPLES.md](CODE-EXAMPLES.md#6-routers-backendsrcrouters) (שורה 220)

**ליצור React component עם hooks**
→ [CODE-EXAMPLES.md](CODE-EXAMPLES.md#3-react-component-with-data-fetching) (שורה 320)

**ליצור service עם axios**
→ [CODE-EXAMPLES.md](CODE-EXAMPLES.md#2-services-frontendsrcservices) (שורה 280)

**לעשות commit**
→ [GIT-QUICK-VISUAL-GUIDE.md](GIT-QUICK-VISUAL-GUIDE.md#-תהליך-עבודה-בסיסי) (שורה 30)

**לעשות Pull Request**
→ [GIT-WORKFLOW-GUIDE.md](GIT-WORKFLOW-GUIDE.md#-pull-requests-prs) (שורה 250)

**להריץ Docker**
→ [QUICK-START-HEBREW.md](QUICK-START-HEBREW.md#-הרצה-עם-docker) (שורה 90)

**לפתור merge conflict**
→ [GIT-QUICK-VISUAL-GUIDE.md](GIT-QUICK-VISUAL-GUIDE.md#-merge-conflicts) (שורה 120)

---

## 📊 סטטיסטיקה

### קבצי תיעוד
- **קבצי Markdown:** 9 קבצים
- **סה"כ שורות תיעוד:** ~5,000 שורות
- **שפות:** עברית + אנגלית

### קבצי קוד
- **Backend קבצים:** 13 קבצים
- **Frontend קבצים:** 15 קבצים
- **Database קבצים:** 1 קובץ SQL
- **Docker קבצים:** 4 קבצים

### תוכן
- **API Endpoints:** 4 routes
- **React Components:** 6 components
- **Models:** 4 models (2 backend, 2 frontend)
- **אתרי טיולים לדוגמה:** 12 sites
- **אזורים:** 6 regions

---

## 🎯 טיפים מהירים

### 💡 כשאתה תקוע
1. חפש ב-**[CODE-EXAMPLES.md](CODE-EXAMPLES.md)**
2. בדוק את **[PROJECT-README-HEBREW.md](PROJECT-README-HEBREW.md)** סקשן "פתרון בעיות"
3. השתמש ב-Postman collection: `backend/nature-hiking.postman_collection.json`

### 🚀 כדי להריץ מהר
```bash
# Backend
cd backend && npm install && npm run dev

# Frontend (terminal נוסף)
cd frontend && npm install && npm run dev

# או
docker compose up -d
```

### 📖 כדי ללמוד מהר
1. התחל עם [QUICK-START-HEBREW.md](QUICK-START-HEBREW.md)
2. תרגל עם הקוד
3. חזור ל-[CODE-EXAMPLES.md](CODE-EXAMPLES.md) כשצריך

### 🎓 לבחינה
פתח 3 טאבים:
1. [EXAM-PREP-CHECKLIST.md](EXAM-PREP-CHECKLIST.md)
2. [CODE-EXAMPLES.md](CODE-EXAMPLES.md)
3. [GIT-QUICK-VISUAL-GUIDE.md](GIT-QUICK-VISUAL-GUIDE.md)

---

## 📞 עזרה נוספת

### בעיות טכניות
→ [PROJECT-README-HEBREW.md](PROJECT-README-HEBREW.md#-פתרון-בעיות)

### שאלות Git
→ [GIT-WORKFLOW-GUIDE.md](GIT-WORKFLOW-GUIDE.md#-פתרון-בעיות-נפוצות)

### הבנת הקוד
→ [CODE-EXAMPLES.md](CODE-EXAMPLES.md)

### הבנת הארכיטקטורה
→ [PROJECT-REFERENCE.md](PROJECT-REFERENCE.md)

---

**🌟 בהצלחה! כל התיעוד שאתה צריך כאן! 🚀**

**עדכון אחרון:** נובמבר 2, 2025

