import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';

import { CaseService, FormService } from 'app/core/services';

import {
  Case,
  FormAnswer,
  Form
} from 'app/core/models';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NoJWTError } from 'app/core/errors';
import { CaseJSON } from 'app/core/interfaces';

import { environment } from 'environments/environment';

@Component({
  selector: 'app-case-view',
  templateUrl: './case-view.component.html',
  styleUrls: ['./case-view.component.css']
})
export class CaseViewComponent implements OnInit {

  case: Case;
  forms: Form[];
  answers: FormAnswer[];
  medcases: Case[];

  constructor(
    private formService: FormService,
    private route: ActivatedRoute,
    private caseService: CaseService
  ) {
    this.answers = [];
    this.case = new Case('', environment.ORG_BIOBANK, '', this.answers);
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
    this.formService.getBiobankForms().subscribe(
      forms => {
        this.forms = forms;
      }
    );
    this.caseService.getMedicalCaseNumbers().subscribe(
      casenbrs => {
        this.medcases = casenbrs;
      }
    );
  }// --OnInit
}
