/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditadsComponent } from './editads.component';

describe('EditadsComponent', () => {
  let component: EditadsComponent;
  let fixture: ComponentFixture<EditadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
