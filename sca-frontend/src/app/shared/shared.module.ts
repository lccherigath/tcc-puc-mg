import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletMapComponent } from './components/leaflet-map/leaflet-map.component';
import { ErrorComponent } from './components/error/error.component';
import { LoadingComponent } from './components/loading/loading.component';


@NgModule({
  declarations: [LeafletMapComponent, ErrorComponent, LoadingComponent],
  imports: [
    CommonModule
  ],
  exports: [LeafletMapComponent, ErrorComponent, LoadingComponent]
})
export class SharedModule { }
