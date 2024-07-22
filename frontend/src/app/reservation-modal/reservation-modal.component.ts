import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-reservation-modal',
  template: `
    <h1>MODAL</h1>
    <button mat-button (click)="close()">Fermer</button>
  `,
  styleUrls: ['./reservation-modal.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
})
export class ReservationModalComponent {
  constructor(public dialogRef: MatDialogRef<ReservationModalComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
