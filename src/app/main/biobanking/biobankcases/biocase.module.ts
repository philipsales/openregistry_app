import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { CaseDummyApiResponse } from 'app/core/services-dummy';

import { CaseRoutingModule } from './biocase-routing.module';
import {
  CaseService,
  FormService
} from 'app/core/services';

import { SharedModule } from 'app/shared/shared.module';

import { MaterialModule } from 'app/shared/_material/material.module';
import { ErrorStateMatcher } from '@angular/material/core';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material';

import { CaseListComponent } from './case-list.component';
import { CaseCreateComponent } from './case-create.component';

import { CaseViewComponent } from './case-view.component';
import { CaseUpdateComponent } from './case-update.component';
import { MatTableModule } from '@angular/material';
import { CaseFormsComponent } from './case-forms/case-forms.component';
import { CaseFormsUpdateComponent } from './case-forms/case-forms-update.component';
import { CaseFormComponent } from './case-form/case-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    SharedModule,
    InMemoryWebApiModule.forRoot(CaseDummyApiResponse),
    CaseRoutingModule,
    MatTableModule,
    MaterialModule
  ],
  declarations: [
    CaseListComponent,
    CaseCreateComponent,
    CaseViewComponent,
    CaseUpdateComponent,
    CaseFormsComponent,
    CaseFormsUpdateComponent,
    CaseFormComponent
  ],
  providers: [
    // Material Form ErrorMatcher
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },

    CaseDummyApiResponse,
    CaseService,
    FormService
  ]
})
export class BiocaseModule { }
