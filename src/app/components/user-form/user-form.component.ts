import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';

/**
 * User Form Component
 * 
 * Handles user creation and editing
 * Following principles:
 * - Single Responsibility: Only manages user form operations
 * - Reactive Forms: Type-safe, testable form handling
 * - Validation: Comprehensive client-side validation
 */
@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isEditMode = false;
  userId: number | null = null;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Initialize reactive form with validation
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      full_name: [''],
      is_active: [true],
      is_superuser: [false]
    });
  }

  ngOnInit(): void {
    // Check if we're in edit mode
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.userId = parseInt(id, 10);
      this.loadUser(this.userId);
      // Password not required for updates
      this.userForm.get('password')?.clearValidators();
      this.userForm.get('password')?.updateValueAndValidity();
    }
  }

  /**
   * Load user data for editing
   */
  loadUser(id: number): void {
    this.userService.getUserById(id).subscribe({
      next: (user) => {
        this.userForm.patchValue({
          email: user.email,
          username: user.username,
          full_name: user.full_name,
          is_active: user.is_active,
          is_superuser: user.is_superuser
        });
      },
      error: (error) => {
        console.error('Error loading user:', error);
        alert('Failed to load user data');
        this.router.navigate(['/users']);
      }
    });
  }

  /**
   * Get form controls for easy access in template
   */
  get f() {
    return this.userForm.controls;
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    if (this.userForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.userForm.controls).forEach(key => {
        this.userForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;
    const formValue = this.userForm.value;

    // Remove password if empty in edit mode
    if (this.isEditMode && !formValue.password) {
      delete formValue.password;
    }

    if (this.isEditMode && this.userId) {
      // Update existing user
      this.userService.updateUser(this.userId, formValue).subscribe({
        next: () => {
          alert('User updated successfully!');
          this.router.navigate(['/users']);
        },
        error: (error) => {
          console.error('Error updating user:', error);
          alert('Failed to update user: ' + (error.error?.detail || 'Unknown error'));
          this.isSubmitting = false;
        }
      });
    } else {
      // Create new user
      this.userService.createUser(formValue).subscribe({
        next: () => {
          alert('User created successfully!');
          this.router.navigate(['/users']);
        },
        error: (error) => {
          console.error('Error creating user:', error);
          alert('Failed to create user: ' + (error.error?.detail || 'Unknown error'));
          this.isSubmitting = false;
        }
      });
    }
  }

  /**
   * Cancel and return to user list
   */
  onCancel(): void {
    this.router.navigate(['/users']);
  }
}

