import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedemptionpendingComponent } from './redemptionpending.component';

describe('RedemptionpendingComponent', () => {
  let component: RedemptionpendingComponent;
  let fixture: ComponentFixture<RedemptionpendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedemptionpendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedemptionpendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
