import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AccordionModule } from 'primeng/accordion';
import { TooltipModule } from 'primeng/tooltip';
import { FullCalendarModule } from 'primeng/fullcalendar';

import { Mod1AssetsRoutingModule } from './mod1-assets-routing.module';
import { MiningComplexListComponent } from './mining-complex-list/mining-complex-list.component';
import { MiningComplexDetailsComponent } from './mining-complex-details/mining-complex-details.component';
import { MiningComplexFormComponent } from './mining-complex-form/mining-complex-form.component';
import { MiningComplexScheduleComponent } from './mining-complex-schedule/mining-complex-schedule.component';
import { SharedModule } from '../shared/shared.module';
import { StructureFormComponent } from './structure-form/structure-form.component';
import { EquipmentsAddComponent } from './equipments-add/equipments-add.component';
import { EventFormComponent } from './event-form/event-form.component';


@NgModule({
  declarations: [
    MiningComplexListComponent,
    MiningComplexDetailsComponent,
    MiningComplexFormComponent,
    MiningComplexScheduleComponent,
    StructureFormComponent,
    EquipmentsAddComponent,
    EventFormComponent,
  ],
  imports: [
    CommonModule,
    Mod1AssetsRoutingModule,

    FormsModule,
    ReactiveFormsModule,

    SharedModule,

    TableModule,
    DropdownModule,
    DataViewModule,
    PanelModule,
    DialogModule,
    ConfirmDialogModule,
    AccordionModule,
    TooltipModule,
    FullCalendarModule,
  ],
  exports: [
    MiningComplexListComponent,
    MiningComplexFormComponent,
    MiningComplexDetailsComponent,
    MiningComplexScheduleComponent,
  ],
})
export class Mod1AssetsModule {}
