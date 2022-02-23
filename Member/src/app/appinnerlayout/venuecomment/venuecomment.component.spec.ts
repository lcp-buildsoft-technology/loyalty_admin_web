import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenuecommentComponent } from './venuecomment.component';

describe('VenuecommentComponent', () => {
  let component: VenuecommentComponent;
  let fixture: ComponentFixture<VenuecommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenuecommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VenuecommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
