/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditmcFAQComponent } from './editmcFAQ.component';

describe('EditmcFAQComponent', () => {
  let component: EditmcFAQComponent;
  let fixture: ComponentFixture<EditmcFAQComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditmcFAQComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditmcFAQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
