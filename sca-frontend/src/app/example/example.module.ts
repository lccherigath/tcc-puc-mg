import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ExampleRoutingModule } from './example-routing.module';
import { ExampleFormComponent } from './example-form/example-form.component';
import { ExampleListComponent } from './example-list/example-list.component';


@NgModule({
  declarations: [ExampleFormComponent, ExampleListComponent],
  imports: [
    CommonModule,
    ExampleRoutingModule,

    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ExampleListComponent,
    ExampleFormComponent
  ]
})
export class ExampleModule { }
