import { Component, DestroyRef, inject } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared-imports';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [SHARED_IMPORTS, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  contactForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  // 1. Creamos un "disparador"
  private loginTrigger$ = new Subject<string>();

  constructor() {
    // 2. Configuramos el flujo una sola vez
    this.loginTrigger$
      .pipe(
        // switchMap cancela la petición anterior si llega una nueva
        switchMap((email) => this.authService.login(email)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((isAdmin) => {
        if (isAdmin) {
          this.contactForm.reset();
          this.router.navigate(['/admin']);
        } else {
          alert('Usuario no encontrado en la base de datos');
        }
      });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      let email = this.contactForm.value.email
      ? this.contactForm.value.email
      : '';
      this.contactForm.reset();
      this.loginTrigger$.next(email);
    }
  }
}
