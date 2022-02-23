/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddmcFAQComponent } from './addmcFAQ.component';

describe('AddmcFAQComponent', () => {
  let component: AddmcFAQComponent;
  let fixture: ComponentFixture<AddmcFAQComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmcFAQComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmcFAQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
