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
        path: 'reports',
        loadChildren: './biobankreports/reports-biobanking.module#ReportsBiobankingModule'
      },
      { path: '', redirectTo: 'forms' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BiobankingRoutingModule { }
