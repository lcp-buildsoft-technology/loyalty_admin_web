import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingvenuehomeComponent } from './bookingvenuehome.component';

describe('BookingvenuehomeComponent', () => {
  let component: BookingvenuehomeComponent;
  let fixture: ComponentFixture<BookingvenuehomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingvenuehomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingvenuehomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
