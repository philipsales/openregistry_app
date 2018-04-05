import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from 'app/shared/_material/material.module';
import { SharedModule } from 'app/shared/shared.module';
import { MtasRoutingModule } from './mtas-routing.module';
import { MtasComponent } from './mtas.component';
import { MtasCreateComponent } from './mtas-create/mtas-create.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    SharedModule,
    MtasRoutingModule
  ],
  declarations: [MtasComponent, MtasCreateComponent]
})
export class MtasModule { }
