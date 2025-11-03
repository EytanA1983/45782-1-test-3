# 🔧 מדריך Git & GitHub - תהליך עבודה מלא

## 📋 תוכן עניינים
1. [הגדרה ראשונית](#הגדרה-ראשונית)
2. [יצירת Repository חדש](#יצירת-repository-חדש)
3. [תהליך עבודה יומיומי](#תהליך-עבודה-יומיומי)
4. [עבודה עם GitHub](#עבודה-עם-github)
5. [Pull Requests](#pull-requests)
6. [פקודות נפוצות](#פקודות-נפוצות)

---

## 🎯 הגדרה ראשונית (פעם אחת בלבד)

### הגדרת פרטי משתמש
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### בדיקת ההגדרות
```bash
git config --list
```

---

## 🆕 יצירת Repository חדש

### אופציה 1: התחלה מפרויקט מקומי

#### 1. נווט לתיקיית הפרויקט
```bash
cd /path/to/your/project
```

#### 2. אתחל Git repository
```bash
git init
```

#### 3. צור קובץ .gitignore
```bash
# עבור Node.js projects
cat > .gitignore << EOF
node_modules/
dist/
.env
.DS_Store
*.log
coverage/
.vscode/
.idea/
EOF
```

#### 4. הוסף את כל הקבצים
```bash
git add .
```

#### 5. בצע commit ראשון
```bash
git commit -m "Initial commit - project setup"
```

#### 6. צור repository ב-GitHub
1. עבור ל-https://github.com
2. לחץ על **"New repository"** (כפתור ירוק)
3. תן שם ל-repository
4. **אל תסמן** "Initialize with README" (כי יש לך כבר קבצים)
5. לחץ **"Create repository"**

#### 7. חבר את הפרויקט המקומי ל-GitHub
```bash
# החלף USERNAME ו-REPO-NAME בערכים שלך
git remote add origin https://github.com/USERNAME/REPO-NAME.git

# או אם אתה משתמש ב-SSH:
git remote add origin git@github.com:USERNAME/REPO-NAME.git
```

#### 8. דחוף את הקוד ל-GitHub
```bash
git branch -M main
git push -u origin main
```

---

### אופציה 2: Clone מ-GitHub קיים

```bash
# Clone repository
git clone https://github.com/USERNAME/REPO-NAME.git

# נווט לתיקייה
cd REPO-NAME

# עבוד על הפרויקט...
```

---

## 🔄 תהליך עבודה יומיומי

### 1️⃣ בדוק סטטוס
```bash
git status
```
**מה זה מראה:**
- קבצים ששונו (Modified)
- קבצים חדשים (Untracked)
- קבצים מוכנים ל-commit (Staged)

### 2️⃣ הוסף שינויים ל-Staging
```bash
# הוסף קובץ ספציפי
git add filename.js

# הוסף כל הקבצים בתיקייה
git add .

# הוסף רק קבצי JavaScript
git add *.js

# הוסף תיקייה מסוימת
git add src/

# הוסף הכל כולל מחיקות
git add -A
```

### 3️⃣ בצע Commit
```bash
# Commit עם הודעה
git commit -m "Add user authentication feature"

# Commit עם הודעה מפורטת
git commit -m "Add user authentication" -m "- Added login form
- Implemented JWT tokens
- Added password hashing"

# הוסף ועשה commit בפעולה אחת (לקבצים קיימים בלבד)
git commit -am "Quick fix for bug #123"
```

### 4️⃣ דחף שינויים ל-GitHub
```bash
# Push ל-branch הנוכחי
git push

# Push לראשונה (צריך להגדיר upstream)
git push -u origin main

# Push ל-branch מסוים
git push origin feature-branch
```

---

## 🌐 עבודה עם GitHub

### 📥 משיכת שינויים (Pull)
```bash
# משוך שינויים מ-remote
git pull

# משוך מ-branch ספציפי
git pull origin main

# Fetch בלבד (בלי merge)
git fetch
git merge origin/main
```

### 🌿 עבודה עם Branches

#### יצירת Branch חדש
```bash
# צור branch חדש
git branch feature-new-login

# צור והעבור אליו בפעולה אחת
git checkout -b feature-new-login

# או בגרסאות חדשות:
git switch -c feature-new-login
```

#### מעבר בין Branches
```bash
# מעבר ל-branch קיים
git checkout main
# או
git switch main

# רשימת כל ה-branches
git branch
git branch -a  # כולל remote branches
```

#### מחיקת Branch
```bash
# מחק branch מקומי
git branch -d feature-name

# מחק בכוח (אם יש שינויים לא ממוזגים)
git branch -D feature-name

# מחק remote branch
git push origin --delete feature-name
```

---

## 🔀 Pull Requests (PRs)

### תהליך מלא ליצירת Pull Request

#### שלב 1: צור Branch לפיצ'ר החדש
```bash
# ודא שאתה על main ומעודכן
git checkout main
git pull origin main

# צור branch חדש
git checkout -b feature/add-hiking-sites
```

#### שלב 2: עבוד על הפיצ'ר
```bash
# ערוך קבצים...
# הוסף את השינויים
git add .
git commit -m "Add hiking sites feature"
```

#### שלב 3: דחף את ה-Branch ל-GitHub
```bash
git push -u origin feature/add-hiking-sites
```

#### שלב 4: צור Pull Request ב-GitHub
1. עבור ל-repository שלך ב-GitHub
2. GitHub יציע לך אוטומטית: **"Compare & pull request"**
3. לחץ על הכפתור
4. **מלא פרטים:**
   - **Title:** שם תיאורי (לדוגמה: "Add hiking sites management feature")
   - **Description:** הסבר מה שינית:
     ```markdown
     ## What
     Added hiking sites management system
     
     ## Why
     To allow users to view and manage hiking locations
     
     ## Changes
     - Created HikingSite model
     - Added CRUD controllers
     - Implemented UI components
     
     ## Testing
     - Tested CRUD operations
     - Verified UI displays correctly
     ```
5. **Reviewers:** (אופציונלי) בחר אנשים שיבדקו
6. לחץ **"Create pull request"**

#### שלב 5: תהליך Review
- אחרים יכולים להגיב על הקוד
- אתה יכול להוסיף commits נוספים אם נדרש:
  ```bash
  # עשה שינויים...
  git add .
  git commit -m "Address review comments"
  git push  # הם יתוספו אוטומטית ל-PR
  ```

#### שלב 6: Merge ה-Pull Request
לאחר אישור:
1. לחץ **"Merge pull request"** ב-GitHub
2. לחץ **"Confirm merge"**
3. אופציונלי: לחץ **"Delete branch"** למחיקת ה-branch

#### שלב 7: עדכן את ה-Branch המקומי
```bash
# חזור ל-main
git checkout main

# משוך את השינויים החדשים
git pull origin main

# מחק את ה-branch המקומי
git branch -d feature/add-hiking-sites
```

---

## 🔥 תרחישים נפוצים

### ❌ ביטול שינויים

#### ביטול שינויים לפני Staging
```bash
# בטל שינויים בקובץ אחד
git checkout -- filename.js

# בטל כל השינויים
git checkout -- .
```

#### ביטול אחרי Staging (אבל לפני Commit)
```bash
# הסר מ-staging אבל שמור שינויים
git reset HEAD filename.js

# הסר הכל מ-staging
git reset HEAD
```

#### ביטול Commit אחרון (שמור שינויים)
```bash
git reset --soft HEAD~1
```

#### ביטול Commit אחרון (מחק שינויים)
```bash
git reset --hard HEAD~1
```

#### חזור ל-Commit מסוים
```bash
# מצא את ה-commit hash
git log --oneline

# חזור אליו
git reset --hard abc1234
```

---

### 🔄 עדכון Fork (אם עשית Fork לפרויקט)

```bash
# הוסף את המקור כ-upstream (פעם אחת)
git remote add upstream https://github.com/ORIGINAL-OWNER/REPO-NAME.git

# משוך עדכונים
git fetch upstream

# מזג אותם ל-main שלך
git checkout main
git merge upstream/main

# דחף אותם ל-fork שלך
git push origin main
```

---

## 📊 פקודות שימושיות

### צפייה בהיסטוריה
```bash
# היסטוריה מלאה
git log

# היסטוריה מקוצרת
git log --oneline

# עם גרף
git log --graph --oneline --all

# 5 commits אחרונים
git log -5

# שינויים בקובץ מסוים
git log -- filename.js
```

### השוואת שינויים
```bash
# הבדלים לא-staged
git diff

# הבדלים staged
git diff --staged

# הבדלים בין branches
git diff main feature-branch

# הבדלים בקובץ מסוים
git diff filename.js
```

### מידע על Remote
```bash
# רשימת remotes
git remote -v

# מידע מפורט
git remote show origin

# שינוי URL של remote
git remote set-url origin https://github.com/NEW-URL.git
```

---

## 🎯 .gitignore - דוגמאות

### Node.js Project
```gitignore
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build outputs
dist/
build/
.next/
out/

# Environment
.env
.env.local
.env*.local

# IDEs
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Testing
coverage/
.nyc_output/

# Logs
logs/
*.log
```

### Python Project
```gitignore
# Byte-compiled
__pycache__/
*.py[cod]
*$py.class

# Virtual environments
venv/
env/
ENV/

# Distribution
dist/
build/
*.egg-info/

# IDEs
.vscode/
.idea/

# Environment
.env
```

---

## 💡 טיפים וטריקים

### 1. Aliases שימושיים
```bash
# הוסף ל-~/.gitconfig או הרץ:
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual 'log --graph --oneline --all'

# עכשיו אתה יכול להשתמש:
git st        # במקום git status
git co main   # במקום git checkout main
```

### 2. שמירת פרטי כניסה
```bash
# שמור סיסמה ל-15 דקות
git config --global credential.helper cache

# שמור סיסמה לנצח (Windows)
git config --global credential.helper wincred

# שמור סיסמה לנצח (Mac)
git config --global credential.helper osxkeychain

# שמור סיסמה לנצח (Linux)
git config --global credential.helper store
```

### 3. Git Stash (שמירה זמנית)
```bash
# שמור שינויים זמנית
git stash

# שמור עם הודעה
git stash save "Work in progress on feature X"

# רשימת stashes
git stash list

# החזר את האחרון
git stash pop

# החזר ללא מחיקה
git stash apply

# מחק stash
git stash drop

# החזר stash מסוים
git stash apply stash@{2}
```

---

## 🚨 פתרון בעיות נפוצות

### בעיה: "fatal: not a git repository"
**פתרון:**
```bash
git init
```

### בעיה: "Your branch is behind"
**פתרון:**
```bash
git pull
```

### בעיה: Merge conflict
**פתרון:**
1. פתח את הקבצים עם conflicts
2. חפש את הסימונים:
   ```
   <<<<<<< HEAD
   Your changes
   =======
   Their changes
   >>>>>>> branch-name
   ```
3. ערוך ידנית
4. שמור
5. הוסף ועשה commit:
   ```bash
   git add .
   git commit -m "Resolve merge conflict"
   ```

### בעיה: Push נדחה (rejected)
**פתרון:**
```bash
# משוך שינויים קודם
git pull --rebase
git push
```

### בעיה: רוצה למחוק commit שכבר נדחף
**⚠️ זהירות! ישפיע על אחרים**
```bash
# אופציה 1: Revert (מומלץ - יוצר commit חדש)
git revert HEAD
git push

# אופציה 2: Reset + Force push (מסוכן!)
git reset --hard HEAD~1
git push --force
```

---

## 📚 תזרים עבודה מומלץ (Git Flow)

### Branches עיקריים
- **`main`** - קוד יציב ומוכן לפרודקשן
- **`develop`** - קוד בפיתוח

### Branches זמניים
- **`feature/*`** - פיצ'רים חדשים
- **`bugfix/*`** - תיקוני באגים
- **`hotfix/*`** - תיקונים דחופים לפרודקשן

### דוגמה לתזרים
```bash
# התחל פיצ'ר חדש
git checkout develop
git pull
git checkout -b feature/user-profile

# עבוד... commit... commit...

# סיימת - צור PR מ-feature/user-profile אל develop

# לאחר merge, עדכן
git checkout develop
git pull
git branch -d feature/user-profile
```

---

## 🎓 לסיכום - תזרים מהיר

```bash
# 1. אתחול פרויקט
git init
git add .
git commit -m "Initial commit"

# 2. חיבור ל-GitHub
git remote add origin https://github.com/USER/REPO.git
git push -u origin main

# 3. עבודה יומיומית
git status                          # בדוק מה השתנה
git add .                          # הוסף שינויים
git commit -m "Description"        # commit
git push                           # דחוף ל-GitHub

# 4. Pull Request
git checkout -b feature-name       # צור branch
# ... עבוד ...
git push -u origin feature-name    # דחוף
# צור PR ב-GitHub UI
```

---

## 🔗 קישורים שימושיים

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Oh My Git! Game](https://ohmygit.org/) - למד Git דרך משחק

---

**בהצלחה! 🚀**

