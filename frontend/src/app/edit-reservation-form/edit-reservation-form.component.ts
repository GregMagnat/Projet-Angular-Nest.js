import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from '../reservation.service';
import { Reservation } from '../reservation.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { EditReservationFormModule } from './edit-reservation-form.module';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-reservation-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    EditReservationFormModule,
  ],
  template: `
    <div class="main-content">
      <form [formGroup]="editReservationForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="fill">
          <mat-label>Téléphone</mat-label>
          <input matInput formControlName="phone" />
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Email</mat-label>
          <input matInput formControlName="email" />
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Date</mat-label>
          <input matInput [matDatepicker]="picker" formControlName="date" />
          <mat-datepicker-toggle
            matSuffix
            [for]="picker"
          ></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Heure de début</mat-label>
          <input matInput type="time" formControlName="hour_start" />
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Heure de fin</mat-label>
          <input matInput type="time" formControlName="hour_end" />
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Catégorie</mat-label>
          <mat-select formControlName="categoryId">
            <mat-option value="1">Wargames</mat-option>
            <mat-option value="2">Jeux de cartes</mat-option>
            <mat-option value="3">jeux de sociétés</mat-option>
            <mat-option value="4">Initiation Wargames</mat-option>
            <mat-option value="5">Cours de stratégie</mat-option>
          </mat-select>
        </mat-form-field>

        <button mat-raised-button type="submit">Enregistrer</button>
      </form>
    </div>
  `,
  styleUrls: ['./edit-reservation-form.component.css'],
})
export class EditReservationFormComponent implements OnInit {
  editReservationForm!: FormGroup;
  reservationId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router, // Injecter le Router pour la redirection
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.reservationId = +this.route.snapshot.paramMap.get('id')!;
    this.initializeForm();
    this.loadReservationData();
  }

  initializeForm(): void {
    this.editReservationForm = this.fb.group({
      phone: [''],
      email: [''],
      date: [''],
      hour_start: [''],
      hour_end: [''],
      categoryId: [''],
    });
  }

  loadReservationData(): void {
    this.reservationService.getReservationById(this.reservationId).subscribe({
      next: (reservation: Reservation) => {
        this.editReservationForm.patchValue({
          phone: reservation.phone,
          email: reservation.email,
          date: reservation.date,
          hour_start: reservation.hour_start,
          hour_end: reservation.hour_end,
          categoryId: reservation.categoryId,
        });
      },
      error: (err) => {
        console.error('Erreur lors du chargement de la réservation:', err);
      },
    });
  }

  onSubmit(): void {
    if (this.editReservationForm.valid) {
      const updatedReservation = this.editReservationForm.value;
      this.reservationService
        .updateReservation({ id: this.reservationId, ...updatedReservation })
        .subscribe({
          next: () => {
            // Si la mise à jour est réussie, rediriger vers l'URL adminWs
            this.router.navigate(['/adminWs']);
          },
          error: (err: any) => {
            // Si une erreur se produit, afficher une alerte avec le message d'erreur
            alert(
              'Erreur lors de la mise à jour de la réservation: ' + err.message
            );
          },
        });
    }
  }
}
