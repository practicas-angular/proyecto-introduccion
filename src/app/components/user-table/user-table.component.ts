import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { BehaviorSubject, catchError, of, switchMap } from 'rxjs';

// Services
import { UserService } from '../../services/user.service';

// UI Components & Modules
import { SHARED_COMPONENTS } from '../../shared/shared-components';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-user-table',
  standalone: true, // Explicitly marking as standalone is good practice
  imports: [
    AsyncPipe, 
    SHARED_COMPONENTS, 
    MatButtonModule, 
    MatIconModule, 
    MatProgressSpinnerModule
  ],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss'
})
export class UserTableComponent {
  private userService = inject(UserService);
  private router = inject(Router);

  // Main list stream
  users$ = this.userService.getUsers().pipe(
    catchError(e => {
      console.error('Error fetching users', e);
      return of([]);
    })
  );

  // Selection stream for the Modal
  private selectedUserSource = new BehaviorSubject<number | null>(null);
  
  selectedUser$ = this.selectedUserSource.pipe(
    switchMap(id => {
      if (!id) return of(null);
      return this.userService.getUserById(id).pipe(
        catchError(err => {
          console.error('Error fetching details', err);
          return of(null);
        })
      );
    })
  );

  showModal = false;

  openUserDetail(id: number) {
    this.showModal = true;
    this.selectedUserSource.next(id);
  }

  closeModal() {
    this.showModal = false;
    this.selectedUserSource.next(null);
  }

  navigateToDetail(id: number) {
    // Ensure this path matches your app.routes.ts configuration
    this.router.navigate(['/detail', id]);
  }
}