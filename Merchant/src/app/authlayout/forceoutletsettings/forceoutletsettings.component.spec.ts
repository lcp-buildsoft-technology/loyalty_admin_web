import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForceoutletsettingsComponent } from './forceoutletsettings.component';

describe('ForceoutletsettingsComponent', () => {
  let component: ForceoutletsettingsComponent;
  let fixture: ComponentFixture<ForceoutletsettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForceoutletsettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForceoutletsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
