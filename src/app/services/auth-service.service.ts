import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage-service.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private storage = inject(LocalStorageService);
  // Usamos un signal para que la UI reaccione de forma eficiente
  isAdmin = signal<boolean>(this.storage.get('isAdmin') === 'true');

  constructor(private router: Router) {}

  login() {
    this.storage.set('isAdmin', 'true');
    this.isAdmin.set(true);
    this.router.navigate(['/admin']);
  } 

  logout() {
    this.storage.remove('isAdmin');
    this.isAdmin.set(false);
    this.router.navigate(['/login']);
  }
}