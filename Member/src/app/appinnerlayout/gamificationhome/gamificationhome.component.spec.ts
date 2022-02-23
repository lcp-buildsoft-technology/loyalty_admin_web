import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamificationhomeComponent } from './gamificationhome.component';

describe('GamificationhomeComponent', () => {
  let component: GamificationhomeComponent;
  let fixture: ComponentFixture<GamificationhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamificationhomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamificationhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
