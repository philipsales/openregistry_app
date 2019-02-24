import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from 'app/shared/_material/material.module';
import { SharedModule } from 'app/shared/shared.module';

import { SpectypesRoutingModule } from './spectypes-routing.module';
import { SpectypesListComponent } from './spectypes-list/spectypes-list.component';
import { SpectypesCreateComponent } from './spectypes-create/spectypes-create.component';
import { SpectypesUpdateComponent } from './spectypes-update/spectypes-update.component';
import { SpectypesFormComponent } from './spectypes-form/spectypes-form.component';

import { MatPaginatorModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    MatPaginatorModule,
    SharedModule,
    SpectypesRoutingModule
  ],
  declarations: [
    SpectypesListComponent,
    SpectypesCreateComponent,
    SpectypesUpdateComponent,
    SpectypesFormComponent
  ]
})
export class SpectypesModule { }
