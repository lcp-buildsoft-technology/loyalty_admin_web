import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsvoucherdetailsComponent } from './rewardsvoucherdetails.component';

describe('RewardsvoucherdetailsComponent', () => {
  let component: RewardsvoucherdetailsComponent;
  let fixture: ComponentFixture<RewardsvoucherdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardsvoucherdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsvoucherdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
