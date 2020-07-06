import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiningComplexScheduleComponent } from './mining-complex-schedule.component';

describe('MiningComplexScheduleComponent', () => {
  let component: MiningComplexScheduleComponent;
  let fixture: ComponentFixture<MiningComplexScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiningComplexScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiningComplexScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
