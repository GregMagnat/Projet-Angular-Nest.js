import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ReservationModalComponent } from '../reservation-modal/reservation-modal.component';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
  ],
  template: `
    <mat-toolbar class="navbar">
      <a href="/">
        <img src="../../../Logo.webp" alt="Logo" class="logo" />
      </a>

      <nav class="nav-links">
        <a [routerLink]="['/']" mat-list-item>Accueil</a>
        <a [routerLink]="['/reservation']" mat-list-item>Réservation</a>
        <a [routerLink]="['/gallery']" mat-list-item>Galerie</a>
        <a [routerLink]="['/about']" mat-list-item>Où sommes nous ?</a>
      </nav>

      <button
        mat-button
        class="reservation-button"
        (click)="openReservationModal()"
      >
        Réserver une table
      </button>

      <button
        mat-icon-button
        [matMenuTriggerFor]="menu"
        class="mobile-menu-button"
      >
        <mat-icon>menu</mat-icon>
      </button>
    </mat-toolbar>

    <mat-menu #menu="matMenu" class="mobile-menu">
      <div class="menu-content">
        <a [routerLink]="['/']" mat-list-item>Accueil</a>
        <a [routerLink]="['/reservation']" mat-list-item>Réservation</a>
        <a [routerLink]="['/gallery']" mat-list-item>Galerie</a>
        <a [routerLink]="['/about']" mat-list-item>Où sommes nous ?</a>
        <button mat-button (click)="openReservationModal()">
          Réserver une table
        </button>
      </div>
    </mat-menu>
  `,
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(public dialog: MatDialog) {}
  openReservationModal(): void {
    this.dialog.open(ReservationModalComponent, {
      width: '300px',
      backdropClass: 'custom-backdrop',
    });
  }
}
