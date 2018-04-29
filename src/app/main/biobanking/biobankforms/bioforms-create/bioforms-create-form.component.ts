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
import { Form, Section, Question, RegType, Department, Organization } from 'app/core/models';
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

  constructor() {
    this.status = [
      { 'name': 'Pending', 'key': 'Pending' },
      { 'name': 'Approved', 'key': 'Approved' }
    ];
    this.table_section = [];
    this.table_section.push({speciment: '', type: ''});
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
    this.table_section.push({speciment: '', type: ''});
  }

  removeTableQuestion(index: number) {
    if (this.table_section.length !== 1) {
      this.table_section.splice(index, 1);
    }
  }

  onChangeSpec($event: MatSelectChange) {
    const ar_id = ($event.source.id.split('-'));
    const index = ar_id[ar_id.length - 1];
    let curval = (this.table_section[index].value).split('|');
    curval[1] = $event.value;
    this.table_section[index].value = curval.join('|');
    console.log(this.table_section[index]);
  }

  onChangeSpecType($event: MatSelectChange) {
    console.log($event.source);
    const ar_id = ($event.source.id.split('-'));
    const index = ar_id[ar_id.length - 1];
    console.log(index);
    console.log($event.value);
    console.log(this.table_section[index]);
    let curval = (this.table_section[index].value).split('|');
    curval[2] = $event.value;
    this.table_section[index].value = curval.join('|');
    console.log(this.table_section[index]);
  }
}
