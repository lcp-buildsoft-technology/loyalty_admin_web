import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletsettingsComponent } from './outletsettings.component';

describe('OutletsettingsComponent', () => {
  let component: OutletsettingsComponent;
  let fixture: ComponentFixture<OutletsettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutletsettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutletsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
