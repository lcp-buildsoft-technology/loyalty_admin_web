import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingvenueformComponent } from './bookingvenueform.component';

describe('BookingvenueformComponent', () => {
  let component: BookingvenueformComponent;
  let fixture: ComponentFixture<BookingvenueformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingvenueformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingvenueformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
