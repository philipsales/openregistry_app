import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BiobankingComponent } from './biobanking.component';

const routes: Routes = [
  {
    path: '', component: BiobankingComponent,
    children: [
      {
        path: 'forms',
        loadChildren: './biobankforms/bioforms.module#ConsentformsModule'
      },
      {
        path: 'cases',
        loadChildren: './biobankcases/biocase.module#BiocaseModule'
      },
      {
        path: 'mtas',
        loadChildren: './mtas/mtas.module#MtasModule'
      },
      {
        path: 'reports',
        loadChildren: './biobankreports/reports-biobanking.module#ReportsBiobankingModule'
      },
      {
        path: 'specs',
        loadChildren: './specs/specs.module#SpecsModule'
      },
      {
        path: 'spectypes',
        loadChildren: './spectypes/spectypes.module#SpectypesModule'
      },
      { path: '', redirectTo: 'cases' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BiobankingRoutingModule { }
