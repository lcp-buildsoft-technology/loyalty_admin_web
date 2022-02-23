/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OthersettingComponent } from './othersetting.component';

describe('OthersettingComponent', () => {
  let component: OthersettingComponent;
  let fixture: ComponentFixture<OthersettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OthersettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OthersettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
