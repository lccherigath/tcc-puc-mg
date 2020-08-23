import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, Subject, empty } from 'rxjs';
import { catchError, map, tap, take, delay } from 'rxjs/operators';

import { MiningComplexService } from 'src/app/shared/services/mining-complex.service';
import { MiningProcessService } from 'src/app/shared/services/mining-process.service';
import { ToastMessageService } from 'src/app/shared/services/toast-message.service';
import { ValueLabelsService } from 'src/app/shared/services/value-labels.service';
import { MiningComplex } from 'src/app/shared/models/mining-complex';
import { Structure } from 'src/app/shared/models/structure';

import * as L from 'leaflet';
import { BRAZIL_GEOJSON } from 'src/app/shared/components/leaflet-map/brazil-geojson';

@Component({
  selector: 'app-mining-complex-details',
  templateUrl: './mining-complex-details.component.html',
  styleUrls: ['./mining-complex-details.component.scss']
})
export class MiningComplexDetailsComponent implements OnInit {

  constructor(
    private miningComplexService: MiningComplexService,
    private miningProcessService: MiningProcessService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastMessageService,
    private valueLabelsService: ValueLabelsService,
  ) { }

  miningComplexProduction$: Observable<any>;

  miningComplexItem$: Observable<MiningComplex>;
  error$ = new Subject<boolean>();
  miningComplexName: string;
  miningComplexId: number;

  brazilGeoJSON = BRAZIL_GEOJSON;
  geojsonBounds: any;
  miningComplexItem: MiningComplex;

  tooltipText =
    `DPA: Dano Potencial Associado
     CRI: Categoria de Risco
     NE: Nível de Emergência`;

  displayDialogStructures = false;
  displayDialogEquipments = false;
  currentStructure: Structure;

  currentBtnEquipmentId: string;
  currentInputEquipmentId: string;
  currentInputEquipmentValue: number;

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params: any) => {
      this.miningComplexId = params.id;
      // console.log(id);
      this.geojsonBounds = L.geoJSON(this.brazilGeoJSON).getBounds();

      this.loadData();

      this.miningComplexProduction$ = this.miningProcessService.productionObservable.pipe(
        take(1)
      );
    });
  }

  loadData = () => {
    this.miningComplexItem$ = this.miningComplexService
      .loadById(this.miningComplexId)
      .pipe(
        // map((data: any) => this.miningComplexItem = data.results),
        // tap(console.log),
        // delay(1000),
        tap(ev => this.miningComplexName = ev.nome),
        catchError(error => {
          this.toastr.showMessage('error', '', 'Erro ao buscar dados no servidor');
          this.error$.next(true);
          return empty();
        })
      );
  }

  selectBadgeClass = (value: number) => {
    switch (value) {
      case 0:
        return 'badge-secondary';
      case 1:
        return 'badge-success';
      case 2:
        return 'badge-warning';
      case 3:
        return 'badge-danger';
      default:
        return 'badge-secondary';
    }
  }

  selectLabelLevel = (value: number, levelType?: string) => {
    if (levelType === 'emergency') {
      return this.valueLabelsService.getEmergencyLevels().find(
        element => element.value === value
      ).label;
    }
    return this.valueLabelsService
      .getLevels()
      .find((element) => element.value === value).label;
  }

  selectOperationalSituationLabel = (code: number) => this.valueLabelsService.operationalSituationFormat(code);

  enableInput = (inputId: string, buttonId: string, equipmentId: number, defaultQuantity: number) => {
    if (this.currentBtnEquipmentId === buttonId) {
      const value = document.getElementById(inputId)['value'];
      // console.log('qt: ' + value, 'equipamento: ' + equipmentId, 'mineradora: ' + this.miningComplexId);
      this.miningComplexService.updateEquipment({
        miningComplexId: +this.miningComplexId,
        assetId: +equipmentId,
        qt: +value
      }).subscribe(
        success => {
          document.getElementById(inputId)['disabled'] = true;
          this.currentBtnEquipmentId = null;
          this.currentInputEquipmentId = null;
          this.currentInputEquipmentValue = null;
          this.loadData();
          this.toastr.showMessage('success', '', 'Atualização realizada com sucesso.');
        },
        error => this.toastr.showMessage('error', '', `Não foi possível realizar a alteração. ${error.error.message}`)
      );

    } else {
      if (this.currentInputEquipmentId) {
        document.getElementById(this.currentInputEquipmentId)['value'] = this.currentInputEquipmentValue;
        document.getElementById(this.currentInputEquipmentId)['disabled'] = true;
      }
      document.getElementById(inputId)['disabled'] = false;
      document.getElementById(inputId).focus();
      this.currentInputEquipmentId = inputId;
      this.currentInputEquipmentValue = defaultQuantity;
      this.currentBtnEquipmentId = buttonId;
    }
  }

  receiveStructure = (structure: Structure) => {
    // console.log(structure);
    structure.complexo_minerario_id = this.miningComplexId;
    this.miningComplexService.saveStructure(structure).subscribe(
      success => {
        this.loadData();
        this.toastr.showMessage('success', '', 'Operação realizada com sucesso.');
      },
      error => this.toastr.showMessage('error', '', 'Não foi possível realizar a operação.')
    );
  }

  receiveEquipment = (equipment: any) => {
    // console.log(equipment);
    this.miningComplexService.updateEquipment({
      miningComplexId: +this.miningComplexId,
      assetId: equipment.assetId,
      qt: equipment.qt
    }).subscribe(
      success => {
        this.loadData();
        this.toastr.showMessage('success', '', 'Atualização realizada com sucesso.');
      },
      error => this.toastr.showMessage('error', '', `Não foi possível realizar a alteração. ${error.error.message}`)
    );
  }

  showDialogStructureEdit = (structure: Structure) => {
    this.displayDialogStructures = true;
    this.currentStructure = structure;
    // console.log(structure);
  }

}
