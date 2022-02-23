import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenuecanceldetailsComponent } from './venuecanceldetails.component';

describe('VenuecanceldetailsComponent', () => {
  let component: VenuecanceldetailsComponent;
  let fixture: ComponentFixture<VenuecanceldetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenuecanceldetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VenuecanceldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
