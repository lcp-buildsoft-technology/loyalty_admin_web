import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsettingsComponent } from './bookingsettings.component';

describe('BookingsettingsComponent', () => {
  let component: BookingsettingsComponent;
  let fixture: ComponentFixture<BookingsettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingsettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
