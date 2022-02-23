import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilescanComponent } from './profilescan.component';

describe('ProfilescanComponent', () => {
  let component: ProfilescanComponent;
  let fixture: ComponentFixture<ProfilescanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilescanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilescanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
