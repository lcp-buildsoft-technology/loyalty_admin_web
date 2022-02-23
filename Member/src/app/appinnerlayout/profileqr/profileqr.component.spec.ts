import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileqrComponent } from './profileqr.component';

describe('ProfileqrComponent', () => {
  let component: ProfileqrComponent;
  let fixture: ComponentFixture<ProfileqrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileqrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileqrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
