/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MembertransactcollectComponent } from './membertransactcollect.component';

describe('MembertransactcollectComponent', () => {
  let component: MembertransactcollectComponent;
  let fixture: ComponentFixture<MembertransactcollectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembertransactcollectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembertransactcollectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
