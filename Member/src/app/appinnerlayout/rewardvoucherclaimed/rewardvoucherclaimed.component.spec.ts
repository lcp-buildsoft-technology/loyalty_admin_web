import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardvoucherclaimedComponent } from './rewardvoucherclaimed.component';

describe('RewardvoucherclaimedComponent', () => {
  let component: RewardvoucherclaimedComponent;
  let fixture: ComponentFixture<RewardvoucherclaimedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardvoucherclaimedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardvoucherclaimedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
