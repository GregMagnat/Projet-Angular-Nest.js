import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  template: `
    <div class="login-container">
      <mat-card class="login-card">
        <h2>Login</h2>
        <form (ngSubmit)="login()">
          <mat-form-field appearance="fill">
            <mat-label>Nom d'utilisateur</mat-label>
            <input
              matInput
              type="text"
              [(ngModel)]="username"
              name="username"
              required
            />
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Mot de passe</mat-label>
            <input
              matInput
              type="password"
              [(ngModel)]="password"
              name="password"
              required
            />
          </mat-form-field>
          <button mat-button class="button" type="submit">Login</button>
        </form>
      </mat-card>
    </div>
  `,
  styleUrls: ['./login.component.css'],
  providers: [AuthService],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/adminWs']);
    } else {
      alert("erreur de de mot de passe ou de nom d'utilisateur");
    }
  }
}
