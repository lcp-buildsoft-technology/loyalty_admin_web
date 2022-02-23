/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GsFAQComponent } from './gsFAQ.component';

describe('GsFAQComponent', () => {
  let component: GsFAQComponent;
  let fixture: ComponentFixture<GsFAQComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GsFAQComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GsFAQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
