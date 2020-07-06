import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapCreatePointComponent } from './map-create-point.component';

describe('MapCreatePointComponent', () => {
  let component: MapCreatePointComponent;
  let fixture: ComponentFixture<MapCreatePointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapCreatePointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapCreatePointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
