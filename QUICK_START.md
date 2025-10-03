# 🚀 Quick Start Guide

## Starting the Application

### 1. Install Dependencies (if not already done)
```bash
cd task-manager-portal
npm install
```

### 2. Start the Development Server
```bash
npm start
```

The application will be available at: **http://localhost:4200**

### 3. Ensure Backend API is Running
Make sure the FastAPI backend is running on **http://localhost:8000**

## First Time Setup

1. **Navigate to the Dashboard** (http://localhost:4200/dashboard)
   - View task statistics and overview

2. **Explore Tasks** (http://localhost:4200/tasks)
   - See all tasks
   - Filter by status and priority
   - Search tasks

3. **Create a New Task** (http://localhost:4200/tasks/new)
   - Fill in task details
   - Assign to a user
   - Set priority and due date

4. **View Users** (http://localhost:4200/users)
   - See all registered users

## Available Scripts

- `npm start` - Start development server (http://localhost:4200)
- `npm run build` - Build for production
- `npm run watch` - Build and watch for changes
- `npm test` - Run unit tests

## Key Features to Try

### Dashboard
- ✅ View task statistics cards
- ✅ Quick action buttons
- ✅ Recent tasks preview

### Task Management
- ✅ Create new tasks
- ✅ Edit existing tasks
- ✅ Mark tasks as complete
- ✅ Delete tasks
- ✅ Filter by status (All/Pending/Completed)
- ✅ Filter by priority (Low/Medium/High)
- ✅ Search by title or description

### Task Features
- 📅 Due date tracking
- 🔥 Priority levels
- ✏️ Rich descriptions
- 👤 User assignment
- ✓ Completion status

## Sample Data

The API comes with pre-populated sample data:

**Users:**
- Admin (admin@taskmanager.com)
- John Doe (john.doe@example.com)
- Jane Smith (jane.smith@example.com)

**Tasks:**
- Various tasks with different priorities and statuses
- Tasks assigned to different users

## Tips

1. **Creating Tasks**: Always assign a task to a user (required field)
2. **Filtering**: Use multiple filters together for precise results
3. **Due Dates**: Tasks show visual indicators for overdue items
4. **Responsive**: Try the app on mobile - it's fully responsive!

## Troubleshooting

### Application won't start?
- Ensure you're in the `task-manager-portal` directory
- Run `npm install` again
- Check that port 4200 is available

### Can't see tasks?
- Verify the backend API is running on http://localhost:8000
- Check browser console for errors
- Ensure API endpoints are accessible

### Styling issues?
- Clear browser cache
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

## What's Next?

1. Create your first task
2. Try filtering and searching
3. Mark some tasks as complete
4. Explore the user management section
5. Check out the responsive design on mobile

Enjoy using Task Manager Portal! 🎉

