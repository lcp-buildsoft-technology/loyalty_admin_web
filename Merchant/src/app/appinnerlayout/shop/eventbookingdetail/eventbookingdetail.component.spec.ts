import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventbookingdetailComponent } from './eventbookingdetail.component';

describe('EventbookingdetailComponent', () => {
  let component: EventbookingdetailComponent;
  let fixture: ComponentFixture<EventbookingdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventbookingdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventbookingdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
