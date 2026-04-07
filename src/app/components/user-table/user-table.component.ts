import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { BehaviorSubject, catchError, of, switchMap } from 'rxjs';

// Services
import { UserService } from '../../services/user.service';

// UI Components & Modules
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SHARED_IMPORTS } from '../../shared/shared-imports';
import { UserCardComponent } from '../user-card/user-card.component';

@Component({
  selector: 'app-user-table',
  standalone: true, // Explicitly marking as standalone is good practice
  imports: [
    AsyncPipe,
    SHARED_IMPORTS,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    UserCardComponent
  ],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss'
})
export class UserTableComponent {
  private userService = inject(UserService);
  private router = inject(Router);

  // filteredUsers ahora viene del servicio
  usersToShow = this.userService.filteredUsers;

  // Mantenemos la lógica de los detalles (RxJS) aquí porque es específica de la tabla
  private selectedUserSource = new BehaviorSubject<number | null>(null);
  selectedUser$ = this.selectedUserSource.pipe(
    switchMap(id => id ? this.userService.getUserById(id) : of(null))
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