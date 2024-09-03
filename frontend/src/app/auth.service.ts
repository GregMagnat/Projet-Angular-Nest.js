import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly username: string = environment.authUsername;
  private readonly password: string = environment.authPassword;

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    if (username === this.username && password === this.password) {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('isLoggedIn', 'true');
      }
      return true;
    }
    return false;
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('isLoggedIn');
    }
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }
    return sessionStorage.getItem('isLoggedIn') === 'true';
  }
}
