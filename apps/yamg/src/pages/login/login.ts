import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  readonly loginForm: FormGroup;
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly auth = inject(YamgAuthService);
  private readonly nextUrl: string = '/home';

  constructor(private formBuilder: FormBuilder) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state;
    this.nextUrl = state?.['url'] || '/home';
    this.nextUrl = this.nextUrl === '/logout' ? '/home' : this.nextUrl;
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      this.snackBar.open('Check yours entries', 'Close', { duration: 3000 });
      return;
    }

    const res = this.auth.login(this.loginForm.value);
    if (res !== true) {
      this.snackBar.open(res, 'Close', { duration: 3000 });
      return;
    }
    console.log('Login successful. NextUrl', this.nextUrl);
    void this.router.navigateByUrl(this.nextUrl);
  }
}
