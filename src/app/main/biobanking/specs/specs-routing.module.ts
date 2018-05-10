import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpecsListComponent } from './specs-list/specs-list.component';
import { SpecsCreateComponent } from './specs-create/specs-create.component';
import { SpecsUpdateComponent } from './specs-update/specs-update.component';

const routes: Routes = [
  {
      path: 'list',
      component: SpecsListComponent,
  },
  {
     path: 'create',
      component: SpecsCreateComponent
  },
  {
    path: 'update/:id',
     component: SpecsUpdateComponent
  },
  {path: '', redirectTo: 'list'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecsRoutingModule { }
