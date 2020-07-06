import { Component, OnInit, Input } from '@angular/core';

import * as L from 'leaflet';
const iconRetinaUrl = 'assets/img/marker-icon-2x.png';
const iconUrl = 'assets/img/marker-icon.png';
const shadowUrl = 'assets/img/marker-shadow.png';

const iconDefaultOptions = {
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
};

const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  ...iconDefaultOptions
});
L.Marker.prototype.options.icon = iconDefault;

// const iconMinOptions = { iconSize: [18, 29], shadowSize: [29, 29] };
// const iconDanger = L.icon({
//   iconRetinaUrl: 'assets/danger-marker-icon-2x.png',
//   iconUrl: 'assets/danger-marker-icon.png',
//   shadowUrl,
//   ...iconDefaultOptions,
//   ...iconMinOptions
// });
// L.Marker.prototype.options.icon = iconDanger;

// const iconWarning = L.icon({
//   iconRetinaUrl: 'assets/warning-marker-icon-2x.png',
//   iconUrl: 'assets/warning-marker-icon.png',
//   shadowUrl,
//   ...iconDefaultOptions,
//   ...iconMinOptions
// });
// L.Marker.prototype.options.icon = iconWarning;


@Component({
  selector: 'app-map-create-point',
  templateUrl: './map-create-point.component.html',
  styleUrls: ['./map-create-point.component.scss']
})
export class MapCreatePointComponent implements OnInit {

  @Input() geojsonLayer: any;
  leafletMap: any;
  geoJSON: any;
  prevLayerClicked = null;

  // @Input() containerId: string;
  @Input() data: any;

  constructor() { }

  ngOnInit(): void {

    // Dados *******
    const points = this.createPoints(this.data);
    const pointsLayer = L.layerGroup(points);
    // *************

    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    const openStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      detectRetina: true,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    // }).addTo(this.leafletMap);

    // L.tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
    const wikimedia = L.tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
      detectRetina: true,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    // }).addTo(this.leafletMap);


    this.geoJSON = L.geoJSON(this.geojsonLayer, {
      style: this.style,
      onEachFeature: this.onEachFeature
    });
    // }).addTo(this.leafletMap);

    const baseMaps = {
      Wikimedia: wikimedia,
      'Open Street Map': openStreetMap
    };


    const overlayMaps = {
      'Brasil - Divisão Estadual': this.geoJSON,
      // '<span style="color: red">Casos Confirmados (mapa de calor)</span>': heat
      'Complexos Minerários': pointsLayer
    };
    // ******

    this.leafletMap = L.map(
      'mappoint', // this.containerId, // mapid
      {
        zoomControl: false,
        layers: [wikimedia, this.geoJSON, pointsLayer],
        minZoom: 3,
        // maxZoom: 13
      }
    ).setView([-15.5301578, -54.8935292], 4);

    L.control.zoom({
      position: 'bottomright'
    }).addTo(this.leafletMap);

    L.control.layers(
      // {},
      baseMaps,
      overlayMaps,
      {position: 'topleft'}
    ).addTo(this.leafletMap);

  }


  style = (feature) => (
    {
      color: '#fff',
      // fillColor: '#414141',
      fillColor: '#000',
      weight: 2,
      opacity: 1,
      // fillOpacity: 1
      fillOpacity: .2
    }
  )

  clickArea = (e) => {
    this.zoomProcess(e.target, null);
  }

  onEachFeature = (feature, layer) => {
    layer.on(
      {
        click: this.clickArea
      }
    );
  }

  zoomProcess = (layer, id0?) => {
    if (this.prevLayerClicked !== null) {
      // this.prevLayerClicked.setStyle({ fillColor: '#414141' });
      this.prevLayerClicked.setStyle({ fillOpacity: .2 });
    }

    if (id0 !== 0) {
      // const l = layer.feature.properties;
      // this.selectedIdRA = l.ra_num;
      // this.infoBox.update(
      //   l.nome,
      //   this.countCasesPerRA(l.ra_num),
      //   this.nConfirmed.found,
      //   null,
      //   null,
      //   null,
      //   null
      // );
      this.leafletMap.fitBounds(layer.getBounds());
      // layer.setStyle({ fillColor: '#2e2e2e' });
      layer.setStyle({ fillOpacity: .5 });
      this.prevLayerClicked = layer;

    } else {
      // this.infoBoxUpdateDF();
      this.leafletMap.setView([-15.78828916397262, -47.8289794921875], 10);
    }
  }

  changeRA = (idRA) => {
    const layers = this.geoJSON.getLayers();
    const layer = layers.filter(
      l => l.feature.properties.ra_num === +idRA
    );
    this.zoomProcess(layer[0], +idRA);
  }

  createPoints = (arrayData: []) => {
    const points = [];
    arrayData.forEach((element: any) => {
      points.push(
        L.marker(element.lat_long, { icon: iconDefault })
          .on('click', this.clickMarker)
          .bindPopup(
            `<strong>${element.nome}</strong><br>${element.municipio}-${element.uf}`,
            { className: 'popupCustom' }
          )
      );
    });
    return points;
  }

  clickMarker = (e) => {
    // console.log(e);
    // this.leafletMap.fitBounds(
    //   L.latLngBounds( [e.target.getLatLng()] )
    // );
  }

}
