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
    return this.userJsonService.getUserRoleByEmail(email).pipe(
      map((role) => role === 'admin'), // Transformamos el string/null en un booleano
      tap((adminCheck) => {
        if (adminCheck) {
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
