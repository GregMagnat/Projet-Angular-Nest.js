import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'; // Importer MatSelectModule
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-reservation-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  template: `
    <div class="reservation-modal">
      <mat-card class="reservation-card">
        <div class="reservation-container">
          <div class="datepicker-container">
            <mat-calendar [(selected)]="selected"></mat-calendar>
            <div class="time-selection">
              <mat-form-field appearance="fill">
                <mat-label>Heure de début</mat-label>
                <input matInput placeholder="HH:MM" [(ngModel)]="startTime" />
              </mat-form-field>
              <mat-form-field appearance="fill">
                <mat-label>Heure de fin</mat-label>
                <input matInput placeholder="HH:MM" [(ngModel)]="endTime" />
              </mat-form-field>
            </div>
          </div>
          <div class="form-container">
            <mat-form-field appearance="fill">
              <mat-label>Nom</mat-label>
              <input matInput [(ngModel)]="name" />
            </mat-form-field>
            <mat-form-field appearance="fill">
              <mat-label>Prénom</mat-label>
              <input matInput [(ngModel)]="lastName" />
            </mat-form-field>
            <mat-form-field appearance="fill">
              <mat-label>Téléphone</mat-label>
              <input matInput [(ngModel)]="phone" />
            </mat-form-field>
            <mat-form-field appearance="fill">
              <mat-label>Email</mat-label>
              <input matInput [(ngModel)]="email" />
            </mat-form-field>
            <mat-form-field appearance="fill">
              <mat-label>Catégorie</mat-label>
              <mat-select [(ngModel)]="selectedCategory">
                <mat-option
                  *ngFor="let category of categories"
                  [value]="category.id"
                >
                  {{ category.name }}
                </mat-option>
              </mat-select>
            </mat-form-field>
          </div>
        </div>
        <button mat-button (click)="submit()">Submit</button>
      </mat-card>
    </div>
  `,
  styleUrls: ['./reservation-modal.component.css'],
})
export class ReservationModalComponent implements OnInit {
  selected: Date | null = null;
  startTime: string | null = null;
  endTime: string | null = null;
  name: string | null = null;
  lastName: string | null = null;
  phone: string | null = null;
  email: string | null = null;
  categories: any[] = [];
  selectedCategory: number | null = null;

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<ReservationModalComponent>
  ) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:4321/categories').subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.error('Error fetching categories', error);
      },
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (!this.selected || !this.startTime || !this.endTime) {
      console.error('Incomplete reservation data');
      return;
    }

    // Convert selected date to UTC and adjust time
    const reservationDate = new Date(this.selected);
    reservationDate.setUTCHours(0, 0, 0, 0); // Réinitialiser les heures pour éviter les décalages

    // Combine date and time for start and end times
    const reservationStart = new Date(reservationDate);
    const [startHours, startMinutes] = (this.startTime || '00:00')
      .split(':')
      .map(Number);
    reservationStart.setUTCHours(startHours, startMinutes);

    const reservationEnd = new Date(reservationDate);
    const [endHours, endMinutes] = (this.endTime || '00:00')
      .split(':')
      .map(Number);
    reservationEnd.setUTCHours(endHours, endMinutes);

    const reservation = {
      date: reservationDate.toISOString().split('T')[0],
      hour_start: reservationStart.toISOString().split('T')[1].substring(0, 5),
      hour_end: reservationEnd.toISOString().split('T')[1].substring(0, 5),
      name: this.name,
      lastName: this.lastName,
      phone: this.phone,
      email: this.email,
      categoryId: this.selectedCategory,
    };

    this.http
      .post('http://localhost:4321/reservations', reservation)
      .subscribe({
        next: (response) => {
          console.log('Reservation saved', response);
          this.dialogRef.close();
        },
        error: (error) => {
          console.error('Error saving reservation', error);
        },
      });
  }
}
