import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherpendingdetailsComponent } from './voucherpendingdetails.component';

describe('VoucherpendingdetailsComponent', () => {
  let component: VoucherpendingdetailsComponent;
  let fixture: ComponentFixture<VoucherpendingdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoucherpendingdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherpendingdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
