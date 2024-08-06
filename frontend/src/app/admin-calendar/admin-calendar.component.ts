import { Component, OnInit } from '@angular/core';
import {
  CalendarEvent,
  CalendarMonthViewDay,
  CalendarView,
} from 'angular-calendar';
import { CommonModule } from '@angular/common';
import { AdminCalendarModule } from './admin-calendar.module';

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
        <div class="button-group">
          <button (click)="setView(CalendarViews.Month)">Mois</button>
          <button (click)="setView(CalendarViews.Week)">Semaine</button>
          <button (click)="setView(CalendarViews.Day)">Jour</button>
        </div>
      </div>

      <ng-template #customHeaderTemplate let-days="days">
        <span>{{ viewDate | date : 'MMMM y' }}</span>
      </ng-template>

      <ng-container [ngSwitch]="view">
        <mwl-calendar-month-view
          *ngSwitchCase="CalendarViews.Month"
          [viewDate]="viewDate"
          [events]="events"
          [headerTemplate]="customHeaderTemplate"
          (dayClicked)="onDayClicked($event)"
        ></mwl-calendar-month-view>

        <mwl-calendar-week-view
          *ngSwitchCase="CalendarViews.Week"
          [viewDate]="viewDate"
          [events]="events"
        ></mwl-calendar-week-view>

        <mwl-calendar-day-view
          *ngSwitchCase="CalendarViews.Day"
          [viewDate]="viewDate"
          [events]="events"
        ></mwl-calendar-day-view>
      </ng-container>
    </div>
  `,
  styleUrls: ['./admin-calendar.component.css'],
})
export class AdminCalendarComponent implements OnInit {
  CalendarViews = CalendarView;
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  selectedDate: Date | null = null;

  events: CalendarEvent[] = [
    {
      start: new Date(),
      title: 'Événement 1',
    },
    {
      start: new Date(),
      title: 'Événement 2',
    },
    {
      start: new Date(new Date().setDate(new Date().getDate() + 1)),
      title: 'Événement 3',
    },
  ];

  ngOnInit(): void {
    this.selectedDate = new Date();
  }

  get filteredEvents(): CalendarEvent[] {
    return this.selectedDate
      ? this.events.filter(
          (event) =>
            event.start.toDateString() === this.selectedDate!.toDateString()
        )
      : [];
  }

  onDayClicked({ day }: { day: CalendarMonthViewDay }): void {
    this.selectedDate = day.date;
  }

  onToday(): void {
    this.viewDate = new Date();
    this.selectedDate = new Date();
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
  }
}
