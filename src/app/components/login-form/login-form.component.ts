import { Component, inject } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared-imports';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login-form',
  imports: [SHARED_IMPORTS, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  contactForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form Data:', this.contactForm.value);
      this.contactForm.reset();
      this.authService.login();
    }
  }
}
