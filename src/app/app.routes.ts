import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';

/**
 * Application Routes
 * 
 * Defines the routing structure for the application
 * Following Angular best practices with lazy-loadable components
 */
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard - Task Manager'
  },
  {
    path: 'tasks',
    component: TaskListComponent,
    title: 'All Tasks - Task Manager'
  },
  {
    path: 'tasks/new',
    component: TaskFormComponent,
    title: 'Create Task - Task Manager'
  },
  {
    path: 'tasks/edit/:id',
    component: TaskFormComponent,
    title: 'Edit Task - Task Manager'
  },
  {
    path: 'users/new',
    component: UserFormComponent,
    title: 'Create User - Task Manager'
  },
  {
    path: 'users/edit/:id',
    component: UserFormComponent,
    title: 'Edit User - Task Manager'
  },
  {
    path: 'users',
    component: UserListComponent,
    title: 'Users - Task Manager'
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
