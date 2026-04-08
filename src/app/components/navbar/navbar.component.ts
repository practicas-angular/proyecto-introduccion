import { Component, inject } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared-imports';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [SHARED_IMPORTS, LanguageSelectorComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  public authService = inject(AuthService);
  private router = inject(Router);

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
