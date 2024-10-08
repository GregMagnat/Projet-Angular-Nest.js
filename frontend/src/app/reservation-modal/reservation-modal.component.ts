import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
  MatNativeDateModule,
} from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { catchError, of } from 'rxjs';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-reservation-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  template: `
    <div class="reservation-modal" (click)="onBackdropClick($event)">
      <mat-card class="reservation-card" (click)="$event.stopPropagation()">
        <div class="reservation-container">
          <div class="datepicker-container">
            <mat-calendar [(selected)]="selected"></mat-calendar>
            <div class="time-selection">
              <mat-form-field appearance="fill">
                <mat-label>Heure de début</mat-label>
                <input
                  matInput
                  placeholder="HH:MM"
                  [(ngModel)]="startTime"
                  (blur)="formatTime('start')"
                />
              </mat-form-field>
              <mat-form-field appearance="fill">
                <mat-label>Heure de fin</mat-label>
                <input
                  matInput
                  placeholder="HH:MM"
                  [(ngModel)]="endTime"
                  (blur)="formatTime('end')"
                />
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
            <div class="button-container">
              <button mat-button class="submit-button" (click)="submit()">
                Soumettre
              </button>
            </div>
          </div>
        </div>
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
    public dialogRef: MatDialogRef<ReservationModalComponent>,
    private snackBar: MatSnackBar
  ) {
    this.dialogRef.disableClose = false;
  }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:4321/categories').subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.error('Error fetching categories', error);
        this.snackBar.open(
          'Erreur lors du chargement des catégories.',
          'Fermer',
          {
            duration: 5000,
            panelClass: ['error-snackbar'],
            verticalPosition: 'top',
            horizontalPosition: 'center',
          }
        );
      },
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  onBackdropClick(event: MouseEvent): void {
    this.dialogRef.close();
  }

  formatTime(type: 'start' | 'end'): void {
    const time = type === 'start' ? this.startTime : this.endTime;
    if (time) {
      const [hours, minutes] = time.split(':');
      if (minutes === undefined) {
        if (type === 'start') {
          this.startTime = `${hours}:00`;
        } else {
          this.endTime = `${hours}:00`;
        }
      }
    }
  }

  submit(): void {
    if (
      !this.selected ||
      !this.startTime ||
      !this.endTime ||
      !this.name ||
      !this.lastName ||
      !this.phone ||
      !this.email ||
      !this.selectedCategory
    ) {
      this.snackBar.open(
        'Veuillez remplir tous les champs du formulaire.',
        'Fermer',
        {
          duration: 5000,
          panelClass: ['custom-snackbar'],
          verticalPosition: 'top', // Snackbar en haut
          horizontalPosition: 'center', // Centré horizontalement
        }
      );
      return;
    }

    const localDate = new Date(this.selected);
    const utcDate = new Date(
      Date.UTC(
        localDate.getFullYear(),
        localDate.getMonth(),
        localDate.getDate()
      )
    );

    const [startHours, startMinutes] = (this.startTime || '00:00')
      .split(':')
      .map(Number);
    const [endHours, endMinutes] = (this.endTime || '00:00')
      .split(':')
      .map(Number);

    const reservationStart = new Date(utcDate);
    reservationStart.setUTCHours(startHours, startMinutes);

    const reservationEnd = new Date(utcDate);
    reservationEnd.setUTCHours(endHours, endMinutes);

    const reservation = {
      date: utcDate.toISOString().split('T')[0],
      hour_start: reservationStart.toISOString().split('T')[1].substring(0, 5),
      hour_end: reservationEnd.toISOString().split('T')[1].substring(0, 5),
      name: this.name,
      lastName: this.lastName,
      phone: this.phone,
      email: this.email,
      categoryId: this.selectedCategory,
    };

    this.http
      .post<{ reservation?: any; message?: string }>(
        'http://localhost:4321/reservations',
        reservation
      )
      .pipe(
        catchError((error) => {
          this.snackBar.open(
            `Erreur: ${error.error.message || 'Une erreur est survenue.'}`,
            'Fermer',
            {
              duration: 5000,
              panelClass: ['custom-snackbar'],
              verticalPosition: 'top', // Snackbar en haut
              horizontalPosition: 'center', // Centré horizontalement
            }
          );
          return of(null);
        })
      )
      .subscribe({
        next: (response) => {
          if (response && response.reservation) {
            this.snackBar.open(
              `Réservation réussie ! Nous t'envoyons un mail à ${this.email}. N'oublie pas de passer en caisse pour prendre une boisson par personne !`,
              'Fermer',
              {
                duration: 5000,
                panelClass: ['success-snackbar'],
                verticalPosition: 'top', // Snackbar en haut
                horizontalPosition: 'center', // Centré horizontalement
              }
            );
            this.dialogRef.close();
          }
        },
        error: (error) => {
          console.error('Error saving reservation', error);
          this.snackBar.open(
            "Une erreur est survenue lors de l'enregistrement de la réservation.",
            'Fermer',
            {
              duration: 5000,
              panelClass: ['custom-snackbar'],
              verticalPosition: 'top', // Snackbar en haut
              horizontalPosition: 'center', // Centré horizontalement
            }
          );
        },
      });
  }
}
