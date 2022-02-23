import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralrewardshomeComponent } from './referralrewardshome.component';

describe('ReferralrewardshomeComponent', () => {
  let component: ReferralrewardshomeComponent;
  let fixture: ComponentFixture<ReferralrewardshomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferralrewardshomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralrewardshomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
