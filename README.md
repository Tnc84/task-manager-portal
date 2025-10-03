# 📋 Task Manager Portal

A modern, production-ready task management portal built with Angular 20. This application provides a beautiful and intuitive interface for managing tasks and users.

## ✨ Features

- **Dashboard Overview**: Get a quick snapshot of all tasks with statistics cards
- **Task Management**: Create, read, update, and delete tasks with ease
- **Advanced Filtering**: Filter tasks by status, priority, and search terms
- **User Management**: View all users in the system
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile devices
- **Modern UI**: Clean, gradient-based design with smooth animations
- **Type-Safe**: Built with TypeScript for enhanced code quality
- **Reactive Programming**: Uses RxJS for efficient data streaming

## 🏗️ Architecture & Design Principles

This application follows industry best practices and SOLID principles:

### **Single Responsibility Principle (SRP)**
- Each component has one clear purpose
- Services handle specific business logic domains
- Models define data structures only

### **Dependency Injection**
- All services use Angular's DI system
- Never manually instantiated
- Easily testable and mockable

### **Reactive Programming**
- RxJS Observables for async data streams
- BehaviorSubjects for state management
- Operators for data transformation

### **OnPush Change Detection**
- Optimized performance with OnPush strategy
- Immutable data patterns
- Reduced change detection cycles

### **Separation of Concerns**
- UI logic in components
- Business logic in services
- Data transformations in pipes (when needed)

## 🚀 Getting Started

### Prerequisites

- Node.js 22.19.0 or higher
- npm 11.6.0 or higher
- Angular CLI 20.3.2

### Installation

1. Navigate to the project directory:
```bash
cd task-manager-portal
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

1. Ensure the backend API is running on `http://localhost:8000`

2. Start the development server:
```bash
ng serve
```

3. Open your browser and navigate to:
```
http://localhost:4200
```

### Building for Production

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── dashboard/          # Dashboard overview component
│   │   ├── task-list/          # Task listing with filters
│   │   ├── task-form/          # Task creation/editing form
│   │   └── user-list/          # User listing component
│   ├── models/
│   │   ├── task.model.ts       # Task interfaces and types
│   │   └── user.model.ts       # User interfaces and types
│   ├── services/
│   │   ├── task.service.ts     # Task API service
│   │   ├── user.service.ts     # User API service
│   │   └── api.config.ts       # API configuration
│   ├── app.ts                  # Root component
│   ├── app.html                # Root template
│   ├── app.css                 # Root styles
│   ├── app.routes.ts           # Route configuration
│   └── app.config.ts           # Application configuration
├── styles.css                  # Global styles
└── index.html                  # HTML entry point
```

## 🎨 Features Walkthrough

### Dashboard
- **Statistics Cards**: View total tasks, completed, pending, high priority, and active users
- **Quick Actions**: Fast navigation to create tasks or manage users
- **Recent Tasks**: Preview of the 5 most recent tasks

### Task Management
- **Create Tasks**: Simple form with validation
- **Edit Tasks**: Update task details including completion status
- **Delete Tasks**: Remove tasks with confirmation
- **Filter & Search**: Filter by status/priority and search by title/description
- **Priority Badges**: Visual indicators for task priority levels
- **Due Date Tracking**: See overdue tasks and approaching deadlines

### User Management
- **User Profiles**: View user details with avatar circles
- **Role Badges**: Distinguish between admins and regular users
- **Status Indicators**: See active/inactive user status

## 🔧 API Integration

This application connects to the Task Manager API (FastAPI backend).

**Base URL**: `http://localhost:8000/api/v1`

### Endpoints Used:
- `GET /users` - Fetch all users
- `GET /users/{id}` - Fetch user by ID
- `GET /tasks` - Fetch all tasks
- `GET /tasks/{id}` - Fetch task by ID
- `POST /tasks` - Create new task
- `PUT /tasks/{id}` - Update task
- `DELETE /tasks/{id}` - Delete task

See `API_DOCUMENTATION.md` for complete API details.

## 🧪 Testing

Run unit tests:
```bash
ng test
```

Run end-to-end tests:
```bash
ng e2e
```

## 📦 Technologies Used

- **Angular 20.3.2**: Modern web framework
- **TypeScript**: Type-safe JavaScript
- **RxJS**: Reactive programming library
- **Angular Router**: Client-side routing
- **Angular Forms**: Reactive form handling
- **HttpClient**: HTTP communication

## 🎯 Code Quality

This project follows:
- **Angular Style Guide**: Official Angular coding conventions
- **SOLID Principles**: Maintainable, scalable code
- **DRY**: Don't Repeat Yourself
- **KISS**: Keep It Simple, Stupid
- **YAGNI**: You Aren't Gonna Need It

## 🤝 Contributing

1. Follow the established code style
2. Write meaningful commit messages
3. Add tests for new features
4. Ensure all tests pass before submitting

## 📄 License

This project is part of the Task Manager application suite.

## 👨‍💻 Developer Notes

### Key Design Decisions:

1. **Standalone Components**: Using Angular's latest standalone API for cleaner code
2. **Reactive Forms**: Type-safe form handling with built-in validation
3. **BehaviorSubjects**: State management pattern for service data
4. **OnPush Strategy**: Performance optimization with immutable data
5. **CSS-only Styling**: No external UI libraries for maximum customization

### Future Enhancements:

- [ ] Add authentication and authorization
- [ ] Implement real-time updates with WebSockets
- [ ] Add task comments and attachments
- [ ] Implement drag-and-drop task reordering
- [ ] Add dark mode toggle
- [ ] Implement task categories/tags
- [ ] Add email notifications

---

**Last Updated**: October 3, 2025
**Version**: 1.0.0
