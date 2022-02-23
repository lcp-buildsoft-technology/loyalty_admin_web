import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfirstoutletComponent } from './addfirstoutlet.component';

describe('AddfirstoutletComponent', () => {
  let component: AddfirstoutletComponent;
  let fixture: ComponentFixture<AddfirstoutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddfirstoutletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddfirstoutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
