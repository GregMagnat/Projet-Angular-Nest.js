import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ReservationModalComponent } from '../reservation-modal/reservation-modal.component';

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

      <button mat-button class="custom-button" (click)="openReservationModal()">
        Réserver une table
      </button>
    </mat-toolbar>
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
