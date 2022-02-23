import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Smallareachart1Component } from './smallareachart1.component';

describe('Smallareachart1Component', () => {
  let component: Smallareachart1Component;
  let fixture: ComponentFixture<Smallareachart1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Smallareachart1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Smallareachart1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
