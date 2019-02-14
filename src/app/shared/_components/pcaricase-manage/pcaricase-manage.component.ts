import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Form, Case, Answer, FormAnswer } from 'app/core/models';
import { CaseJSON } from 'app/core/interfaces';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-pcaricase-manage',
  templateUrl: './pcaricase-manage.component.html',
  styleUrls: ['./pcaricase-manage.component.css']
})
export class PcaricaseManageComponent implements OnInit {

  _resetcase: CaseJSON;
  show_selected_forms = true;
  status: any[];
  _case: Case;

  @Input() set case(value: Case) {
    this._case = value;
    this._resetcase = this._case.toJSON();
    this.isBiobank = this._case.organization === environment.ORG_BIOBANK;
  }// -- _reinit setter
  private _medcases: string[];
  @Input() set medcases(value: string[]) {
    this._medcases = value;
    if (value) {
    } else {
      this._medcases = [];
    }
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
  }// -- _reinit setter

  _method: string;
  @Input() set method(method: string) {
    if (method == 'VIEW' || method == 'UPDATE') {
      this.myControl.disable();
    }
    this._method = method;
  }

  get method(): string {
    return this._method;
  }

  @Input() update_url: string;
  @Input() view_url: string;
  @Input() forms: Form[];
  @Input() case_searchable: boolean;
  @Input() show_icd: boolean;

  @Output() onSubmitCaseTrigger: EventEmitter<Case> = new EventEmitter();
  @Output() onShowICDTrigger: EventEmitter<any> = new EventEmitter();

  errors: any = {};
  has_errors = false;
  is_processing = false;
  is_adding_forms = false;
  selected_forms: Form[];
  options: string[];
  isBiobank = false;
  filteredOptions: Observable<string[]>;
  myControl: FormControl = new FormControl();

  constructor() {
    this.status = [
      { 'name': 'Active', 'key': true },
      { 'name': 'Inactive', 'key': false }
    ];
  }

  ngOnInit() {
  }

  resetCase() {
    this._case = Case.fromJSON(this._resetcase);
  }

  onAddForm() {
    this.show_selected_forms = false;
    this.is_adding_forms = true;
  }

  filter(val: string): string[] {
    return this._medcases.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  onAddSelectedForm(forms: Form[]) {
    this.show_selected_forms = true;
    this.is_adding_forms = false;
    for (const form of forms) {
      let answers: Answer[] = [];
      this._case.forms.push(new FormAnswer(form.id, form.name, false, answers));
    }
    this.onSubmitCaseTrigger.emit(this._case);
  }

  onCancelAddForm() {
    this.show_selected_forms = true;
    this.is_adding_forms = false;
  }

  onSubmitCase(case_for_save: Case) {
    this.onSubmitCaseTrigger.emit(case_for_save);
  }

  onShowICD() {
    this.onShowICDTrigger.emit();
    this.show_icd = true;
  }

  onHideICD() {
    this.show_icd = false;
  }
  onSelectDiagnosis(selected) {
    this._case.diagnosis = selected.diagnosis_name;
    this.show_icd = false;
  }

}
