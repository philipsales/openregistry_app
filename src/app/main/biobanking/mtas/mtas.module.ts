import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MtasRoutingModule } from './mtas-routing.module';
import { MtasComponent } from './mtas.component';
import { MtasCreateComponent } from './mtas-create/mtas-create.component';

@NgModule({
  imports: [
    CommonModule,
    MtasRoutingModule
  ],
  declarations: [MtasComponent, MtasCreateComponent]
})
export class MtasModule { }
