import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  CalendarEvent,
  CalendarView,
  CalendarModule,
  DateAdapter,
  CalendarUtils,
  CalendarA11y,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { isSameMonth, isSameDay } from 'date-fns';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, CalendarModule, MatButtonModule],
  template: `
    <div>
      <h3>{{ viewDate | date : 'MMMM yyyy' }}</h3>
      <button mat-button (click)="view = CalendarView.Month">Month</button>
      <button mat-button (click)="view = CalendarView.Week">Week</button>
      <button mat-button (click)="view = CalendarView.Day">Day</button>
      <ng-container *ngIf="view === CalendarView.Month">
        <mwl-calendar-month-view
          [viewDate]="viewDate"
          [events]="events"
          (dayClicked)="dayClicked($event.day)"
        ></mwl-calendar-month-view>
      </ng-container>
      <ng-container *ngIf="view === CalendarView.Week">
        <mwl-calendar-week-view
          [viewDate]="viewDate"
          [events]="events"
        ></mwl-calendar-week-view>
      </ng-container>
      <ng-container *ngIf="view === CalendarView.Day">
        <mwl-calendar-day-view
          [viewDate]="viewDate"
          [events]="events"
        ></mwl-calendar-day-view>
      </ng-container>
    </div>
  `,
  styleUrls: ['./calendar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: DateAdapter,
      useFactory: adapterFactory,
    },
    CalendarUtils,
    CalendarA11y,
  ],
})
export class CalendarComponent {
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  CalendarView = CalendarView;

  activeDayIsOpen: boolean = false;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }
}
