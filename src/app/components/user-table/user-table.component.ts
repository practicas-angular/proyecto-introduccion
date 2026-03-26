import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { catchError, of, Subject, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { SHARED_COMPONENTS } from '../../shared/shared-components';

@Component({
  selector: 'app-user-table',
  imports: [AsyncPipe, SHARED_COMPONENTS],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss'
})
export class UserTableComponent {
  private userService = inject(UserService);

  /* added .pipe(catchError) just in case error happens,
  to ruturn an empty array */
  users$ = this.userService.getUsers().pipe(
    catchError(e => {
      console.error('Error fetching users', e);
      return of([])
    })
  );

  /* fetch User by id */
  private selectedUserSource = new Subject<number | null>();
  selectedUser$ = this.selectedUserSource.pipe(
    switchMap(id => {
      if (!id) return of(null); // If no ID, return nothing
      return this.userService.getUserById(id).pipe(
        catchError(err => {
          console.error('Error fetching details', err);
          return of(null); // If error, return nothing
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
}
