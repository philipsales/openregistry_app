import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MtasComponent } from './mtas.component';
import { MtasCreateComponent } from './mtas-create/mtas-create.component';
import { MtsUpdateComponent } from './mtas-update/mts-update.component';
import { MtsViewComponent } from './mtas-view/mts-view/mts-view.component';

const routes: Routes = [
  {
    path: 'list',
    component: MtasComponent,
  },
  {
    path: 'create',
    component: MtasCreateComponent
  },
  {
    path: 'update/:id',
    component: MtsUpdateComponent
  },
  {
    path: 'view/:id',
    component: MtsViewComponent
  },
  {path: '', redirectTo: 'list'}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MtasRoutingModule { }
