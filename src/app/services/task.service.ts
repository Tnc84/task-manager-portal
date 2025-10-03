import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Task, TaskCreate, TaskUpdate } from '../models/task.model';
import { getApiUrl, API_CONFIG } from './api.config';

/**
 * Task Service
 * 
 * Handles all task-related API operations following these principles:
 * - Single Responsibility: Only manages task data operations
 * - Dependency Injection: Injected via Angular DI container
 * - Reactive Programming: Uses RxJS Observables for async operations
 * - Immutability: Returns new data instances without side effects
 */
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly apiUrl = getApiUrl(API_CONFIG.endpoints.tasks);
  
  // BehaviorSubject for reactive state management
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  public tasks$ = this.tasksSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Get all tasks with optional pagination
   */
  getTasks(skip: number = 0, limit: number = 100): Observable<Task[]> {
    const params = new HttpParams()
      .set('skip', skip.toString())
      .set('limit', limit.toString());

    return this.http.get<Task[]>(this.apiUrl, { params }).pipe(
      tap(tasks => this.tasksSubject.next(tasks))
    );
  }

  /**
   * Get a single task by ID
   */
  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}${id}`);
  }

  /**
   * Create a new task
   */
  createTask(task: TaskCreate): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task).pipe(
      tap(() => this.refreshTasks())
    );
  }

  /**
   * Update an existing task
   */
  updateTask(id: number, task: TaskUpdate): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}${id}`, task).pipe(
      tap(() => this.refreshTasks())
    );
  }

  /**
   * Delete a task
   */
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`).pipe(
      tap(() => this.refreshTasks())
    );
  }

  /**
   * Refresh tasks list (useful after mutations)
   */
  private refreshTasks(): void {
    this.getTasks().subscribe();
  }
}

