import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedemptiondetailsComponent } from './redemptiondetails.component';

describe('RedemptiondetailsComponent', () => {
  let component: RedemptiondetailsComponent;
  let fixture: ComponentFixture<RedemptiondetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedemptiondetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedemptiondetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
