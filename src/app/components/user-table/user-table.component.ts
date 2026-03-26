import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { catchError, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-table',
  imports: [AsyncPipe],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss'
})
export class UserTableComponent {
  private userService = inject(UserService);

  users$ = this.userService.getUsers().pipe(
    catchError(e => {
      console.error('Error fetching users', e);
      return of([])
    })
  );
}
