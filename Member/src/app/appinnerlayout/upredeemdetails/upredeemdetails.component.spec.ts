import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpredeemdetailsComponent } from './upredeemdetails.component';

describe('UpredeemdetailsComponent', () => {
  let component: UpredeemdetailsComponent;
  let fixture: ComponentFixture<UpredeemdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpredeemdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpredeemdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
