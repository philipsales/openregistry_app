import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from 'app/shared/_material/material.module';
import { SharedModule } from 'app/shared/shared.module';

import { SpecsRoutingModule } from './specs-routing.module';
import { SpecsListComponent } from './specs-list/specs-list.component';
import { SpecsCreateComponent } from './specs-create/specs-create.component';
import { SpecsUpdateComponent } from './specs-update/specs-update.component';
import { SpecsFormComponent } from './specs-form/specs-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    SharedModule,
    SpecsRoutingModule
  ],
  declarations: [
    SpecsListComponent,
    SpecsCreateComponent,
    SpecsUpdateComponent,
    SpecsFormComponent
  ]
})
export class SpecsModule { }
