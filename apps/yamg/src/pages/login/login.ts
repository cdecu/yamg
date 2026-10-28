import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { YamgAuthService } from '../../app/yamg-auth';

@Component({
  selector: 'yamg-login',
  imports: [
    ReactiveFormsModule,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatFormField,
    MatInput,
    MatCardActions,
    MatButton,
    MatError,
    MatLabel,
    RouterLink,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly auth = inject(YamgAuthService);
  private readonly formBuilder = inject(NonNullableFormBuilder);
  readonly loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  private readonly nextUrl: string;

  constructor() {
    const state = this.router.currentNavigation()?.extras?.state;
    this.nextUrl = state?.['url'] || '/home';
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      this.snackBar.open('Check yours entries', 'Close', { duration: 3000 });
      return;
    }

    const res = this.auth.login(this.loginForm.getRawValue());
    if (res !== true) {
      this.snackBar.open(res, 'Close', { duration: 3000 });
      return;
    }
    void this.router.navigateByUrl(this.nextUrl);
  }
}
