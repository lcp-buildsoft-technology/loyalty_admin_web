/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditRwdVchComponent } from './editRwdVch.component';

describe('EditRwdVchComponent', () => {
  let component: EditRwdVchComponent;
  let fixture: ComponentFixture<EditRwdVchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRwdVchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRwdVchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
