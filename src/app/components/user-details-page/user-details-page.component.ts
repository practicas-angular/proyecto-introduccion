import { AsyncPipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details-page',
  imports: [AsyncPipe],
  templateUrl: './user-details-page.component.html',
  styleUrl: './user-details-page.component.scss'
})
export class UserDetailsPageComponent {
  @Input()
  id!: string;

  private userService = inject(UserService);
  user$!: Observable<any>;

  ngOnInit() {
    this.user$ = this.userService.getUserById(Number(this.id));
  }

  private router = inject(Router);

  navigateBack() {
    this.router.navigate(['about']);
  }
}
