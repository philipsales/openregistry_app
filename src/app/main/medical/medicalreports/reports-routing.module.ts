import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportListComponent } from './reports-list.component';

import { FormService } from 'app/core/services';

const routes: Routes = [
  {
    path: 'list',
    component: ReportListComponent
  },
  { path: '', redirectTo: 'list' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    FormService
  ]
})
export class ReportRoutingModule { }
