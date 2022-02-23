import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingvenuedetailsComponent } from './bookingvenuedetails.component';

describe('BookingvenuedetailsComponent', () => {
  let component: BookingvenuedetailsComponent;
  let fixture: ComponentFixture<BookingvenuedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingvenuedetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingvenuedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
