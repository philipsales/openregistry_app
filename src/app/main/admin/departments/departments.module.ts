import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentsComponent } from './departments.component';
import { DepartmentListComponent } from './department-list.component';

import { SharedModule } from 'app/shared/shared.module';
import { MaterialModule } from 'app/shared/_material/material.module';
import { MatPaginatorModule } from '@angular/material';
import { DepartmentCreateComponent } from './department-create.component';
import { DepartmentUpdateComponent } from './department-update.component';
import { DepartmentFormComponent } from './department-form.component';
import { DepartmentDetailsComponent } from './department-details.component';

@NgModule({
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
    FormsModule,
    MaterialModule,
    MatPaginatorModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [DepartmentsComponent, DepartmentListComponent, DepartmentCreateComponent, DepartmentUpdateComponent, DepartmentFormComponent, DepartmentDetailsComponent]
})
export class DepartmentsModule { }
