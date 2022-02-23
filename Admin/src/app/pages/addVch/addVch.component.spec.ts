/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddVchComponent } from './addVch.component';

describe('AddVchComponent', () => {
  let component: AddVchComponent;
  let fixture: ComponentFixture<AddVchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
