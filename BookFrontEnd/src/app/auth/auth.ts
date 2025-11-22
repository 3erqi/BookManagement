import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  username = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
    this.successMessage = '';
    this.username = '';
    this.password = '';
  }

  onSubmit() {
    this.errorMessage = '';
    if (this.isLoginMode) {
      this.authService.login(this.username, this.password).subscribe({
        next: (res: any) => {
          this.errorMessage = '';
          this.successMessage = 'Login successful!';
          localStorage.setItem('token', res);
        },
        error: (err: any) => {
          this.successMessage = '';
          this.errorMessage = err.error || 'Login failed.';
        }
      });
    } else {
      this.authService.register(this.username, this.password).subscribe({
        next: (res: any) => {
          this.errorMessage = '';
          this.successMessage = 'Registration successful! You can now log in.';
          this.toggleMode();
        },
        error: (err: any) => {
          this.successMessage = '';
          this.errorMessage = err.error || 'Registration failed.';
        }
      });
    }
  }
}
