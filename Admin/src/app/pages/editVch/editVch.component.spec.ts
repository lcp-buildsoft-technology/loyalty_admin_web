/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditVchComponent } from './editVch.component';

describe('EditVchComponent', () => {
  let component: EditVchComponent;
  let fixture: ComponentFixture<EditVchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
