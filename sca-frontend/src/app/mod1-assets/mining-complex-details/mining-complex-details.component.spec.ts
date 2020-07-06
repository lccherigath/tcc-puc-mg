import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiningComplexDetailsComponent } from './mining-complex-details.component';

describe('MiningComplexDetailsComponent', () => {
  let component: MiningComplexDetailsComponent;
  let fixture: ComponentFixture<MiningComplexDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiningComplexDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiningComplexDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
