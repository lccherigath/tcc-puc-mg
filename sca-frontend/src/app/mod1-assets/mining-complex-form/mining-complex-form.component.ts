import { Component, OnInit } from '@angular/core';

import { ConfirmationService } from 'primeng/api';

import { MiningComplex } from 'src/app/shared/models/mining-complex';
import { Structure } from 'src/app/shared/models/structure';
import { FederatedUnitService } from 'src/app/shared/services/federated-unit.service';
import { ToastMessageService } from 'src/app/shared/services/toast-message.service';
import { ValueLabelsService } from 'src/app/shared/services/value-labels.service';

import * as L from 'leaflet';


@Component({
  selector: 'app-mining-complex-form',
  templateUrl: './mining-complex-form.component.html',
  styleUrls: ['./mining-complex-form.component.scss']
})
export class MiningComplexFormComponent implements OnInit {

  displayDialogStructures = false;
  displayDialogEquipments = false;
  displayMap = false;
  operationalSituationTypes: any;
  miningComplex = new MiningComplex();
  structures: any;
  structureIndex: number;
  actualStructure: Structure;

  ufList: any;
  cityList: any;
  selectedUF: string;
  selectedUFgeojson: any;
  geojsonBounds: any;
  miningComplexLatLng: any;

  constructor(
    private federatedUnitService: FederatedUnitService,
    private toastMessageService: ToastMessageService,
    private valueLabelsService: ValueLabelsService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.federatedUnitService.getUF().subscribe(
      ibgeData => this.ufList = ibgeData
    );

    this.operationalSituationTypes = this.valueLabelsService.getOperationalSituation();
    this.structures = [];
  }

  ufSelect = (e) => {
    // console.log(e);
    const ufSplit = e.split(',');
    this.selectedUF = ufSplit[0];
    this.federatedUnitService.getCity(this.selectedUF).subscribe(
      cities => this.cityList = cities,
      error => this.toastMessageService.showMessage('error', '', 'Não foi possível carregar a lista de Unidades Federativas')
    );
    this.displayMap = false;
  }

  citySelect = (e) => {
    // console.log(e);
    this.federatedUnitService.getCityGeoJSON(this.selectedUF).subscribe(
      (geojson: any) => {
        // this.selectedUFgeojson = geojson;
        this.selectedUFgeojson = geojson.features.filter(
          element => element.properties.id === e
        );
        this.geojsonBounds = L.geoJSON(this.selectedUFgeojson).getBounds();
      },
      error => this.toastMessageService.showMessage('error', '', `Não foi possível carregar o mapa do município`)
    );
  }

  showDialogEquipments() {
    this.displayDialogEquipments = true;
  }

  showDialog() {
    this.structureIndex = null;
    this.actualStructure = null;

    this.displayDialogStructures = true;
  }

  receiveLatLng = (latLng) => this.miningComplexLatLng = latLng;

  receiveStructure = (structure: Structure) => {
    if ((this.structureIndex && this.structureIndex >= 0) || this.structureIndex === 0) {
      this.structures[this.structureIndex] = { ... structure };
    } else {
      this.structures.push(structure);
    }
    this.structureIndex = null;
    this.actualStructure = null;
    // this.miningComplex.estruturas = this.structures;
    // console.log(this.miningComplex.estruturas);
  }

  getOperationalSituationLabel = (value: number) => {
    const label = this.operationalSituationTypes.filter(
      (element: any) => element.value === value
    );
    return label[0].label;
  }

  showDialogEdit(event: Event, structure: Structure) {
    this.showDialog();
    this.structureIndex = this.structures.indexOf(structure);
    this.actualStructure = { ... structure };
    event.preventDefault();
  }

  confirmDeletion(event: Event, structure: Structure) {
    this.confirmationService.confirm({
      message: 'Tem certeza de que deseja remover este item?',
      accept: () => {
        this.structures.splice(
          this.structures.indexOf(structure), 1
        );
        // console.log();
        event.preventDefault();
      }
    });
  }
}
