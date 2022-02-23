import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingeventhistorydetailsComponent } from './bookingeventhistorydetails.component';

describe('BookingeventhistorydetailsComponent', () => {
  let component: BookingeventhistorydetailsComponent;
  let fixture: ComponentFixture<BookingeventhistorydetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingeventhistorydetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingeventhistorydetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
