import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventcontactdialogComponent } from './eventcontactdialog.component';

describe('EventcontactdialogComponent', () => {
  let component: EventcontactdialogComponent;
  let fixture: ComponentFixture<EventcontactdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventcontactdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventcontactdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
