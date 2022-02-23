import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingvenuelistComponent } from './bookingvenuelist.component';

describe('BookingvenuelistComponent', () => {
  let component: BookingvenuelistComponent;
  let fixture: ComponentFixture<BookingvenuelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingvenuelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingvenuelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
