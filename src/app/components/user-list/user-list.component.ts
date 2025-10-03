import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

/**
 * User List Component
 * 
 * Displays all users in the system
 * Following principles:
 * - Single Responsibility: User listing only
 * - OnPush Change Detection: Performance optimized
 */
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]>;

  constructor(private userService: UserService) {
    this.users$ = this.userService.users$;
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        console.log('✅ Users loaded successfully:', users);
      },
      error: (error) => {
        console.error('❌ Error loading users:', error);
        alert('Failed to load users: ' + (error.message || 'Unknown error'));
      }
    });
  }

  /**
   * Get user's display name
   */
  getDisplayName(user: User): string {
    return user.full_name || user.username;
  }

  /**
   * Get user role badge text
   */
  getRoleBadge(user: User): string {
    return user.is_superuser ? 'Admin' : 'User';
  }
}

