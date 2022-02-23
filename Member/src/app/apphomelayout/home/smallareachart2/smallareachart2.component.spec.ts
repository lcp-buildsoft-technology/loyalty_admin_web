import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Smallareachart2Component } from './smallareachart2.component';

describe('Smallareachart2Component', () => {
  let component: Smallareachart2Component;
  let fixture: ComponentFixture<Smallareachart2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Smallareachart2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Smallareachart2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
