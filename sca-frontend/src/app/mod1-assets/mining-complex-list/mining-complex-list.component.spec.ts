import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiningComplexListComponent } from './mining-complex-list.component';

describe('MiningComplexListComponent', () => {
  let component: MiningComplexListComponent;
  let fixture: ComponentFixture<MiningComplexListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiningComplexListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiningComplexListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
