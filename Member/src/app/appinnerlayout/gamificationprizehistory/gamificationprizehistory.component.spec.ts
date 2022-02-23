import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamificationprizehistoryComponent } from './gamificationprizehistory.component';

describe('GamificationprizehistoryComponent', () => {
  let component: GamificationprizehistoryComponent;
  let fixture: ComponentFixture<GamificationprizehistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamificationprizehistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamificationprizehistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
