import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MiningComplexListComponent } from './mining-complex-list/mining-complex-list.component';
import { MiningComplexDetailsComponent } from './mining-complex-details/mining-complex-details.component';
import { MiningComplexFormComponent } from './mining-complex-form/mining-complex-form.component';
import { MiningComplexScheduleComponent } from './mining-complex-schedule/mining-complex-schedule.component';


const routes: Routes = [
  { path: '', component: MiningComplexListComponent },
  { path: 'novo', component: MiningComplexFormComponent },
  { path: ':id', component: MiningComplexDetailsComponent },
  { path: ':id/agenda', component: MiningComplexScheduleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Mod1AssetsRoutingModule { }
