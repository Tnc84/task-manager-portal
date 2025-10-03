import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { Task, TaskPriority } from '../../models/task.model';

/**
 * Task List Component
 * 
 * Displays all tasks with filtering, sorting capabilities
 * Following principles:
 * - Single Responsibility: Task listing and filtering only
 * - OnPush Change Detection: Performance optimized
 * - Reactive: Uses Observables for data streaming
 */
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]>;
  filteredTasks$: Observable<Task[]>;
  
  // Filter state
  filterStatus: 'all' | 'completed' | 'pending' = 'all';
  filterPriority: TaskPriority | 'all' = 'all';
  searchTerm: string = '';

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.tasks$;
    this.filteredTasks$ = this.tasks$;
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        console.log('✅ Tasks loaded successfully:', tasks);
      },
      error: (error) => {
        console.error('❌ Error loading tasks:', error);
        alert('Failed to load tasks: ' + (error.message || 'Unknown error'));
      }
    });
    this.applyFilters();
  }

  /**
   * Apply filters using RxJS operators
   * Demonstrates reactive programming for data transformation
   */
  applyFilters(): void {
    this.filteredTasks$ = this.tasks$.pipe(
      map(tasks => {
        let filtered = [...tasks];

        // Status filter
        if (this.filterStatus === 'completed') {
          filtered = filtered.filter(t => t.is_completed);
        } else if (this.filterStatus === 'pending') {
          filtered = filtered.filter(t => !t.is_completed);
        }

        // Priority filter
        if (this.filterPriority !== 'all') {
          filtered = filtered.filter(t => t.priority === this.filterPriority);
        }

        // Search filter
        if (this.searchTerm) {
          const term = this.searchTerm.toLowerCase();
          filtered = filtered.filter(t => 
            t.title.toLowerCase().includes(term) ||
            (t.description?.toLowerCase().includes(term) ?? false)
          );
        }

        return filtered;
      })
    );
  }

  /**
   * Toggle task completion status
   */
  toggleComplete(task: Task): void {
    this.taskService.updateTask(task.id, { 
      is_completed: !task.is_completed 
    }).subscribe();
  }

  /**
   * Delete task with confirmation
   */
  deleteTask(task: Task): void {
    if (confirm(`Are you sure you want to delete "${task.title}"?`)) {
      this.taskService.deleteTask(task.id).subscribe();
    }
  }

  /**
   * Get days until due date
   */
  getDaysUntilDue(dueDate: string | null): number | null {
    if (!dueDate) return null;
    const due = new Date(dueDate);
    const now = new Date();
    const diff = due.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }
}

