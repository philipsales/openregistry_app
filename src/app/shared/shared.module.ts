import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2CompleterModule } from 'ng2-completer';

import { UserFormComponent } from './_components/user-form.component';

import { MaterialModule } from 'app/shared/_material/material.module';
import { EllipsisPipe } from './_pipes/ellipsis.pipe';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { ConsentService, DepartmentService } from 'app/core/services';

// DFORMS
import { DynamicFormComponent } from './_components/forms_dforms/dynamic-form.component';
import { DynamicFormQuestionComponent } from './_components/forms_dforms/dynamic-form-question.component';

// NESTED DFORMS
// import { FormCreateComponent }           from './forms_detail/form-create.component';

import { FormSectionArrayComponent } from './_components/forms_section/form-section-array.component';
import { FormSectionComponent } from './_components/forms_section/form-section.component';

import { QuestionContentArrayComponent } from './_components/forms_question/question-content-array.component';
import { QuestionContentComponent } from './_components/forms_question/question-content.component';

import { QuestionOptionArrayComponent } from './_components/forms_option/question-option-array.component';
import { QuestionOptionComponent } from './_components/forms_option/question-option.component';
import { Consent } from 'app/core/models';
import { PcariformListComponent } from './_components/pcariform-list/pcariform-list.component';
import { RouterModule } from '@angular/router';
import { PcariformManageComponent } from './_components/pcariform-manage/pcariform-manage.component';
import { KeyGenerator } from 'app/core/utils';
import { FormDummyApiResponse } from 'app/core/services-dummy';
import { PcaricaseListComponent } from './_components/pcaricase-list/pcaricase-list.component';
import { PcaricaseManageComponent } from './_components/pcaricase-manage/pcaricase-manage.component';
import { PcaricaseFormListComponent } from './_components/pcaricase-form-list/pcaricase-form-list.component';
import { PcaricaseFormAddComponent } from './_components/pcaricase-form-add/pcaricase-form-add.component';
import { IcdoncologyManageComponent } from './_components/icdoncology-manage/icdoncology-manage.component';
import { IcdoncologySearchComponent } from './_components/icdoncology-search/icdoncology-search.component';
import { DeleteModalComponent } from './_components/delete-modal/delete-modal.component';
import { PcariauthDirective } from './_directives/pcariauth.directive';
import { FormsTableSectionComponent } from './_components/forms-table-section/forms-table-section.component';
import { FormsTableSectionArrayComponent } from './_components/forms-table-section/forms-table-section-array.component';
import { TableQuestionContentArrayComponent } from './_components/table-question-content-array/table-question-content-array.component';
import { DynamicTableFormComponent } from './_components/dynamic-table-form/dynamic-table-form.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    Ng2CompleterModule,
    InMemoryWebApiModule.forRoot(FormDummyApiResponse, {
      passThruUnknownUrl: true, delay: 1000
    }),
    MaterialModule
  ],
  declarations: [
    UserFormComponent,
    EllipsisPipe,
    // Dforms
    // DformsComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent,

    // Nested Dforms
    /// FormCreateComponent,
    FormSectionArrayComponent,
    FormSectionComponent,

    QuestionContentArrayComponent,
    QuestionContentComponent,

    QuestionOptionArrayComponent,
    QuestionOptionComponent,
    PcariformListComponent,
    PcariformManageComponent,
    PcaricaseListComponent,
    PcaricaseManageComponent,
    PcaricaseFormListComponent,
    PcaricaseFormAddComponent,
    IcdoncologyManageComponent,
    IcdoncologySearchComponent,
    DeleteModalComponent,
    PcariauthDirective,
    FormsTableSectionComponent,
    FormsTableSectionArrayComponent,
    TableQuestionContentArrayComponent,
    DynamicTableFormComponent
  ],
  providers: [
    ConsentService,
    DepartmentService,
    KeyGenerator
  ],
  exports: [
    UserFormComponent,
    EllipsisPipe,
    DynamicFormComponent,
    PcariformListComponent,
    PcariformManageComponent,
    PcaricaseFormAddComponent,
    PcaricaseListComponent,
    PcaricaseManageComponent,
    IcdoncologyManageComponent,
    DeleteModalComponent,
    PcariauthDirective
  ]
})
export class SharedModule { }
