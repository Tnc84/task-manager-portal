import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User, UserCreate, UserUpdate } from '../models/user.model';
import { getApiUrl, API_CONFIG } from './api.config';

/**
 * User Service
 * 
 * Handles all user-related API operations following these principles:
 * - Single Responsibility: Only manages user data operations
 * - Dependency Injection: Injected via Angular DI container
 * - Reactive Programming: Uses RxJS Observables for async operations
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = getApiUrl(API_CONFIG.endpoints.users);
  
  // BehaviorSubject for reactive state management
  private usersSubject = new BehaviorSubject<User[]>([]);
  public users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Get all users with optional pagination
   */
  getUsers(skip: number = 0, limit: number = 100): Observable<User[]> {
    const params = new HttpParams()
      .set('skip', skip.toString())
      .set('limit', limit.toString());

    return this.http.get<User[]>(this.apiUrl, { params }).pipe(
      tap(users => this.usersSubject.next(users))
    );
  }

  /**
   * Get a single user by ID
   */
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}${id}`);
  }

  /**
   * Create a new user
   */
  createUser(user: UserCreate): Observable<User> {
    return this.http.post<User>(this.apiUrl, user).pipe(
      tap(() => this.refreshUsers())
    );
  }

  /**
   * Update an existing user
   */
  updateUser(id: number, user: UserUpdate): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}${id}`, user).pipe(
      tap(() => this.refreshUsers())
    );
  }

  /**
   * Delete a user
   */
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`).pipe(
      tap(() => this.refreshUsers())
    );
  }

  /**
   * Refresh users list
   */
  private refreshUsers(): void {
    this.getUsers().subscribe();
  }
}

