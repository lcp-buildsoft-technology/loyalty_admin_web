import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarnpointsdetailsComponent } from './earnpointsdetails.component';

describe('EarnpointsdetailsComponent', () => {
  let component: EarnpointsdetailsComponent;
  let fixture: ComponentFixture<EarnpointsdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EarnpointsdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EarnpointsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
