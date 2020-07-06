import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletMapComponent } from './components/leaflet-map/leaflet-map.component';
import { MapCreatePointComponent } from './components/map-create-point/map-create-point.component';



@NgModule({
  declarations: [LeafletMapComponent, MapCreatePointComponent],
  imports: [
    CommonModule
  ],
  exports: [LeafletMapComponent, MapCreatePointComponent]
})
export class SharedModule { }
