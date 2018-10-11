import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';

//InMemory modules
import { HttpModule } from '@angular/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ReportDummyApiResponse }   from 'app/core/services-dummy';

import { ReportService } from 'app/core/services';

import { ReportRoutingModule } from './reports-routing.module';
import { ReportListComponent } from './reports-list.component';

import { MaterialModule } from 'app/shared/_material/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(ReportDummyApiResponse),
    ReportRoutingModule,
    MaterialModule
  ],
  declarations: [
    ReportListComponent
  ],
  providers: [ 
    ReportService,
    ReportDummyApiResponse
  ]
})
export class ReportsMedicalModule { }
