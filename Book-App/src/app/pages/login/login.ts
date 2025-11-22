import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  imports: [FormsModule, NgIf]
})
export class LoginComponent {

  model: any = {};

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth.login(this.model).subscribe({
      next: (res: any) => {
        this.auth.saveToken(res.token);
        this.router.navigate(['/books']);   
      },
      error: () => {
        alert("Login failed");
      }
    });
  }
}
