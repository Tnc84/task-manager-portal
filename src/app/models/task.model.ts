/**
 * Task Priority
 * Enum for task priority levels
 */
export type TaskPriority = 'low' | 'medium' | 'high';

/**
 * Task Model
 * Represents a task entity as defined in the Task Manager API
 */
export interface Task {
  id: number;
  title: string;
  description: string | null;
  is_completed: boolean;
  priority: TaskPriority;
  due_date: string | null;
  owner_id: number;
  created_at: string;
  updated_at: string | null;
}

/**
 * Task Create DTO
 * Data transfer object for creating new tasks
 */
export interface TaskCreate {
  title: string;
  description?: string | null;
  is_completed?: boolean;
  priority?: TaskPriority;
  due_date?: string | null;
  owner_id: number;
}

/**
 * Task Update DTO
 * Data transfer object for updating existing tasks
 */
export interface TaskUpdate {
  title?: string;
  description?: string | null;
  is_completed?: boolean;
  priority?: TaskPriority;
  due_date?: string | null;
}

