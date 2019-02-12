import { Component, OnInit, Input, NgZone } from '@angular/core';

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

  public notUnique: boolean;
  private _readonly: boolean;
  @Input() set readonly(readonly: boolean) {
    if (readonly) {
      this.myControl.disable();
    }
    this._readonly = readonly;
  }

  private _updateonly: boolean;
  @Input() set updateonly(updateonly: boolean) {
    if (updateonly) {
      this.myControl.disable();
    }
    this._updateonly = updateonly;
  }

  get readonly() {
    return this._readonly;
  }

  _case: Case;
  @Input() set case(value: Case) {
    this._case = value;
    if (this._case.specforms) {
      const total_specforms = this._case.specforms.length;
      for (let h = 0; h < total_specforms; ++h) {
        const total_specimen = this._case.specforms[h].specimen.length;
        for (let i = 0; i < total_specimen; ++i) {
          this.historyChanged(this._case.specforms[h].specimen[i]);
        }
      }
    }
  }// -- setter for forms

  forms: Form[];
  myControl: FormControl = new FormControl();
  biobankcases: string[];
  medcases: Case[];
  answers: FormAnswer[];
  filteredOptions: Observable<Case[]>;
  methods = ['Discard', 'New Consent Form', 'New Institution'];
  mtas: MTA[];

  show_selected_forms = true;
  is_processing = false;

  constructor(
    private formService: FormService,
    private caseService: CaseService,
    private mtaService: MtaService,
    private _ngZone: NgZone,
    private _notificationsService: NotificationsService,
    private router: Router
  ) {
    this.answers = [];
    this._case = new Case(null, environment.ORG_BIOBANK, '', this.answers);
    this._case.specforms = [];
  }

  ngOnInit() {
    this.formService.getValidBiobankForms().subscribe(
      forms => {
        this.forms = forms;
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
            startWith<string | Case>(''),
            map(val => typeof val === 'string' ? val : val.case_nbr),
            map(case_nbr => case_nbr ? this.filter(case_nbr) : this.medcases)
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
    if (isNaN(specimen.qty_avail)) {
      specimen.qty_avail = specimen.qty;
    }
  }

  onSaveCase() {
    this.updateCase();
  }

  compareId(val1:MTA, val2:MTA) {
    return val1 != null && val1['_id'] == val2['_id'];
  }

  private createNewCase() {
    this.caseService.create(this._case).subscribe((created_case: Case) => {
      this.is_processing = false;
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
      if (errors.status == 409) {
        this.notUnique = true;
      }
      console.log(errors, 'ERROR : case-manage.component');
      this.is_processing = false;
    });
  }

  private updateCase() {
    this.caseService.update(this._case).subscribe((updated_case: Case) => {
      this.is_processing = false;
      // this._case = updated_case;
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
      if (errors.status == 409) {
        this.notUnique = true;
      }
      console.log(errors, 'ERROR : case-update.component');
      this.is_processing = false;
    });
  }

  onAddSelectedForm(forms: Form[]) {
    this.show_selected_forms = true;
    // this.is_adding_forms = false;
    for (const form of forms) {
      /*
      let answers: Answer[] = [];
      this._case.forms.push(new FormAnswer(form.id, form.name, false, answers));
      */
     let specimens : Specimen[] = [];
     for (const x of form.table_section){
       let history : SpecimenHistory[] = [];
       history.push(new SpecimenHistory(0, new Date('0/0/0000'), '', 'recipient', ''));
       // history.push(new SpecimenHistory(0, (new Date), 'Discard', 'recipient', 'Case number: 121212'));
      specimens.push(new Specimen(0, x.specimen, x.type, '', '', 0, history));
     }

     this._case.specforms.push(new SpecForm(form.id, form.name, form.dir_path, specimens));
    }
    // this.onSubmitCaseTrigger.emit(this._case);
  }

  onClickAttachment(e:Event, dirpath: string) {
    this.caseService
      .downloadAttachment(dirpath)
      .subscribe(
        file => {
          var url = window.URL.createObjectURL(file);
          window.open(url);
        },
        errors => {
          console.log('attachment error');
        }
      );
    e.preventDefault();
  }

  onCancelAddForm() {
    this.show_selected_forms = true;
    // this.is_adding_forms = false;
  }

  onRemoveMTARow(h: number, i: number, j: number) {
    if (this._case.specforms[h].specimen[i].history.length > 1) {
      this._case.specforms[h].specimen[i].history.splice(j, 1);
      this.historyChanged(this._case.specforms[h].specimen[i]);
    }
  }

  onAddMTARow(h: number, i: number, j: number) {
    const newhistoryrow = new SpecimenHistory(0, new Date('0/0/0000'), '', 'recipient', '');
    this._case.specforms[h].specimen[i].history.push(newhistoryrow);
    this.historyChanged(this._case.specforms[h].specimen[i]);
  }

  private filter(val: string): Case[] {
    return this.medcases.filter(option => {
      return option.case_nbr.toLowerCase().indexOf(val.toLowerCase()) === 0
    });
  }

  displayFn(val?: Case): string | undefined {
    return val ? val.case_nbr : undefined;
  }

}
