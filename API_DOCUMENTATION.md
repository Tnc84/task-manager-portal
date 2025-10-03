# Task Manager API Documentation

**Version:** 1.0.0  
**Base URL:** `http://localhost:8000`  
**API Prefix:** `/api/v1`

---

## Table of Contents
- [Overview](#overview)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
  - [Users](#users-endpoints)
  - [Tasks](#tasks-endpoints)
- [Data Models](#data-models)
- [Error Responses](#error-responses)
- [Sample Data](#sample-data)
- [Getting Started](#getting-started)

---

## Overview

The Task Manager API is a RESTful API built with FastAPI that allows you to manage users and their tasks. It provides full CRUD operations for both users and tasks.

### Key Features
- User management (Create, Read, Update, Delete)
- Task management with priorities and due dates
- Task assignment to users
- Password hashing and security
- Pagination support
- Comprehensive validation

### Interactive Documentation
- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

---

## Authentication

**Note:** Authentication endpoints are not yet implemented in the current version. All endpoints are currently open.

**Planned:** JWT-based authentication will be added in future versions.

---

## API Endpoints

### Users Endpoints

#### 1. Get All Users
Retrieve a list of all users with pagination.

**Endpoint:** `GET /api/v1/users/`

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| skip | integer | No | 0 | Number of records to skip |
| limit | integer | No | 100 | Maximum number of records to return |

**Example Request:**
```http
GET http://localhost:8000/api/v1/users/?skip=0&limit=10
```

**Example Response:**
```json
[
  {
    "email": "admin@taskmanager.com",
    "username": "admin",
    "full_name": "Administrator",
    "is_active": true,
    "id": 1,
    "is_superuser": true,
    "created_at": "2025-10-03T13:34:16",
    "updated_at": null
  },
  {
    "email": "john.doe@example.com",
    "username": "johndoe",
    "full_name": "John Doe",
    "is_active": true,
    "id": 2,
    "is_superuser": false,
    "created_at": "2025-10-03T13:34:16",
    "updated_at": null
  }
]
```

---

#### 2. Get User by ID
Retrieve a specific user by their ID.

**Endpoint:** `GET /api/v1/users/{user_id}`

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| user_id | integer | Yes | The ID of the user |

**Example Request:**
```http
GET http://localhost:8000/api/v1/users/1
```

**Example Response:**
```json
{
  "email": "admin@taskmanager.com",
  "username": "admin",
  "full_name": "Administrator",
  "is_active": true,
  "id": 1,
  "is_superuser": true,
  "created_at": "2025-10-03T13:34:16",
  "updated_at": null
}
```

**Error Response (404):**
```json
{
  "detail": "User not found"
}
```

---

#### 3. Create User
Create a new user.

**Endpoint:** `POST /api/v1/users/`

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "username": "newuser",
  "password": "securepassword123",
  "full_name": "New User",
  "is_active": true
}
```

**Required Fields:**
- `email` (string, valid email format)
- `username` (string)
- `password` (string)

**Optional Fields:**
- `full_name` (string, nullable)
- `is_active` (boolean, default: true)

**Example Response (201 Created):**
```json
{
  "email": "newuser@example.com",
  "username": "newuser",
  "full_name": "New User",
  "is_active": true,
  "id": 4,
  "is_superuser": false,
  "created_at": "2025-10-03T14:00:00",
  "updated_at": null
}
```

---

#### 4. Update User
Update an existing user's information.

**Endpoint:** `PUT /api/v1/users/{user_id}`

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| user_id | integer | Yes | The ID of the user to update |

**Request Body (all fields optional):**
```json
{
  "email": "updated@example.com",
  "username": "updatedusername",
  "full_name": "Updated Name",
  "is_active": true,
  "password": "newpassword123"
}
```

**Example Response:**
```json
{
  "email": "updated@example.com",
  "username": "updatedusername",
  "full_name": "Updated Name",
  "is_active": true,
  "id": 2,
  "is_superuser": false,
  "created_at": "2025-10-03T13:34:16",
  "updated_at": "2025-10-03T14:05:00"
}
```

**Error Response (404):**
```json
{
  "detail": "User not found"
}
```

---

#### 5. Delete User
Delete a user by ID.

**Endpoint:** `DELETE /api/v1/users/{user_id}`

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| user_id | integer | Yes | The ID of the user to delete |

**Example Request:**
```http
DELETE http://localhost:8000/api/v1/users/4
```

**Example Response (204 No Content):**
No response body.

**Error Response (404):**
```json
{
  "detail": "User not found"
}
```

---

### Tasks Endpoints

#### 1. Get All Tasks
Retrieve a list of all tasks with pagination.

**Endpoint:** `GET /api/v1/tasks/`

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| skip | integer | No | 0 | Number of records to skip |
| limit | integer | No | 100 | Maximum number of records to return |

**Example Request:**
```http
GET http://localhost:8000/api/v1/tasks/?skip=0&limit=10
```

**Example Response:**
```json
[
  {
    "title": "Complete project documentation",
    "description": "Write comprehensive documentation for the Task Manager API project",
    "is_completed": false,
    "priority": "high",
    "due_date": "2025-10-10T13:34:16",
    "id": 1,
    "owner_id": 1,
    "created_at": "2025-10-03T13:34:16",
    "updated_at": null
  },
  {
    "title": "Review code changes",
    "description": "Review all recent code changes and provide feedback",
    "is_completed": true,
    "priority": "medium",
    "due_date": "2025-10-02T13:34:16",
    "id": 2,
    "owner_id": 1,
    "created_at": "2025-10-03T13:34:16",
    "updated_at": null
  }
]
```

---

#### 2. Get Task by ID
Retrieve a specific task by its ID.

**Endpoint:** `GET /api/v1/tasks/{task_id}`

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| task_id | integer | Yes | The ID of the task |

**Example Request:**
```http
GET http://localhost:8000/api/v1/tasks/1
```

**Example Response:**
```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive documentation for the Task Manager API project",
  "is_completed": false,
  "priority": "high",
  "due_date": "2025-10-10T13:34:16",
  "id": 1,
  "owner_id": 1,
  "created_at": "2025-10-03T13:34:16",
  "updated_at": null
}
```

**Error Response (404):**
```json
{
  "detail": "Task not found"
}
```

---

#### 3. Create Task
Create a new task.

**Endpoint:** `POST /api/v1/tasks/`

**Request Body:**
```json
{
  "title": "New Task",
  "description": "Task description here",
  "is_completed": false,
  "priority": "high",
  "due_date": "2025-10-15T10:00:00",
  "owner_id": 1
}
```

**Required Fields:**
- `title` (string)
- `owner_id` (integer) - Must be a valid user ID

**Optional Fields:**
- `description` (string, nullable)
- `is_completed` (boolean, default: false)
- `priority` (string, default: "medium") - Values: "low", "medium", "high"
- `due_date` (datetime, nullable, ISO 8601 format)

**Example Response (201 Created):**
```json
{
  "title": "New Task",
  "description": "Task description here",
  "is_completed": false,
  "priority": "high",
  "due_date": "2025-10-15T10:00:00",
  "id": 7,
  "owner_id": 1,
  "created_at": "2025-10-03T14:10:00",
  "updated_at": null
}
```

---

#### 4. Update Task
Update an existing task.

**Endpoint:** `PUT /api/v1/tasks/{task_id}`

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| task_id | integer | Yes | The ID of the task to update |

**Request Body (all fields optional):**
```json
{
  "title": "Updated Task Title",
  "description": "Updated description",
  "is_completed": true,
  "priority": "low",
  "due_date": "2025-10-20T10:00:00"
}
```

**Example Response:**
```json
{
  "title": "Updated Task Title",
  "description": "Updated description",
  "is_completed": true,
  "priority": "low",
  "due_date": "2025-10-20T10:00:00",
  "id": 1,
  "owner_id": 1,
  "created_at": "2025-10-03T13:34:16",
  "updated_at": "2025-10-03T14:15:00"
}
```

**Error Response (404):**
```json
{
  "detail": "Task not found"
}
```

---

#### 5. Delete Task
Delete a task by ID.

**Endpoint:** `DELETE /api/v1/tasks/{task_id}`

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| task_id | integer | Yes | The ID of the task to delete |

**Example Request:**
```http
DELETE http://localhost:8000/api/v1/tasks/7
```

**Example Response (204 No Content):**
No response body.

**Error Response (404):**
```json
{
  "detail": "Task not found"
}
```

---

## Data Models

### User Model
```typescript
interface User {
  id: number;
  email: string;
  username: string;
  full_name: string | null;
  is_active: boolean;
  is_superuser: boolean;
  created_at: string;  // ISO 8601 datetime
  updated_at: string | null;  // ISO 8601 datetime
}
```

### Task Model
```typescript
interface Task {
  id: number;
  title: string;
  description: string | null;
  is_completed: boolean;
  priority: string;  // "low" | "medium" | "high"
  due_date: string | null;  // ISO 8601 datetime
  owner_id: number;
  created_at: string;  // ISO 8601 datetime
  updated_at: string | null;  // ISO 8601 datetime
}
```

---

## Error Responses

### Common HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 OK | Request successful |
| 201 Created | Resource created successfully |
| 204 No Content | Resource deleted successfully |
| 400 Bad Request | Invalid request data or validation error |
| 404 Not Found | Resource not found |
| 422 Unprocessable Entity | Validation error (detailed error messages provided) |
| 500 Internal Server Error | Server error |

### Error Response Format

**Validation Error (422):**
```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "value is not a valid email address",
      "type": "value_error.email"
    }
  ]
}
```

**Generic Error (404, 400, etc.):**
```json
{
  "detail": "Error message here"
}
```

---

## Sample Data

The API comes pre-populated with sample data for testing:

### Sample Users

| ID | Email | Username | Password | Role |
|----|-------|----------|----------|------|
| 1 | admin@taskmanager.com | admin | admin123 | Admin |
| 2 | john.doe@example.com | johndoe | password123 | User |
| 3 | jane.smith@example.com | janesmith | password123 | User |

### Sample Tasks

| ID | Title | Priority | Owner | Status |
|----|-------|----------|-------|--------|
| 1 | Complete project documentation | high | admin | Incomplete |
| 2 | Review code changes | medium | admin | Complete |
| 3 | Setup development environment | high | johndoe | Incomplete |
| 4 | Design user interface mockups | medium | janesmith | Incomplete |
| 5 | Write unit tests | high | johndoe | Incomplete |
| 6 | Database optimization | low | janesmith | Incomplete |

---

## Getting Started

### Prerequisites
- The API server should be running on `http://localhost:8000`
- All requests should use JSON format
- Set `Content-Type: application/json` header for POST/PUT requests

### Quick Start Example (JavaScript/Fetch)

```javascript
// Get all tasks
const getTasks = async () => {
  const response = await fetch('http://localhost:8000/api/v1/tasks/');
  const tasks = await response.json();
  console.log(tasks);
};

// Create a new task
const createTask = async () => {
  const response = await fetch('http://localhost:8000/api/v1/tasks/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: 'New Task',
      description: 'Task description',
      priority: 'high',
      due_date: '2025-10-15T10:00:00',
      owner_id: 1
    })
  });
  const task = await response.json();
  console.log(task);
};

// Update a task
const updateTask = async (taskId) => {
  const response = await fetch(`http://localhost:8000/api/v1/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      is_completed: true
    })
  });
  const task = await response.json();
  console.log(task);
};

