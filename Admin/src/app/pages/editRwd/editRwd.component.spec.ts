/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditRwdComponent } from './editRwd.component';

describe('EditRwdComponent', () => {
  let component: EditRwdComponent;
  let fixture: ComponentFixture<EditRwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
