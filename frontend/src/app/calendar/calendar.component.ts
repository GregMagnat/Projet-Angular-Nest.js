import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../reservation.service';
import { Reservation } from '../reservation.model';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <h2>Liste des Réservations</h2>
      <ul>
        <li *ngFor="let reservation of reservations">
          {{ reservation.name }} {{ reservation.lastName }} -
          {{ reservation.date }} de {{ reservation.hour_start }} à
          {{ reservation.hour_end }}
        </li>
      </ul>
    </div>
  `,
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.reservationService
      .getReservations()
      .subscribe((data: Reservation[]) => {
        this.reservations = data;
      });
  }
}
