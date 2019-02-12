import { Component, OnInit } from '@angular/core';

import {
  Case,
  FormAnswer,
  Form
} from 'app/core/models';
import { NoJWTError } from 'app/core/errors';
import { ActivatedRoute } from '@angular/router';
import { CaseService, FormService } from 'app/core/services';

import { environment } from 'environments/environment';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-case-update',
  templateUrl: './case-update.component.html',
  styleUrls: ['./case-update.component.css']
})
export class CaseUpdateComponent implements OnInit {

  case: Case;
  forms: Form[];

  private answers: FormAnswer[];
  private is_processing = false;

  constructor(
    private formService: FormService,
    private route: ActivatedRoute,
    private caseService: CaseService,
    private _notificationsService: NotificationsService
  ) {
    this.answers = [];
    this.case = new Case('', environment.ORG_MEDICAL, '', this.answers);
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.caseService.get(id).subscribe((response: Case) => {
      delete this.case;
      this.case = response;
    }, error => {
      console.log(error); // get the error in error handler
      if (error instanceof NoJWTError) {
        console.warn('TO DO : handle JWT Expired');
      }
    });

    this.formService.getValidMedicalForms().subscribe(
      forms => {
        this.forms = forms;
      }
    );
  }// --OnInit

  onSubmitCase(case_for_update: Case) {
    this.caseService.update(case_for_update).subscribe((updated_case: Case) => {
      this.is_processing = false;
      this.case = updated_case;
      this._notificationsService.success(
        'Case : ' + updated_case.case_nbr,
        'Successfully Updated.',
        {
          timeOut: 10000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: false,
        }
      );
    }, errors => {
      console.log(errors, 'ERROR : case-update.component');
      this.is_processing = false;
    });
  }
}
