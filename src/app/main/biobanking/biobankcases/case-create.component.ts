import { Component, OnInit } from '@angular/core';

import {
  Case,
  FormAnswer,
  Form,
  SpecForm
} from 'app/core/models';

import { environment } from 'environments/environment';
import { FormService, CaseService } from 'app/core/services';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';
import { Specimen } from '../../../core/models/specimen';
import { SpecimenHistory } from '../../../core/models/specimenhistory';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

@Component({
  selector: 'app-case-create',
  templateUrl: './case-create.component.html',
  styleUrls: ['./case-create.component.css']
})
export class CaseCreateComponent implements OnInit {

  case: Case;
  forms: Form[];
  answers: FormAnswer[];
  is_processing = false;
  medcases: string[];
  show_icd: boolean;
  has_errors = false;
  show_selected_forms = true;
  filteredOptions: Observable<string[]>;
  myControl: FormControl = new FormControl();

  methods = ['MTA', 'Disposal'];

  constructor(
    private formService: FormService,
    private caseService: CaseService,
    private _notificationsService: NotificationsService,
    private router: Router
  ) {
    this.answers = [];
    this.case = new Case('', environment.ORG_BIOBANK, '', this.answers);
    this.case.specform = [];
  }

  ngOnInit() {
    this.formService.getValidBiobankForms().subscribe(
      forms => {
        this.forms = forms;
        console.log(this.forms, 'filtered forms');
      }
    );

    this.caseService.getMedicalCaseNumbers().subscribe(
      casenbrs => {
        this.medcases = casenbrs;
        this.filteredOptions = this.myControl.valueChanges
          .pipe(
            startWith(''),
            map(val => this.filter(val))
          );
      }
    );
  }

  filter(val: string): string[] {
    console.log('ewan');
    return this.medcases.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }


  onAddSelectedForm(forms: Form[]) {
    this.show_selected_forms = true;
    // this.is_adding_forms = false;
    console.log(forms);
    for (const form of forms) {
      /*
      let answers: Answer[] = [];
      this._case.forms.push(new FormAnswer(form.id, form.name, false, answers));
      */
     let specimens : Specimen[] = [];
     for (const x of form.table_section){
       let history : SpecimenHistory[] = [];
       history.push(new SpecimenHistory(0, 'MTA', 'recipient', 'somefile.pdf'));
       history.push(new SpecimenHistory(0, 'Disposal', 'recipient', 'Case number: 121212'));
      specimens.push(new Specimen(0, x.specimen, x.type, '', 0, history));
     }

     this.case.specform.push(new SpecForm(form.id, form.name, specimens));
    }
    // this.onSubmitCaseTrigger.emit(this._case);
    console.log(this.case, 'CASE');
  }

  onCancelAddForm() {
    this.show_selected_forms = true;
    // this.is_adding_forms = false;
  }

  historyChanged(specimen: Specimen) {
    let total_count: number;
    total_count = 0;
    specimen.qty_avail = 0;
    specimen.history.map((this_history) => {
      specimen.qty_avail = (specimen.qty_avail * 1) + (this_history.qty * 1);
    });
    specimen.qty_avail = specimen.qty - specimen.qty_avail;
    console.warn(specimen, 'TOTAL COUNT');
  }

  onSaveCase() {
    this.caseService.create(this.case).subscribe((created_case: Case) => {
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
      this.router.navigate(['/biobanking/cases']);
    }, errors => {
      console.log(errors, 'ERROR : case-manage.component');
      this.is_processing = false;
    });
  }

  onSubmitCase(case_for_create: Case) {

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    case_for_create.created_by = currentUser.username;

    for (var i = 0; i < case_for_create.forms.length; ++i) {
      if (case_for_create.forms[i]) {
        case_for_create.forms[i].created_by = currentUser.username;
      }
    }


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
      this.router.navigate(['/biobanking/cases']);
    }, errors => {
      console.log(errors, 'ERROR : case-manage.component');
      this.is_processing = false;
    });
  }
}
