import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarnpointsclaimedComponent } from './earnpointsclaimed.component';

describe('EarnpointsclaimedComponent', () => {
  let component: EarnpointsclaimedComponent;
  let fixture: ComponentFixture<EarnpointsclaimedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EarnpointsclaimedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EarnpointsclaimedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
