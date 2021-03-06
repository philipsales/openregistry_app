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

import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Form, Section, Question, RegType, Department, Organization, TableSection, Spec, SpecType, PrincipalInvestigator } from 'app/core/models';
import {
  OrganizationService,
  DepartmentService,
  RegTypeService,
  FormService,
  CaseService,
  SpecService,
  SpecTypeService
} from 'app/core/services';

import { KeyGenerator } from 'app/core/utils';
import { Router } from '@angular/router';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-bioforms-form',
  templateUrl: './bioforms-form.component.html',
  styleUrls: ['./bioforms-form.component.css']
})
export class BioformsFormComponent implements OnInit {

  public principalinvestigators: PrincipalInvestigator[] = [
    {id: "a1", name: "Dr. Rodney Dofitas"},
    {id: "a2", name: "Dr. Maria Antonia Habana"}
  ];

  @Output() onResetTrigger: EventEmitter<Form> = new EventEmitter();
  @Output() onSubmitTrigger: EventEmitter<Form> = new EventEmitter();

  @Input() method = 'CREATE';
  @Input() registryTypes: RegType[];
  @Input() departments: Department[];
  @Input() organizations: Organization[];
  
  @ViewChild('userSaveFormAccount') bioform: NgForm;

  errors: any = {};
  has_errors = false;
  _form: Form = new Form('', '', [], [], '', '');;

  @Input() set form(value: Form) {
    if (value != null) {
      this._form = value;
    }
    /*
    if (value.table_section) {
      const total = value.table_section.length;
      for (let i = 0; i < total; ++i) {
        this._form.table_section[i] = value.table_section[i];
      }
    }
    */
  }// -- setter for forms

  status: any[];
  table_section: any[];
  is_processing = false;
  specimens: Spec[];
  specimen_types: SpecType[];

  specs = [
    {value: 'urine', viewValue: 'Urine'},
    {value: 'stool', viewValue: 'stool'},
  ];

  spectypes = [
    {value: 'frozen', viewValue: 'Frozen'},
    {value: 'embedded', viewValue: 'Embedded'},
  ];

  constructor(
    private formService: FormService,
    private specService: SpecService,
    private specTypeService: SpecTypeService
  ) {
    this.status = [
      { 'name': 'Pending', 'key': 'Pending' },
      { 'name': 'Approved', 'key': 'Approved' }
    ];
    this.table_section = [];
    this.table_section.push({specimen: '', type: ''});

    this.specService.getAll().subscribe(allspecs => {
      this.specimens = allspecs;
    });

    this.specTypeService.getAll().subscribe(allspectypes => {
      this.specimen_types = allspectypes;
    });
  }

  ngOnInit() {
  }

  onResetForm() {
    this.onResetTrigger.emit(this._form);
  }

  onChangeFile() {
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

  comparePrincipalSelectValue(selected, comparator) {
    return comparator != null && selected.id == comparator.id;
  }

  /*
  onChangeSpec($event: MatSelectChange) {
    const ar_id = ($event.source.id.split('-'));
    const index = ar_id[ar_id.length - 1];
    this._form.table_section[index].specimen = $event.value;
  }

  onChangeSpecType($event: MatSelectChange) {
    const ar_id = ($event.source.id.split('-'));
    const index = ar_id[ar_id.length - 1];
    this._form.table_section[index].type = $event.value;
  }
  */

 @ViewChild('fileInput') fileInput;

  onSaveForm() {
    this.is_processing = true;

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._form.created_by = currentUser.username;

    let fi = this.fileInput.nativeElement;
    let formModel = new FormData();
    
    if (fi.files && fi.files[0]) {
      formModel = fi.files[0];
      this._form.file = formModel;
    }
    
    this.onSubmitTrigger.emit(this._form);

  //   const data = this._form.toJSON();
  //   this.formService
  //     .submitForm(data)
  //     .subscribe(
  //       created_question => {
  //         console.warn(created_question, 'AYUS');
  //         this.onSubmitTrigger.emit(created_question);
  //         this.is_processing = false;
  //       }, errors => {
  //         this.is_processing = false;
  //         this.has_errors = true;
  //         this.errors = errors;
  //         console.warn('error');
  //         throw errors;
  //       });
  }
}
