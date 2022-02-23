import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarnmorepointsComponent } from './earnmorepoints.component';

describe('EarnmorepointsComponent', () => {
  let component: EarnmorepointsComponent;
  let fixture: ComponentFixture<EarnmorepointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EarnmorepointsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EarnmorepointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
