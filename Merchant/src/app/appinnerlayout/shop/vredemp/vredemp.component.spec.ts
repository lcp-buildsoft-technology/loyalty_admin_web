import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VredempComponent } from './vredemp.component';

describe('VredempComponent', () => {
  let component: VredempComponent;
  let fixture: ComponentFixture<VredempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VredempComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VredempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
