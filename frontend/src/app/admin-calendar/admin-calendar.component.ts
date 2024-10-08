import {
  Component,
  OnInit,
  Inject,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  CalendarDateFormatter,
  CalendarEvent,
  CalendarMonthViewDay,
  CalendarView,
} from 'angular-calendar';
import { CommonModule } from '@angular/common';
import { AdminCalendarModule } from './admin-calendar.module';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { Reservation } from '../reservation.model';
import { CustomDateFormatter } from './customDateFormatter';
import { Router } from '@angular/router';
registerLocaleData(localeFr);

@Component({
  selector: 'app-admin-calendar',
  standalone: true,
  imports: [CommonModule, AdminCalendarModule],
  template: `
    <div class="container">
      <div class="custom-header">
        <div class="button-group">
          <button (click)="decrement()">Précédent</button>
          <button (click)="onToday()">Aujourd'hui</button>
          <button (click)="increment()">Prochain</button>
        </div>
        <div class="current-date">
          <span>{{ viewDate | date : 'fullDate' }}</span>
        </div>
        <div class="button-group">
          <button (click)="setView(CalendarViews.Month)">Mois</button>
          <button (click)="setView(CalendarViews.Week)">Semaine</button>
          <button (click)="setView(CalendarViews.Day)">Jour</button>
        </div>
      </div>

      <ng-container [ngSwitch]="view">
        <mwl-calendar-month-view
          *ngSwitchCase="CalendarViews.Month"
          [viewDate]="viewDate"
          [events]="events"
          (dayClicked)="onDayClicked($event)"
          (eventClicked)="handleEvent('Clicked', $event.event)"
          [locale]="'fr'"
          [activeDayIsOpen]="true"
        ></mwl-calendar-month-view>

        <mwl-calendar-week-view
          *ngSwitchCase="CalendarViews.Week"
          [viewDate]="viewDate"
          [events]="events"
          [hourSegments]="1"
          [hourSegmentHeight]="50"
          [dayStartHour]="10"
          [dayEndHour]="24"
          [locale]="'fr'"
          (eventClicked)="handleEvent('Clicked', $event.event)"
        ></mwl-calendar-week-view>

        <mwl-calendar-day-view
          *ngSwitchCase="CalendarViews.Day"
          [viewDate]="viewDate"
          [events]="events"
          [hourSegments]="1"
          [hourSegmentHeight]="60"
          [dayStartHour]="10"
          [dayEndHour]="23"
          [locale]="'fr'"
          (eventClicked)="handleEvent('Clicked', $event.event)"
        ></mwl-calendar-day-view>
      </ng-container>

      <div class="selected-event" *ngIf="selectedEvent">
        <p>Événement sélectionné: {{ selectedEvent.title }}</p>
        <div class="button-group" *ngIf="selectedEvent">
          <button class="delete-button" (click)="deleteEvent()">
            Supprimer
          </button>
          <button class="edit-button" (click)="editEvent()">Modifier</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./admin-calendar.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ],
})
export class AdminCalendarComponent implements OnInit {
  CalendarViews = CalendarView;
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  selectedEvent: CalendarEvent | null = null;
  selectedDate: Date | null = null;
  events: CalendarEvent[] = [];

  @ViewChild('hourTemplate') hourTemplate!: TemplateRef<any>;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private reservationService: ReservationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selectedDate = new Date();
    this.setView(this.view);
    this.reservationService.getReservations().subscribe({
      next: (reservations: Reservation[]) => {
        this.events = this.mapReservationsToEvents(reservations);
        console.log('Events:', this.events);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des réservations:', err);
      },
    });
  }

  mapReservationsToEvents(reservations: Reservation[]): CalendarEvent[] {
    return reservations.map((reservation) => {
      const startDateTime = `${reservation.date.split('T')[0]}T${
        reservation.hour_start
      }`;
      const endDateTime = `${reservation.date.split('T')[0]}T${
        reservation.hour_end
      }`;
      const start = new Date(startDateTime);
      const end = new Date(endDateTime);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        console.error('Invalid Date:', startDateTime, endDateTime);
      }

      return {
        start,
        end,
        title: `${
          reservation.lastName.charAt(0).toUpperCase() +
          reservation.lastName.slice(1)
        } ${
          reservation.name.charAt(0).toUpperCase() + reservation.name.slice(1)
        } Téléphone: ${reservation.phone} ${reservation.category_name}`,
        meta: { id: reservation.id },
      };
    });
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.selectedEvent = event;
  }

  deleteEvent(): void {
    if (
      this.selectedEvent &&
      this.selectedEvent.meta &&
      this.selectedEvent.meta.id
    ) {
      const eventId = this.selectedEvent.meta.id;
      this.reservationService.deleteReservation(eventId).subscribe({
        next: () => {
          this.events = this.events.filter(
            (event) => event !== this.selectedEvent
          );
          this.selectedEvent = null;
          alert('Événement supprimé avec succès.');
        },
        error: (err) => {
          console.error("Erreur lors de la suppression de l'événement:", err);
          alert("Erreur lors de la suppression de l'événement.");
        },
      });
    }
  }
  editEvent(): void {
    if (
      this.selectedEvent &&
      this.selectedEvent.meta &&
      this.selectedEvent.meta.id
    ) {
      const eventId = this.selectedEvent.meta.id;
      this.router.navigate([`/edit-reservation/${eventId}`]);
    }
  }

  onDayClicked({ day }: { day: CalendarMonthViewDay }): void {
    this.selectedDate = day.date;
    this.viewDate = this.selectedDate;
  }

  onToday(): void {
    this.viewDate = new Date();
    this.selectedDate = new Date();
    this.setView(this.view);
  }

  increment(): void {
    if (this.view === CalendarView.Month) {
      const next = new Date(this.viewDate);
      next.setMonth(next.getMonth() + 1);
      this.viewDate = next;
    } else if (this.view === CalendarView.Week) {
      const next = new Date(this.viewDate);
      next.setDate(next.getDate() + 7);
      this.viewDate = next;
    } else {
      const next = new Date(this.viewDate);
      next.setDate(next.getDate() + 1);
      this.viewDate = next;
    }
  }

  decrement(): void {
    if (this.view === CalendarView.Month) {
      const previous = new Date(this.viewDate);
      previous.setMonth(previous.getMonth() - 1);
      this.viewDate = previous;
    } else if (this.view === CalendarView.Week) {
      const previous = new Date(this.viewDate);
      previous.setDate(previous.getDate() - 7);
      this.viewDate = previous;
    } else {
      const previous = new Date(this.viewDate);
      previous.setDate(previous.getDate() - 1);
      this.viewDate = previous;
    }
  }

  setView(view: CalendarView): void {
    this.view = view;
    this.viewDate = this.selectedDate || new Date();
  }
}
