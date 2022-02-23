import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointredemptionhomeComponent } from './pointredemptionhome.component';

describe('PointredemptionhomeComponent', () => {
  let component: PointredemptionhomeComponent;
  let fixture: ComponentFixture<PointredemptionhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointredemptionhomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointredemptionhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
