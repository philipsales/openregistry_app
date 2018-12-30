import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentsComponent } from './departments.component';
import { DepartmentCreateComponent } from './department-create.component';
import { DepartmentDetailsComponent } from './department-details.component';
import { DepartmentUpdateComponent } from './department-update.component';

const routes: Routes = [
  {
    path: 'list',
    component: DepartmentsComponent
  },
  {
    path: 'details/:id',
    component: DepartmentDetailsComponent
  },
  {
    path: 'update/:id',
    component: DepartmentUpdateComponent
  },
  {
    path: 'create',
    component: DepartmentCreateComponent
  },
  { path: '', redirectTo: 'list'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentsRoutingModule { }
