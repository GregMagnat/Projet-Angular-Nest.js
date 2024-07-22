import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog } from '@angular/material/dialog';
import { ReservationModalComponent } from '../reservation-modal/reservation-modal.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatGridListModule],
  template: `
    <div class="home-container">
      <div class="main-content">
        <div class="main-left">
          <h1>Venez profitez de nos tables de jeux avec vos amis</h1>
          <div class="buttons-group">
            <button
              mat-button
              class="left-button"
              (click)="openReservationModal()"
            >
              Réserver une table
            </button>
            <button>Voir la boutique</button>
          </div>
        </div>

        <div class="main-right">
          <img src="../../../Logo.webp" alt="" style="width: 500px" />
        </div>
      </div>
    </div>
  `,
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(public dialog: MatDialog) {}

  openReservationModal(): void {
    this.dialog.open(ReservationModalComponent, {
      width: '300px',
      backdropClass: 'custom-backdrop',
    });
  }
}
