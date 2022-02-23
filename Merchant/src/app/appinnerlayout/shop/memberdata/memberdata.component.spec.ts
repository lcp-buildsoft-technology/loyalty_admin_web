import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberdataComponent } from './memberdata.component';

describe('MemberdataComponent', () => {
  let component: MemberdataComponent;
  let fixture: ComponentFixture<MemberdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
