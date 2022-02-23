import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingeventpaymentComponent } from './bookingeventpayment.component';

describe('BookingeventpaymentComponent', () => {
  let component: BookingeventpaymentComponent;
  let fixture: ComponentFixture<BookingeventpaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingeventpaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingeventpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
