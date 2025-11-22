import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl = 'http://localhost:5156/api/auth';

  constructor(private http: HttpClient, private router: Router){}

  register(model: any){
    return this.http.post(`${this.apiUrl}/register`, model);
  }

  login(model: any){
    return this.http.post(`${this.apiUrl}/login`, model);
  }

  saveToken(token: string){
    localStorage.setItem('token', token);
  }
  
  getToken(){
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}