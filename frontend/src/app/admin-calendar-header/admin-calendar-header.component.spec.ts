import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCalendarHeaderComponent } from './admin-calendar-header.component';

describe('AdminCalendarHeaderComponent', () => {
  let component: AdminCalendarHeaderComponent;
  let fixture: ComponentFixture<AdminCalendarHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCalendarHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCalendarHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
