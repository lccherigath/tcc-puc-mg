import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    // redirectTo: 'admin/dashboard',
    redirectTo: 'complexos-minerarios',
  },
  {
    path: 'complexos-minerarios',
    loadChildren: () =>
      import('./mod1-assets/mod1-assets.module').then((m) => m.Mod1AssetsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
