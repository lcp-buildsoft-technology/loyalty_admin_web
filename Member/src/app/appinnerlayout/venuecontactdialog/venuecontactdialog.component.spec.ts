import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenuecontactdialogComponent } from './venuecontactdialog.component';

describe('VenuecontactdialogComponent', () => {
  let component: VenuecontactdialogComponent;
  let fixture: ComponentFixture<VenuecontactdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenuecontactdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VenuecontactdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
