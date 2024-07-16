import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhereComponent } from './where.component';

describe('WhereComponent', () => {
  let component: WhereComponent;
  let fixture: ComponentFixture<WhereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhereComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WhereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
