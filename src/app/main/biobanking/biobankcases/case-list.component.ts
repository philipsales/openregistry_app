import { Component, OnInit } from '@angular/core';

import { CaseService } from 'app/core/services';
import { Case } from 'app/core/models';
import { NoJWTError } from 'app/core/errors';

@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.css']
})
export class CaseListComponent implements OnInit {

  cases: Case[];

  constructor(private caseService: CaseService) { }

  ngOnInit() {
  }
}
