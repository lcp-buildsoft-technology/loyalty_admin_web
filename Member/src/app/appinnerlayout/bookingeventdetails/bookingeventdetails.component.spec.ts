import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingeventdetailsComponent } from './bookingeventdetails.component';

describe('BookingeventdetailsComponent', () => {
  let component: BookingeventdetailsComponent;
  let fixture: ComponentFixture<BookingeventdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingeventdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingeventdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
