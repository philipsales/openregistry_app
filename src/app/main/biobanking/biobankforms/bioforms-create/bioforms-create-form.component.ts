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


@Component({
  selector: 'app-bioforms-create-form',
  templateUrl: './bioforms-create-form.component.html',
  styleUrls: ['./bioforms-create-form.component.css']
})
export class BioformsCreateFormComponent implements OnInit {

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

  constructor() {
    this.status = [
      { 'name': 'Pending', 'key': 'Pending' },
      { 'name': 'Approved', 'key': 'Approved' }
    ];
  }

  ngOnInit() {
  }

  onChangeFile() {
    console.log('new file');
    let fi = this.fileInput.nativeElement;
    let formModel = new FormData();
    this._form.dir_path = (fi.files[0].name).split(' ').join('_');
  }


}
