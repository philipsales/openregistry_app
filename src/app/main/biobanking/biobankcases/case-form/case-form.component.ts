import { Component, OnInit, Input } from '@angular/core';

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
import { Specimen } from 'app/core/models/specimen';
import { SpecimenHistory } from 'app/core/models/specimenhistory';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { NoJWTError } from 'app/core/errors';

@Component({
  selector: 'app-case-form',
  templateUrl: './case-form.component.html',
  styleUrls: ['./case-form.component.css']
})
export class CaseFormComponent implements OnInit {

  @Input() case: Case;

  forms: Form[];
  myControl: FormControl = new FormControl();
  biobankcases: string[];
  medcases: string[];
  answers: FormAnswer[];
  filteredOptions: Observable<string[]>;
  methods = ['MTA', 'Discard', 'Transfer To'];
  mtas: MTA[];

  show_selected_forms = true;
  is_processing = false;

  constructor(
    private formService: FormService,
    private caseService: CaseService,
    private mtaService: MtaService,
    private _notificationsService: NotificationsService,
    private router: Router
  ) {
    this.answers = [];
    this.case = new Case('', environment.ORG_BIOBANK, '', this.answers);
    this.case.specforms = [];
  }

  ngOnInit() {
    this.formService.getValidBiobankForms().subscribe(
      forms => {
        this.forms = forms;
        console.log(this.forms, 'filtered forms');
      }
    );

    this.caseService.getBiobankCaseNumbers().subscribe(
      casenbrs => {
        this.biobankcases = casenbrs;
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

    this.mtaService.getAll().subscribe(
      mtas => {
        this.mtas = mtas;
        console.warn(mtas);
      }, error => {
        console.log(error); // get the error in error handler
        if (error instanceof NoJWTError) {
          console.warn('TO DO : handle JWT Expired');
        }
      }
    );
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
       history.push(new SpecimenHistory(0, (new Date), 'MTA', 'recipient', 'somefile.pdf'));
       history.push(new SpecimenHistory(0, (new Date), 'Discard', 'recipient', 'Case number: 121212'));
      specimens.push(new Specimen(0, x.specimen, x.type, '', 0, history));
     }

     this.case.specforms.push(new SpecForm(form.id, form.name, specimens));
    }
    // this.onSubmitCaseTrigger.emit(this._case);
    console.log(this.case, 'CASE');
  }

  onCancelAddForm() {
    this.show_selected_forms = true;
    // this.is_adding_forms = false;
  }

  private filter(val: string): string[] {
    console.log('ewan');
    return this.medcases.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

}
