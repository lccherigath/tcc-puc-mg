import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AccordionModule } from 'primeng/accordion';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { Mod1AssetsRoutingModule } from './mod1-assets-routing.module';
import { MiningComplexListComponent } from './mining-complex-list/mining-complex-list.component';
import { MiningComplexDetailsComponent } from './mining-complex-details/mining-complex-details.component';
import { MiningComplexFormComponent } from './mining-complex-form/mining-complex-form.component';
import { MiningComplexScheduleComponent } from './mining-complex-schedule/mining-complex-schedule.component';
import { SharedModule } from '../shared/shared.module';
import { StructureFormComponent } from './structure-form/structure-form.component';
import { EquipmentsAddComponent } from './equipments-add/equipments-add.component';


@NgModule({
  declarations: [
    MiningComplexListComponent,
    MiningComplexDetailsComponent,
    MiningComplexFormComponent,
    MiningComplexScheduleComponent,
    StructureFormComponent,
    EquipmentsAddComponent,
  ],
  imports: [
    CommonModule,
    Mod1AssetsRoutingModule,

    FormsModule,
    ReactiveFormsModule,

    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),

    SharedModule,

    TableModule,
    DropdownModule,
    DataViewModule,
    PanelModule,
    DialogModule,
    ConfirmDialogModule,
    AccordionModule,
  ],
  exports: [
    MiningComplexListComponent,
    MiningComplexFormComponent,
    MiningComplexDetailsComponent,
    MiningComplexScheduleComponent,
  ],
})
export class Mod1AssetsModule {}
