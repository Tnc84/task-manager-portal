/**
 * User Model
 * Represents a user entity as defined in the Task Manager API
 */
export interface User {
  id: number;
  email: string;
  username: string;
  full_name: string | null;
  is_active: boolean;
  is_superuser: boolean;
  created_at: string;
  updated_at: string | null;
}

/**
 * User Create DTO
 * Data transfer object for creating new users
 */
export interface UserCreate {
  email: string;
  username: string;
  password: string;
  full_name?: string | null;
  is_active?: boolean;
}

/**
 * User Update DTO
 * Data transfer object for updating existing users
 */
export interface UserUpdate {
  email?: string;
  username?: string;
  password?: string;
  full_name?: string | null;
  is_active?: boolean;
}

