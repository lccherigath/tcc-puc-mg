import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

// import { map, switchMap } from 'rxjs/operators';

import { ToastMessageService } from 'src/app/shared/services/toast-message.service';
// import { ExampleService } from 'src/app/shared/services/example.service';
import { ValueLabelsService } from 'src/app/shared/services/value-labels.service';

import { Structure } from 'src/app/shared/models/structure';

@Component({
  selector: 'app-structure-form',
  templateUrl: './structure-form.component.html',
  styleUrls: ['./structure-form.component.scss']
})
export class StructureFormComponent implements OnInit, OnChanges {

  formStructure: FormGroup;
  structureTypes: any;
  levels: any;
  emergencyLevels: any;
  operationalSituationTypes: any;
  @Output() emitStructure = new EventEmitter();
  @Input() structureEdit: Structure;

  constructor(
    private formBuilder: FormBuilder,
    // private location: Location,
    // private activatedRoute: ActivatedRoute,
    // private toastMessageService: ToastMessageService,
    private valueLabelsService: ValueLabelsService
    // private exampleService: ExampleService
  ) {}

  ngOnInit(): void {

    this.structureTypes = this.valueLabelsService.getStructureTypes();
    this.levels = this.valueLabelsService.getLevels();
    this.emergencyLevels = this.valueLabelsService.getEmergencyLevels();
    this.operationalSituationTypes = this.valueLabelsService.getOperationalSituation();

    this.createForm(new Structure());
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes.structureEdit.currentValue);
    if (this.structureEdit) {
      // console.log(this.structureEdit);
      this.updateForm(changes.structureEdit.currentValue);
    } else if (this.formStructure) {
      this.onCancel();
    }
  }

  createForm = (structure: Structure) =>
    (this.formStructure = this.formBuilder.group({
      id: [structure.id],
      tipo: [structure.tipo, [Validators.required]],
      descricao: [structure.descricao, [Validators.minLength(5), Validators.maxLength(250)]],
      inserida_pnsb: [structure.inserida_pnsb],
      dpa: [structure.dpa, Validators.required],
      cri: [structure.cri, Validators.required],
      paemb_url: [structure.paemb_url],
      nivel_emergencia: [structure.nivel_emergencia, Validators.required],
      situacao_operacional: [structure.situacao_operacional, Validators.required]
    }))

  updateForm = (structure: Structure) =>
    this.formStructure.patchValue({
      ... structure
    })

  hasError = (field: string) => this.formStructure.get(field).errors;

  fieldTouched = (field: string) => this.formStructure.get(field).touched;

  fieldDirty = (field: string) => this.formStructure.get(field).dirty;

  onSubmit = () => {
    if (this.formStructure.valid) {
      if (!this.formStructure.value.inserida_pnsb) {
        this.formStructure.value.inserida_pnsb = false;
      }
      // console.log(this.formStructure.value);
      this.emitStructure.emit(this.formStructure.value);
      this.formStructure.reset();
    }
  }

  onCancel = () => {
    // this.submitted = false;
    this.formStructure.reset();
  }

}
