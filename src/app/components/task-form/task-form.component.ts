import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

/**
 * Task Form Component
 * 
 * Handles task creation and editing
 * Following principles:
 * - Single Responsibility: Only manages task form operations
 * - Reactive Forms: Type-safe, testable form handling
 * - Validation: Comprehensive client-side validation
 */
@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  users$: Observable<User[]>;
  isEditMode = false;
  taskId: number | null = null;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Initialize reactive form with validation
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      priority: ['medium', Validators.required],
      due_date: [''],
      owner_id: [null, Validators.required],
      is_completed: [false]
    });

    this.users$ = this.userService.users$;
  }

  ngOnInit(): void {
    // Load users for dropdown
    this.userService.getUsers().subscribe();

    // Check if we're in edit mode
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.taskId = +params['id'];
        this.loadTask(this.taskId);
      }
    });
  }

  /**
   * Load task data for editing
   */
  private loadTask(id: number): void {
    this.taskService.getTaskById(id).subscribe({
      next: (task) => {
        console.log('✅ Task loaded for editing:', task);
        
        // Convert date to datetime-local format
        let dueDate = '';
        if (task.due_date) {
          const date = new Date(task.due_date);
          dueDate = date.toISOString().slice(0, 16);
        }

        this.taskForm.patchValue({
          title: task.title,
          description: task.description,
          priority: task.priority,
          due_date: dueDate,
          owner_id: task.owner_id,
          is_completed: task.is_completed
        });
        
        console.log('✅ Form values after patch:', this.taskForm.value);
      },
      error: (error) => {
        console.error('❌ Error loading task:', error);
        alert('Failed to load task: ' + (error.error?.detail || error.message || 'Unknown error'));
        this.router.navigate(['/tasks']);
      }
    });
  }

  /**
   * Submit form (create or update)
   */
  onSubmit(): void {
    if (this.taskForm.invalid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    const formValue = this.taskForm.value;

    // Convert datetime-local to ISO 8601
    if (formValue.due_date) {
      formValue.due_date = new Date(formValue.due_date).toISOString();
    } else {
      formValue.due_date = null;
    }

    if (this.isEditMode && this.taskId) {
      // Update existing task
      this.taskService.updateTask(this.taskId, formValue).subscribe({
        next: () => {
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          console.error('Error updating task:', error);
          this.isSubmitting = false;
        }
      });
    } else {
      // Create new task
      this.taskService.createTask(formValue).subscribe({
        next: () => {
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          console.error('Error creating task:', error);
          this.isSubmitting = false;
        }
      });
    }
  }

  /**
   * Cancel and navigate back
   */
  onCancel(): void {
    this.router.navigate(['/tasks']);
  }

  /**
   * Getter for form controls (for easier access in template)
   */
  get f() {
    return this.taskForm.controls;
  }
}

