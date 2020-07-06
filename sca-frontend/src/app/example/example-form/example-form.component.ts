import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

// import { map, switchMap } from 'rxjs/operators';

import { ToastMessageService } from 'src/app/shared/services/toast-message.service';
import { ExampleService } from 'src/app/shared/services/example.service';

import { Example } from 'src/app/shared/models/example';

@Component({
  selector: 'app-example-form',
  templateUrl: './example-form.component.html',
  styleUrls: ['./example-form.component.scss']
})
export class ExampleFormComponent implements OnInit {

  formExample: FormGroup;
  // submitted = false; // usado quando o botão submit estiver sempre habilitado
  maxDate = Date.now();

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private toastMessageService: ToastMessageService,
    private exampleService: ExampleService
  ) {}

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(
      (params: any) => {
        const id = params.id;
        // console.log(id);
        if (id) {
          const example$ = this.exampleService.loadById(id);
          example$.subscribe(
            example => {
              this.updateForm(example);
            }
          );
        }
      }
    );

    // this.activatedRoute.params
    // .pipe(
    //   map( (params: any) => params.id ),
    //   switchMap( id => this.exampleService.loadById(id) )
    // )
    // .subscribe(example => this.updateForm(example));

    this.createForm(new Example());
  }

  createForm = (example: Example) =>
    (this.formExample = this.formBuilder.group({
      id: [example.id],
      nome: [
        example.nome,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(150)
        ]
      ],
      email: [example.email, [Validators.required, Validators.email]],
      tipo: [example.tipo, Validators.required],
      genero: [example.genero, Validators.required],
      customRadio: [example.customRadio, Validators.required],
      dataNascimento: [example.dataNascimento, Validators.required],
      observacao: [example.observacao],
      inativo: [example.inativo],
      customCheck: [example.customCheck]
    }))

  updateForm = (example: Example) =>
    this.formExample.patchValue({
      ... example
    })

  hasError = (field: string) => this.formExample.get(field).errors;

  fieldTouched = (field: string) => this.formExample.get(field).touched;

  fieldDirty = (field: string) => this.formExample.get(field).dirty;

  // onSubmit = () => {
  //   // this.submitted = true;
  //   if (this.formExample.valid) {
  //     console.log(this.formExample.value);
  //     this.exampleService.create(this.formExample.value).subscribe(
  //       success => {
  //         this.toastMessageService.showMessage('success', '', 'Criado com sucesso!');
  //         this.location.back();
  //       },
  //       error => {
  //         this.toastMessageService.showMessage('error', `Erro ${error.status}`, error.statusText);
  //         console.error(error);
  //       }
  //     );
  //     // this.formExample.reset();
  //   }
  // }

  onSubmit = () => {
    // this.submitted = true;
    if (this.formExample.valid) {
      console.log(this.formExample.value);

      this.exampleService.save(this.formExample.value).subscribe(
        success => {
          this.toastMessageService.showMessage('success', '', `${this.formExample.value.id ? 'Atualizado' : 'Criado'} com sucesso!`);
          this.location.back();
        },
        error => {
          this.toastMessageService.showMessage('error', `Erro ${error.status}`, error.statusText);
          console.error(error);
        }
      );
      // this.formExample.reset();
    }
  }

  onCancel = () => {
    // this.submitted = false;
    this.formExample.reset();
  }

}
