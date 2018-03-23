import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MtasComponent } from './mtas.component';
import { MtasCreateComponent } from './mtas-create/mtas-create.component';

const routes: Routes = [
  {
      path: 'list',
      component: MtasComponent,
  },
  {
     path: 'create',
      component: MtasCreateComponent
  },
  {path: '', redirectTo: 'list'}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MtasRoutingModule { }
