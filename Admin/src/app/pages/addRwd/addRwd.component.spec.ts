/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddRwdComponent } from './addRwd.component';

describe('AddRwdComponent', () => {
  let component: AddRwdComponent;
  let fixture: ComponentFixture<AddRwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
