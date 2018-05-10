import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpectypesListComponent } from './spectypes-list/spectypes-list.component';
import { SpectypesCreateComponent } from './spectypes-create/spectypes-create.component';
import { SpectypesUpdateComponent } from './spectypes-update/spectypes-update.component';

const routes: Routes = [
  {
    path: 'list',
    component: SpectypesListComponent,
  },
  {
    path: 'create',
      component: SpectypesCreateComponent
  },
  {
    path: 'update',
    component: SpectypesUpdateComponent
  },
  {path: '', redirectTo: 'list'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpectypesRoutingModule { }
