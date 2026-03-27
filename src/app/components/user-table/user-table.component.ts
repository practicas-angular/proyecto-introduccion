import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { BehaviorSubject, catchError, of, Subject, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { SHARED_COMPONENTS } from '../../shared/shared-components';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-table',
  imports: [AsyncPipe, SHARED_COMPONENTS],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss'
})
export class UserTableComponent {
  private userService = inject(UserService);
  private router = inject(Router);

  /* added .pipe(catchError) just in case error happens,
  to ruturn an empty array */
  users$ = this.userService.getUsers().pipe(
    catchError(e => {
      console.error('Error fetching users', e);
      return of([])
    })
  );

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
    this.selectedUserSource.next(id); // This triggers the fetch
  }

  closeModal() {
    this.showModal = false;
  }

  navigateToDetail(id: number) {
    this.router.navigate(['/detail', id]);
  }
}
