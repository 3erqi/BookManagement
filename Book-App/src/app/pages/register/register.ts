import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
  imports: [FormsModule, NgIf]
})
export class RegisterComponent {
  
  model: any = {};

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth.register(this.model).subscribe({
      next: () => {
        alert("Account created! Please log in.");
        this.router.navigate(['/login']);
      },
      error: () => {
        alert("Registration failed.");
      }
    });
  }
}
