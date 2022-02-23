import { ComponentFixture, TestBed } from '@angular/core/testing';

import { redemptionComponent } from './redemption.component';

describe('redemptionComponent', () => {
  let component: redemptionComponent;
  let fixture: ComponentFixture<redemptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ redemptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(redemptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
