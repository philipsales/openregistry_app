import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Department, Organization } from 'app/core/models';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { OrganizationService, DepartmentService } from 'app/core/services';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css']
})
export class DepartmentFormComponent implements OnInit {
  departmentForm: FormGroup;
  choicesOrganization:Organization[] = [];
  @Output() onSaveEvent = new EventEmitter<Department>();

  private _readonly = false;
  @Input() set readonly(readonly: boolean) {
    this._readonly = readonly;
    if (this.departmentForm != null) {
      if (!readonly) {
        this.departmentForm.enable();
      } else {
        this.departmentForm.disable();
      }
    }
  }
  get readonly(): boolean { return this._readonly; }

  @Input() serviceErrorMessage = '';
  private _department: Department = new Department();
  @Input() set department(department: Department) {
    if (this.departmentForm != null) {
      let {id, ...modelValue} = department;
      this.departmentForm.reset(modelValue);
    }
    this._department = department;
  }
  get department() { return this._department; }

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private organizationService: OrganizationService) {
    this.departmentForm = this.fb.group({
      name: ['', Validators.required, this.validDepartmentName()],
      description: '',
      code: '',
      organization: ''
    });

    if (this.readonly) {
      this.departmentForm.disable();
    }

    this.organizationService.getAll().subscribe(orgs => {
      this.choicesOrganization = orgs;
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    const formModel = this.departmentForm.value;
    this.onSaveEvent.next(new Department(formModel));
  }

  compareOrganizationSelectValue(selected, comparator) {
    return comparator != null && selected.id == comparator.id;
  }

  validDepartmentName(): ValidatorFn {
    return (input: AbstractControl) => new TimerObservable(500).pipe(
      switchMap(() => {
        return this.departmentService
        .isDepartmentNameValid(this.department.id, input.value).pipe(
          map(isValid => {
            return (!isValid ? {nameTaken: true} : null)})
        )
      })
    )
  }
}
