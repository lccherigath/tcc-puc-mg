import { Component, OnInit, Input, SimpleChanges, OnChanges, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Asset } from 'src/app/shared/models/asset';
import { Event } from 'src/app/shared/models/event';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit, OnChanges {

  formEvent: FormGroup;

  today = new Date();
  eventDate: Date;

  @Output() eventEmit = new EventEmitter();

  @Input() equipments: Asset[];
  @Input() event: Event;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm(new Event());
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes.event ? changes.event.currentValue : null);
    if (this.event) {
      // console.log(changes.event.currentValue);
      if (changes.event.currentValue.data_hora) {
        this.eventDate = new Date(
          changes.event.currentValue.data_hora.substring(0, 10)
        );
        this.today = new Date(this.today.toISOString().substring(0, 10));
      }
      this.updateForm(changes.event.currentValue);
    } else if (this.formEvent) {
      this.onCancel();
    }
  }

  updateForm = (event: Event) =>
    this.formEvent.patchValue({
      ... event
    })

  createForm = (event: Event) => this.formEvent = this.formBuilder.group({
    id: [event.id],
    tipo_evento: [event.tipo_evento, Validators.required],
    descricao: [event.descricao, Validators.required],
    data_hora: [event.data_hora, Validators.required],
    conclusao: [event.conclusao],
    complexo_minerario_id: [event.complexo_minerario_id],
    ativo_id: [event.ativo_id, Validators.required],
  });

  onSubmit = () => {
    if (this.formEvent.valid) {
      // console.log(this.formEvent.value);
      this.eventEmit.emit(this.formEvent.value);
    }
  }

  onCancel = () => {
    this.formEvent.reset();
  }

  fieldValid = () =>
    this.event &&
    this.event.data_hora &&
    this.event.conclusao &&
    new Date(this.event.conclusao.substring(0, 10)) < new Date(this.today.toISOString().substring(0, 10));

  hasError = (field: string) => this.formEvent.get(field).errors;

  fieldTouched = (field: string) => this.formEvent.get(field).touched;

  fieldDirty = (field: string) => this.formEvent.get(field).dirty;
}
