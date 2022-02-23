import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookinghistorydetailsComponent } from './bookinghistorydetails.component';

describe('BookinghistorydetailsComponent', () => {
  let component: BookinghistorydetailsComponent;
  let fixture: ComponentFixture<BookinghistorydetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookinghistorydetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookinghistorydetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
