# 🚀 Getting Started with Task Manager Portal

## Welcome! 👋

This guide will help you get your Task Manager Portal up and running in minutes.

---

## 📋 Prerequisites Checklist

Before starting, ensure you have:

- ✅ **Node.js** 22.19.0 or higher
- ✅ **npm** 11.6.0 or higher  
- ✅ **Angular CLI** 20.3.2
- ✅ **Backend API** running on http://localhost:8000

Check your versions:
```bash
node --version    # Should show v22.19.0 or higher
npm --version     # Should show 11.6.0 or higher
ng version        # Should show 20.3.2
```

---

## 🎯 Step-by-Step Setup

### Step 1: Navigate to Project Directory
```bash
cd task-manager-portal
```

### Step 2: Install Dependencies
```bash
npm install
```
_This will install all required Angular and TypeScript packages (takes 1-2 minutes)_

### Step 3: Verify Backend is Running
Open your browser and check:
- http://localhost:8000/docs (Should show Swagger UI)
- http://localhost:8000/api/v1/tasks (Should return JSON)

If backend is not running, start it first!

### Step 4: Start the Application
```bash
npm start
```

You should see:
```
** Angular Live Development Server is listening on localhost:4200 **
✔ Browser application bundle generation complete.
```

### Step 5: Open in Browser
Navigate to: **http://localhost:4200**

---

## 🎨 First Look - What You'll See

### 1. Dashboard (Home Page)
When you first open the app, you'll land on the dashboard showing:

```
┌────────────────────────────────────────────────────────┐
│  📋 Task Manager Dashboard                             │
│  Welcome to your task management portal                │
├────────────────────────────────────────────────────────┤
│  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐         │
│  │ 📊  │  │ ✅  │  │ ⏳  │  │ 🔥  │  │ 👥  │         │
│  │  6  │  │  2  │  │  4  │  │  3  │  │  3  │         │
│  │Tasks│  │Done │  │Pend.│  │High │  │Users│         │
│  └─────┘  └─────┘  └─────┘  └─────┘  └─────┘         │
├────────────────────────────────────────────────────────┤
│  Quick Actions:                                        │
│  [➕ Create Task] [📝 View Tasks] [👤 Manage Users]   │
├────────────────────────────────────────────────────────┤
│  Recent Tasks:                                         │
│  ○ Complete project documentation [HIGH] 📅 Oct 10    │
│  ✓ Review code changes [MEDIUM] 📅 Oct 2              │
│  ○ Setup development environment [HIGH] 📅 Oct 5      │
└────────────────────────────────────────────────────────┘
```

### 2. Navigation Bar
At the top, you'll see:
```
┌────────────────────────────────────────────────────────┐
│ 📋 Task Manager    [📊 Dashboard][📝 Tasks][👥 Users] │
└────────────────────────────────────────────────────────┘
```

---

## 🎮 Try These Features

### A. View All Tasks
1. Click **"📝 Tasks"** in navigation
2. See all tasks in a card layout
3. Try the filters:
   - Search: Type "project"
   - Status: Select "Pending"
   - Priority: Select "High"

### B. Create a New Task
1. Click **"➕ Create Task"** button
2. Fill in the form:
   - **Title**: "My First Task"
   - **Description**: "This is a test task"
   - **Priority**: Select "High"
   - **Assign To**: Choose a user
   - **Due Date**: Pick tomorrow
3. Click **"➕ Create Task"**
4. You'll be redirected to task list

### C. Edit a Task
1. On task list, click **"✏️"** icon on any task
2. Modify the details
3. Click **"💾 Update Task"**

### D. Complete a Task
1. On task list, click the **checkbox** next to a task
2. Watch it get marked as complete!

### E. Filter and Search
1. Go to Tasks page
2. Use the search box to find tasks
3. Change status filter to "Completed"
4. Change priority filter to see specific priorities

### F. View Users
1. Click **"👥 Users"** in navigation
2. See all users with their details
3. Notice admin badges on admin users

---

## 📱 Mobile View

To see the responsive design:

1. **Open Chrome DevTools**: Press `F12`
2. **Toggle Device Toolbar**: Press `Ctrl+Shift+M` (or Cmd+Shift+M on Mac)
3. **Select a device**: iPhone, iPad, etc.
4. **Explore**: Navigation adapts, cards stack beautifully!

---

## 🎯 Quick Reference

### Available Commands
```bash
npm start          # Start dev server (port 4200)
npm run build      # Build for production
npm run watch      # Build and watch for changes
npm test           # Run unit tests
ng serve -o        # Start and open browser
ng build --prod    # Production build
```

### Key Routes
```
http://localhost:4200/dashboard          # Home
http://localhost:4200/tasks              # All tasks
http://localhost:4200/tasks/new          # Create task
http://localhost:4200/tasks/edit/1       # Edit task 1
http://localhost:4200/users              # View users
```

### API Endpoints (Backend)
```
http://localhost:8000/docs               # Swagger UI
http://localhost:8000/redoc              # ReDoc
http://localhost:8000/api/v1/tasks       # Tasks API
http://localhost:8000/api/v1/users       # Users API
```

---

## 🐛 Troubleshooting

### Problem: Port 4200 already in use
**Solution:**
```bash
# Kill the process using port 4200
# Windows:
netstat -ano | findstr :4200
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:4200 | xargs kill -9

# Or use a different port:
ng serve --port 4300
```

### Problem: Can't fetch tasks/users
**Solutions:**
1. Check backend is running: http://localhost:8000/docs
2. Check browser console for errors (F12)
3. Verify API base URL in `src/app/services/api.config.ts`

### Problem: Module not found errors
**Solution:**
```bash
# Delete and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Problem: Changes not showing
**Solution:**
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Clear cache and reload
- Stop and restart `npm start`

---

## 💡 Pro Tips

1. **Keep Backend Running**: Always start backend before frontend
2. **Use Browser DevTools**: Check Network tab to see API calls
3. **Watch Mode**: `npm start` auto-reloads on code changes
4. **Multiple Browsers**: Test in Chrome, Firefox, Edge
5. **Responsive Testing**: Use DevTools device toolbar

---

## 📚 Learn More

- **README.md** - Comprehensive project documentation
- **FEATURES.md** - Detailed feature breakdown  
- **API_DOCUMENTATION.md** - Backend API reference
- **Angular Docs** - https://angular.dev

---

## 🎉 You're Ready!

You now have a fully functional task manager portal running! 

### Next Steps:
1. ✅ Explore the dashboard
2. ✅ Create your first task
3. ✅ Try filtering and searching
4. ✅ Check the mobile view
5. ✅ Review the code structure

**Happy task managing!** 🚀

---

## 🤝 Need Help?

- Check the documentation files in the project root
- Review the API documentation
- Examine the code - it's well-commented!

**Built with ❤️ using Angular 20**

