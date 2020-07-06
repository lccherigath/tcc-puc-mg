import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiningComplexFormComponent } from './mining-complex-form.component';

describe('MiningComplexFormComponent', () => {
  let component: MiningComplexFormComponent;
  let fixture: ComponentFixture<MiningComplexFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiningComplexFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiningComplexFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
