import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardscanComponent } from './rewardscan.component';

describe('RewardscanComponent', () => {
  let component: RewardscanComponent;
  let fixture: ComponentFixture<RewardscanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardscanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardscanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
