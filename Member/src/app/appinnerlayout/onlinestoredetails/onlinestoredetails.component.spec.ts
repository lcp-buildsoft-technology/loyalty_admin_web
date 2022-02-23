import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlinestoredetailsComponent } from './onlinestoredetails.component';

describe('OnlinestoredetailsComponent', () => {
  let component: OnlinestoredetailsComponent;
  let fixture: ComponentFixture<OnlinestoredetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlinestoredetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlinestoredetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
