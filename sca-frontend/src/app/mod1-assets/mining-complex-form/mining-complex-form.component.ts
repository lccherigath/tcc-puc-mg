import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { ConfirmationService } from 'primeng/api';

import { MiningComplex } from 'src/app/shared/models/mining-complex';
import { Structure } from 'src/app/shared/models/structure';
import { FederatedUnitService } from 'src/app/shared/services/federated-unit.service';
import { ToastMessageService } from 'src/app/shared/services/toast-message.service';
import { ValueLabelsService } from 'src/app/shared/services/value-labels.service';
import { MiningComplexService } from 'src/app/shared/services/mining-complex.service';

import * as L from 'leaflet';


@Component({
  selector: 'app-mining-complex-form',
  templateUrl: './mining-complex-form.component.html',
  styleUrls: ['./mining-complex-form.component.scss']
})
export class MiningComplexFormComponent implements OnInit {

  formMiningComplex: FormGroup;

  displayDialogStructures = false;
  displayDialogEquipments = false;
  displayMap = false;
  operationalSituationTypes: any;
  structures: any;
  structureIndex: number;
  currentStructure: Structure;

  equipments = [];

  ufList: any;
  cityList: any;
  selectedUF: string;
  selectedUFgeojson: any;
  geojsonBounds: any;
  miningComplexLatLng = null;

  constructor(
    private formBuilder: FormBuilder,
    private federatedUnitService: FederatedUnitService,
    private miningComplexService: MiningComplexService,
    private toastMessageService: ToastMessageService,
    private valueLabelsService: ValueLabelsService,
    private confirmationService: ConfirmationService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.federatedUnitService.getUF().subscribe(
      ibgeData => this.ufList = ibgeData
    );

    this.operationalSituationTypes = this.valueLabelsService.getOperationalSituation();
    this.structures = [];

    this.createForm(new MiningComplex());
  }

  createForm = (miningComplex: MiningComplex) =>
    this.formMiningComplex = this.formBuilder.group({
      id: [miningComplex.id],
      nome: [miningComplex.nome, Validators.maxLength(250)],
      uf: [miningComplex.uf, Validators.required],
      // municipio: [{value: miningComplex.municipio, disabled: true}, Validators.required],
      municipio: [miningComplex.municipio, Validators.required],
      situacao_operacional: [miningComplex.situacao_operacional, Validators.required],
      lat_long: [miningComplex.lat_long],
      // lat_long: [this.miningComplexLatLng, Validators.required],
      estruturas: [miningComplex.estruturas],
      ativos: [miningComplex.ativos]
    });

  hasError = (field: string) => this.formMiningComplex.get(field).errors;

  fieldTouched = (field: string) => this.formMiningComplex.get(field).touched;

  fieldDirty = (field: string) => this.formMiningComplex.get(field).dirty;

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
    const citySplit = e.split(',');
    this.federatedUnitService.getCityGeoJSON(this.selectedUF).subscribe(
      (geojson: any) => {
        // this.selectedUFgeojson = geojson;
        this.selectedUFgeojson = geojson.features.filter(
          element => element.properties.id === citySplit[0]
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
    this.currentStructure = null;

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
    this.currentStructure = null;
    // this.miningComplex.estruturas = this.structures;
    // console.log(structure);
  }

  getOperationalSituationLabel = (value: number) => {
    const label = this.operationalSituationTypes.find(
      (element: any) => element.value === value
    );
    return label.label;
  }

  showDialogEdit(event: Event, structure: Structure) {
    this.showDialog();
    this.structureIndex = this.structures.indexOf(structure);
    this.currentStructure = { ... structure };
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

  receiveEquipment = (equipment: any, newQt?: number) => {
    const equipmentExists = this.equipments.find(
      (element: any) => element.assetId === equipment.assetId
    );
    if (equipmentExists) {
      const index = this.equipments.indexOf(equipmentExists);
      this.equipments[index].qt = newQt ? +newQt : equipment.qt;
    } else {
      this.equipments.push(equipment);
    }
    // console.log(this.equipments);
  }

  onSubmit = () => {
    if (this.formMiningComplex.valid) {
      this.formMiningComplex.value.lat_long = this.miningComplexLatLng;
      this.formMiningComplex.value.estruturas = this.structures;
      this.formMiningComplex.value.ativos = this.equipments;
      this.formMiningComplex.value.uf = this.formMiningComplex.value.uf.split(',')[1];
      this.formMiningComplex.value.municipio = this.formMiningComplex.value.municipio.split(',')[1];
      console.log(this.formMiningComplex.value);

      this.miningComplexService.save(this.formMiningComplex.value).subscribe(
        success => {
          this.toastMessageService.showMessage('success', '', `${this.formMiningComplex.value.id ? 'Atualizado' : 'Criado'} com sucesso!`);
          this.location.back();
        },
        error => {
          this.toastMessageService.showMessage('error', `Erro ${error.status}`, error.statusText);
          // console.error(error);
        }
      );
      // this.formMiningComplex.reset();
    }
  }

  onCancel = () => {
    // this.submitted = false;
    this.formMiningComplex.reset();
    this.structures = [];
    this.equipments = [];
    this.miningComplexLatLng = undefined;
  }
}
