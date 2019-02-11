import { Component, OnInit } from '@angular/core';

import {
  Case,
  FormAnswer,
  Form
} from 'app/core/models';

import { environment } from 'environments/environment';
import { FormService, CaseService } from 'app/core/services';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';

@Component({
  selector: 'app-case-create',
  templateUrl: './case-create.component.html',
  styleUrls: ['./case-create.component.css']
})
export class CaseCreateComponent implements OnInit {

  private answers: FormAnswer[];

  case: Case;
  forms: Form[];
  is_processing = false;
  show_icd: boolean;


  constructor(
    private formService: FormService,
    private caseService: CaseService,
    private _notificationsService: NotificationsService,
    private router: Router
  ) {
    this.answers = [];
    this.case = new Case('', environment.ORG_MEDICAL, '', this.answers);
    this.show_icd = false;
  }

  ngOnInit() {
    this.formService.getValidMedicalForms().subscribe(
      forms => {
        this.forms = forms;
      }
    );
  }

  onSubmitCase(case_for_create: Case) {
    this.caseService.create(case_for_create).subscribe((created_case: Case) => {
      this.is_processing = false;
      console.log(created_case, 'CASE CREATED : case-manage.component');
      this._notificationsService.success(
        'New Case : ' + created_case.case_nbr,
        'Successfully Created',
        {
          timeOut: 10000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: false,
        }
      );
      this.router.navigate(['/medical/cases']);
    }, errors => {
      console.log(errors, 'ERROR : case-manage.component');
      this.is_processing = false;
    });
  }

  onShowICD(value) {
    console.log("onSHOWICD CaseCreate");
    this.show_icd = true;
  }
}
