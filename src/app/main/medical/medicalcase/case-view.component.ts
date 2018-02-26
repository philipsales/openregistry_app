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

  private case: Case;
  private forms: Form[];
  private answers: FormAnswer[];

  constructor(
    private route: ActivatedRoute,
    private formService: FormService,
    private caseService: CaseService
  ) {
    this.answers = [];
    this.case = new Case('', environment.ORG_MEDICAL, '', this.answers);
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.caseService.get(id).subscribe((response: Case) => {
      delete this.case;
      this.case = response;
      console.log(response);
    }, error => {
      console.log(error); // get the error in error handler
      if (error instanceof NoJWTError) {
        console.warn('TO DO : handle JWT Expired');
      }
    });

    this.formService.getMedicalForms().subscribe(
      forms => {
        this.forms = forms;
        console.log(this.forms, 'filtered forms');
      }
    );

  }// --OnInit
}
