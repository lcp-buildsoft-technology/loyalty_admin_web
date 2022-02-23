/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditFAQComponent } from './editFAQ.component';

describe('EditFAQComponent', () => {
  let component: EditFAQComponent;
  let fixture: ComponentFixture<EditFAQComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFAQComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFAQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
