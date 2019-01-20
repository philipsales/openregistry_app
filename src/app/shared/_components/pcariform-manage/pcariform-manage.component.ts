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
  selector: 'app-pcariform-manage',
  templateUrl: './pcariform-manage.component.html',
  styleUrls: ['./pcariform-manage.component.css']
})

/*
export class FileUpload {
  id: number;
  avatar: string | any;
}
*/

export class PcariformManageComponent implements OnInit {

  formUpload: FormGroup;
  _name: any;
  loading: boolean = false;

  @Input() method: string;
  @Input() withconsent: boolean;
  @Input() registryTypes: RegType[];
  @Input() departments: Department[];
  @Input() organizations: Organization[];
  @Input() is_created: boolean;
  @Input() is_processing = false;
  @Input() preview_url = '';

  private _form: Form;
  @Input() set form(value: Form) {
    if (value != null) {
      this._form = value;
      this.templateForm = this.toFormGroup(this._form);
    }
    console.warn(this._form, 'HELLO!');
  }// -- setter for forms

  @Output() onSubmitTrigger: EventEmitter<Form> = new EventEmitter();

  templateForm: FormGroup;
  status: any[];

  errors: any = {};
  has_errors = false;
  hide_key = true;

  constructor(
    private fb: FormBuilder,
    private keyGenerator: KeyGenerator,
    private formService: FormService,
    private caseService: CaseService,
    private router: Router
  ) {
    this.status = [
      { 'name': 'Pending', 'key': 'Pending' },
      { 'name': 'Approved', 'key': 'Approved' }
    ];
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $('#formname').focus();
  }

  private toFormGroup(data: any) {
    return this.fb.group({
      id: data.id,
      name: [
        { value: data.name, disabled: false },
        Validators.required
      ],
      status: [
        { value: data.status, disabled: false },
        Validators.required
      ],
      type: [
        { value: data.type, disabled: false },
        Validators.required
      ],
      organization: [
        { value: data.organization, disabled: false },
        Validators.required
      ],
      department: [
        { value: data.department, disabled: false },
        Validators.required
      ],
      validity_date: [
        { value: data.validity_date, disabled: false },
        Validators.required
      ],
      dir_path: [{ value: data.dir_path, disabled: false }]
    });
  }

  onAddSection() {
    this._form.sections.push(new Section(
      this.keyGenerator.create(),
      'Untitled section',
      0,
      []
    ));
  }

  onAddTableSection() {
    this._form.sections.push(new Section(
      this.keyGenerator.create(),
      'Untitled section',
      0,
      [],
      true
    ));
  }

  @ViewChild("fileInput") fileInput;

  onSaveForm(updated_form: Form) {
    console.log("new Update", updated_form);
    let fi = this.fileInput.nativeElement;
    let formModel = new FormData();

    if (fi.files && fi.files[0]) {
      formModel = fi.files[0];
      updated_form.dir_path = (fi.files[0].name).split(' ').join('_');
      updated_form.file = formModel;
    }

    console.log(updated_form, 'FORM!!');
    this.onSubmitTrigger.emit(updated_form);
  }

  onPreviewForm(preview_form: Form) {
    console.log(preview_form, 'NEW UPDATES');
    this.formService.currentForm = preview_form;
    this.router.navigate([this.preview_url]);
  }

  //Template function for upload directory
  onChangeFile() {
    console.log('new file');
    let fi = this.fileInput.nativeElement;
    let formModel = new FormData();
    this._form.dir_path = (fi.files[0].name).split(' ').join('_');
  }

  onUploadTemplate(path: string) {
    this.caseService
      .upload(path)
      .subscribe(upload => {
        console.log(upload)
      },
        errors => {
          this.errors = errors;
          this.has_errors = true;
          this.is_processing = false;
        }
      );
  }


  onSubmit() {
    console.log('this._name', this._name);

    let fi = this.fileInput.nativeElement;
    let formModel = new FormData();

    if (fi.files && fi.files[0]) {
      formModel = fi.files[0];
      console.log('FOMR MODEL', formModel);
    }

    this.loading = true;
    this.caseService
      .upload(formModel)
      .subscribe(upload => {
        console.log(upload)
        this.loading = false;
      },
        errors => {
          alert('pcari form error');
          this.errors = errors;
          this.has_errors = true;
          this.is_processing = false;
        }
      );

  }

}
