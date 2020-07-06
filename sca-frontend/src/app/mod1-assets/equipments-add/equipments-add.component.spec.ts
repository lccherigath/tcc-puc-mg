import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentsAddComponent } from './equipments-add.component';

describe('EquipmentsAddComponent', () => {
  let component: EquipmentsAddComponent;
  let fixture: ComponentFixture<EquipmentsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
