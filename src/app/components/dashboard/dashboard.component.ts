import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable, combineLatest, map } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { Task } from '../../models/task.model';
import { User } from '../../models/user.model';

/**
 * Dashboard Component
 * 
 * Main overview page showing task statistics and quick actions
 * Following principles:
 * - Single Responsibility: Displays dashboard overview only
 * - OnPush Change Detection: Optimized performance with immutable data
 * - Reactive Programming: Uses Observables for data streaming
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  tasks$: Observable<Task[]>;
  users$: Observable<User[]>;
  
  // Computed statistics using RxJS operators
  stats$: Observable<{
    totalTasks: number;
    completedTasks: number;
    pendingTasks: number;
    highPriorityTasks: number;
    totalUsers: number;
  }>;

  constructor(
    private taskService: TaskService,
    private userService: UserService
  ) {
    this.tasks$ = this.taskService.tasks$;
    this.users$ = this.userService.users$;
    
    // Reactive computation of statistics
    this.stats$ = combineLatest([this.tasks$, this.users$]).pipe(
      map(([tasks, users]) => ({
        totalTasks: tasks.length,
        completedTasks: tasks.filter(t => t.is_completed).length,
        pendingTasks: tasks.filter(t => !t.is_completed).length,
        highPriorityTasks: tasks.filter(t => t.priority === 'high' && !t.is_completed).length,
        totalUsers: users.length
      }))
    );
  }

  ngOnInit(): void {
    // Initialize data loading
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        console.log('✅ Dashboard: Tasks loaded:', tasks);
      },
      error: (error) => {
        console.error('❌ Dashboard: Error loading tasks:', error);
      }
    });
    this.userService.getUsers().subscribe({
      next: (users) => {
        console.log('✅ Dashboard: Users loaded:', users);
      },
      error: (error) => {
        console.error('❌ Dashboard: Error loading users:', error);
      }
    });
  }
}