// Delete a task
const deleteTask = async (taskId) => {
  const response = await fetch(`http://localhost:8000/api/v1/tasks/${taskId}`, {
    method: 'DELETE'
  });
  console.log('Task deleted');
};
```

### Quick Start Example (Python/Requests)

```python
import requests

BASE_URL = "http://localhost:8000/api/v1"

# Get all tasks
response = requests.get(f"{BASE_URL}/tasks/")
tasks = response.json()
print(tasks)

# Create a new task
new_task = {
    "title": "New Task",
    "description": "Task description",
    "priority": "high",
    "due_date": "2025-10-15T10:00:00",
    "owner_id": 1
}
response = requests.post(f"{BASE_URL}/tasks/", json=new_task)
task = response.json()
print(task)

# Update a task
update_data = {"is_completed": True}
response = requests.put(f"{BASE_URL}/tasks/1", json=update_data)
task = response.json()
print(task)

# Delete a task
response = requests.delete(f"{BASE_URL}/tasks/1")
print(f"Status: {response.status_code}")
```

---

## Additional Resources

- **Interactive API Docs (Swagger):** http://localhost:8000/docs
- **Alternative Docs (ReDoc):** http://localhost:8000/redoc
- **Health Check:** http://localhost:8000/health
- **Root Endpoint:** http://localhost:8000/

---

## Support & Contact

For questions or issues, please contact the backend development team.

**Last Updated:** October 3, 2025

