import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardvoucherscanComponent } from './rewardvoucherscan.component';

describe('RewardvoucherscanComponent', () => {
  let component: RewardvoucherscanComponent;
  let fixture: ComponentFixture<RewardvoucherscanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardvoucherscanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardvoucherscanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
