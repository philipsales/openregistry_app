import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild
} from '@angular/core';

declare var jquery: any;
declare var $: any;

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Form, Section, Question, RegType, Department, Organization, TableSection } from 'app/core/models';
import { OrganizationService, DepartmentService, RegTypeService, FormService, CaseService } from 'app/core/services';

import { KeyGenerator } from 'app/core/utils';
import { Router } from '@angular/router';
import { MatSelectChange } from '@angular/material';


@Component({
  selector: 'app-bioforms-create-form',
  templateUrl: './bioforms-create-form.component.html',
  styleUrls: ['./bioforms-create-form.component.css']
})
export class BioformsCreateFormComponent implements OnInit {

  @Output() onResetTrigger: EventEmitter<Form> = new EventEmitter();
  @Output() onSubmitTrigger: EventEmitter<Form> = new EventEmitter();

  @Input() registryTypes: RegType[];
  @Input() departments: Department[];
  @Input() organizations: Organization[];

  @ViewChild('fileInput') fileInput;

  private _form: Form;
  @Input() set form(value: Form) {
    this._form = value;
    console.warn(this._form, 'HELLO!');
  }// -- setter for forms

  status: any[];
  table_section: any[];
  is_processing = false;

  specs = [
    {value: 'urine', viewValue: 'Urine'},
    {value: 'stool', viewValue: 'stool'},
  ];
  
  spectypes = [
    {value: 'frozen', viewValue: 'Frozen'},
    {value: 'embedded', viewValue: 'Embedded'},
  ];

  constructor(
    private formService: FormService
  ) {
    this.status = [
      { 'name': 'Pending', 'key': 'Pending' },
      { 'name': 'Approved', 'key': 'Approved' }
    ];
    this.table_section = [];
    this.table_section.push({specimen: '', type: ''});
  }

  ngOnInit() {
  }

  onResetForm() {
    this.onResetTrigger.emit(this._form);
  }

  onChangeFile() {
    console.log('new file');
    let fi = this.fileInput.nativeElement;
    let formModel = new FormData();
    this._form.dir_path = (fi.files[0].name).split(' ').join('_');
  }

  addTableQuestion() {
    this._form.table_section.push(new TableSection('', ''));
  }

  removeTableQuestion(index: number) {
    if (this._form.table_section.length !== 1) {
      this._form.table_section.splice(index, 1);
    }
  }

  onChangeSpec($event: MatSelectChange) {
    const ar_id = ($event.source.id.split('-'));
    const index = ar_id[ar_id.length - 1];
    this._form.table_section[index].specimen = $event.value;
  }

  onChangeSpecType($event: MatSelectChange) {
    const ar_id = ($event.source.id.split('-'));
    const index = ar_id[ar_id.length - 1];
    this._form.table_section[index].type = $event.value;;
  }

  onSaveForm() {
    console.log(this._form, 'FORM');
    this.is_processing = true;

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._form.created_by = currentUser.username;

    const data = this._form.toJSON();
    this.formService
      .submitForm(data)
      .subscribe(
        created_question => {
          console.warn(created_question, 'AYUS')
          this.onSubmitTrigger.emit(created_question);
          this.is_processing = false;
        }, errors => {
          this.is_processing = false;
          console.warn('error');
          throw errors;
        });
  }
}
