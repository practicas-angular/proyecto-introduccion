import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { UserJsonService } from './user-json.service';
import { map, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private storage = inject(LocalStorageService);
  private userJsonService = inject(UserJsonService);
  private router = inject(Router);

  isAdmin = signal<boolean>(this.storage.get('isAdmin') === 'true');

  login(email: string): Observable<boolean> {
    return this.userJsonService.getUserByEmail(email).pipe(
      tap((exists) => {
        if (exists) {
          localStorage.setItem('isAdmin', 'true');
          this.isAdmin.set(true);
        }
      }),
    );
  }

  logout() {
    this.storage.remove('isAdmin');
    this.isAdmin.set(false);
    this.router.navigate(['/login']);
  }
}
