import { Component, DestroyRef, inject } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared-imports';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-login-form',
  imports: [SHARED_IMPORTS, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);

  contactForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  // 1. Creamos un "disparador"
private loginTrigger$ = new Subject<string>();

constructor() {
  // 2. Configuramos el flujo una sola vez
  this.loginTrigger$.pipe(
    // switchMap cancela la petición anterior si llega una nueva
    switchMap(email => this.authService.login(email)),
    takeUntilDestroyed()
  ).subscribe(isAdmin => {
    if (isAdmin) this.contactForm.reset();
  });
}

onSubmit() {
  if (this.contactForm.valid) {
    this.loginTrigger$.next(this.contactForm.value.email ? this.contactForm.value.email : '');
  }
}
}
