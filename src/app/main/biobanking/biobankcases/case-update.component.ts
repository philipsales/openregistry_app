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
  answers: FormAnswer[];
  is_processing = false;

  constructor(
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
  }// --OnInit
}
