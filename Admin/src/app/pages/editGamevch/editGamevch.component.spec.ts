/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditGamevchComponent } from './editGamevch.component';

describe('EditGamevchComponent', () => {
  let component: EditGamevchComponent;
  let fixture: ComponentFixture<EditGamevchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGamevchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGamevchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
