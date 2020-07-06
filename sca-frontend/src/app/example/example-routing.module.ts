import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExampleFormComponent } from './example-form/example-form.component';
import { ExampleListComponent } from './example-list/example-list.component';


const routes: Routes = [
  { path: 'examples', component: ExampleListComponent },
  { path: 'example-form-add', component: ExampleFormComponent },
  { path: 'example-form-edit/:id', component: ExampleFormComponent },

  // -- Rotas com parâmetros após rotas hard code
  // { path: 'examples/novo', component: ExamplesComponent },
  // { path: 'examples/:id', component: ExamplesComponent },
  // { path: 'examples/:id/editar', component: ExamplesComponent },

  // -- Rotas filhas: COLOCAR O <router-outlet> NO COMPONENTE PAI
  // { path: 'examples', component: ExamplesComponent, children: [  // Deixar o path vazio se usar lazy loading
  //   { path: 'novo', component: ExamplesComponent },
  //   { path: ':id', component: ExamplesComponent },
  //   { path: ':id/editar', component: ExamplesComponent }
  // ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExampleRoutingModule { }
