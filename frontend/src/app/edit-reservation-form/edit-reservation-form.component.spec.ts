import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { EditReservationFormComponent } from './edit-reservation-form.component';
import { ReservationService } from '../reservation.service';
import { of, throwError } from 'rxjs';

describe('EditReservationFormComponent', () => {
  let component: EditReservationFormComponent;
  let fixture: ComponentFixture<EditReservationFormComponent>;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };
  let reservationServiceSpy: jasmine.SpyObj<ReservationService>;

  beforeEach(async () => {
    reservationServiceSpy = jasmine.createSpyObj('ReservationService', [
      'getReservationById',
      'updateReservation',
    ]);

    await TestBed.configureTestingModule({
      imports: [EditReservationFormComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ReservationService, useValue: reservationServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditReservationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display an alert on submit failure', () => {
    spyOn(window, 'alert');
    reservationServiceSpy.updateReservation.and.returnValue(
      throwError({ message: 'Test error' })
    );

    component.onSubmit();

    expect(window.alert).toHaveBeenCalledWith(
      'Erreur lors de la mise à jour de la réservation: Test error'
    );
  });
});
