import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';

//InMemory modules
import { HttpModule } from '@angular/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FormDummyApiResponse } from 'app/core/services-dummy';

import { FormRoutingModule } from './form-routing.module';
import { FormService } from 'app/core/services';

import { FormListComponent } from './form-list.component';

import { FormQuestionComponent } from './form-question.component';
import { FormQuestionService } from './form-question.service';


import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsComponent } from './questions.component';
import { QuestionsCreateComponent } from './questions-create.component';

//TODO: transfer in core/services
import { QuestionService } from './question.service';

import { QuestionSectionComponent } from './question-section.component';
import { FormQuestionDetailComponent } from './form-question-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(FormDummyApiResponse),
    FormRoutingModule,
    QuestionsRoutingModule
  ],
  declarations: [
    FormListComponent,
    QuestionsComponent,
    QuestionsCreateComponent,
    QuestionSectionComponent,
    FormQuestionComponent,
    FormQuestionDetailComponent
  ],
  providers: [ 
    FormDummyApiResponse,
    FormService,
    FormQuestionService,
//TODO: rename to FormQuestionService
    QuestionService 
  ]
})
export class FormModule { }
