import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog } from '@angular/material/dialog';
import { ReservationModalComponent } from '../reservation-modal/reservation-modal.component';
import { VideoModalComponent } from '../video-modal/video-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatGridListModule],
  template: `
    <div class="home-container">
      <div class="main-content">
        <div class="main-left">
          <h1 style="max-width: 300px;">
            Venez profitez de nos tables de jeux avec vos amis
          </h1>
          <div class="buttons-group">
            <button
              mat-button
              class="left-button"
              (click)="openReservationModal()"
            >
              Réserver une table
            </button>
            <button (click)="openVideoModal()">Voir la boutique</button>
          </div>
        </div>
        <div class="main-right">
          <img
            class="main-right"
            src="../../../des.png"
            alt="Image de dès personalisés"
          />
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(public dialog: MatDialog) {}

  openReservationModal(): void {
    this.dialog.open(ReservationModalComponent, {
      width: '300px',
      backdropClass: 'custom-backdrop',
    });
  }

  openVideoModal(): void {
    this.dialog.open(VideoModalComponent, {
      width: '80%',
      height: '80%',
      backdropClass: 'custom-backdrop',
    });
  }
}
