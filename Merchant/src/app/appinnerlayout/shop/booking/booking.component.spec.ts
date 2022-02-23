import { ComponentFixture, TestBed } from '@angular/core/testing';

import { bookingComponent } from './booking.component';

describe('bookingComponent', () => {
  let component: bookingComponent;
  let fixture: ComponentFixture<bookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ bookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(bookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
