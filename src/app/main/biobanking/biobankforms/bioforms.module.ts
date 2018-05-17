import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from 'app/shared/_material/material.module';
import { SharedModule } from 'app/shared/shared.module';
import { KeyGenerator } from 'app/core/utils';
import { FormDummyApiResponse } from 'app/core/services-dummy';
import { FormService, DepartmentService, RegTypeService, OrganizationService } from 'app/core/services';

import { ConsentformsRoutingModule } from './bioforms-routing.module';
import { BioformsListComponent } from './bioforms-list/bioforms-list.component';
import { BioformsCreateComponent } from './bioforms-create/bioforms-create.component';
import { BioformsUpdateComponent } from './bioforms-update/bioforms-update.component';
import { BioformsPreviewComponent } from './bioforms-preview/bioforms-preview.component';
import { BioformsCreateFormComponent } from './bioforms-create/bioforms-create-form.component';
import { BioformsFormComponent } from './bioforms-form/bioforms-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    SharedModule,
    InMemoryWebApiModule.forRoot(FormDummyApiResponse, {
      passThruUnknownUrl: true, delay: 1000
    }),
    ConsentformsRoutingModule
  ],
  declarations: [
    BioformsListComponent,
    BioformsCreateComponent,
    BioformsUpdateComponent,
    BioformsPreviewComponent,
    BioformsCreateFormComponent,
    BioformsFormComponent
  ],
  providers: [
    FormService,
    DepartmentService,
    RegTypeService,
    OrganizationService,
    KeyGenerator
  ]
})
export class ConsentformsModule { }
