import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatButtonModule, MatToolbarModule, MatIconModule, RouterModule],
  template: `
    <mat-toolbar
      style="display: flex; justify-content: space-between; align-items: center;"
      class="navbar"
    >
      <a href="/">
        <img src="../../../Logo.webp" alt="Home" class="logo" />
      </a>

      <div class="nav-links">
        <a href="/" mat-button>Acceuil</a>
        <a [routerLink]="['/reservation']" mat-button>Réservation</a>
        <a [routerLink]="['/gallery']" mat-button>Galerie</a>
        <a [routerLink]="['/about']" mat-button>Où sommes nous ?</a>
      </div>

      <a href="/reservation" target="_blank">
        <button href="/reservation" mat-flat-button color="warn">
          Réserver une table
        </button>
      </a>
    </mat-toolbar>
  `,
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {}
