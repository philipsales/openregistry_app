import { Component, OnInit } from '@angular/core';

import {
  Case,
  FormAnswer,
  Form,
  SpecForm,
  MTA
} from 'app/core/models';

import { environment } from 'environments/environment';
import { FormService, CaseService, MtaService } from 'app/core/services';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';
import { Specimen } from '../../../core/models/specimen';
import { SpecimenHistory } from '../../../core/models/specimenhistory';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { NoJWTError } from 'app/core/errors';

@Component({
  selector: 'app-case-create',
  templateUrl: './case-create.component.html',
  styleUrls: ['./case-create.component.css']
})
export class CaseCreateComponent implements OnInit {

  case: Case;
  answers: FormAnswer[];

  constructor() {
    this.answers = [];
    this.case = new Case('', environment.ORG_BIOBANK, '', this.answers);
    this.case.specforms = [];
  }

  ngOnInit() {
  }

}
