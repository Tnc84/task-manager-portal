import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

/**
 * Root App Component
 * 
 * Main application shell with navigation
 * Following principles:
 * - Single Responsibility: Application shell and navigation
 * - Clean template structure
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'Task Manager Portal';
  
  // Navigation menu items
  navItems = [
    { path: '/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/tasks', icon: '📝', label: 'Tasks' },
    { path: '/users', icon: '👥', label: 'Users' }
  ];

  /**
   * Get Angular version for footer display
   */
  getAngularVersion(): string {
    return '20';
  }
}
