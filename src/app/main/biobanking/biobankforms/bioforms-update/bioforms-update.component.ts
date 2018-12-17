import { Component, OnInit, ViewChild } from '@angular/core';
import { FormService } from '../../../../core/services';
import { Form, RegType, Department, Organization } from 'app/core/models';
import { RegTypeService } from 'app/core/services/regtype.service';
import { DepartmentService } from 'app/core/services/department.service';
import { OrganizationService } from 'app/core/services/organization.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { BioformsFormComponent } from '../bioforms-form/bioforms-form.component';
import { DialogService } from 'app/core/services/dialog.service';
import { Observable } from 'rxjs';
import { MainComponent } from 'app/main/main.component';

@Component({
  selector: 'app-bioforms-update',
  templateUrl: './bioforms-update.component.html',
  styleUrls: ['./bioforms-update.component.css']
})
export class BioformsUpdateComponent implements OnInit {
  @ViewChild(BioformsFormComponent) bioformcomponent;

  for_update: Form;
  registryTypes: RegType[];
  departments: Department[];
  organizations: Organization[];
  is_updated = false;
  is_processing = false;

  constructor(
    private dialogService: DialogService,
    private formService: FormService,
    private regTypeService: RegTypeService,
    private departmentService: DepartmentService,
    private organizationService: OrganizationService,
    private notificationsService: NotificationsService,
    private router: Router
  ) {
    if (this.formService.currentForm) {
      if (this.formService.currentForm.sections.length > 0) {
        this.for_update = this.formService.currentForm;
      } else {
        this.formService.getForm(this.formService.currentForm.id).subscribe((form: Form) => {
          this.for_update = form;
        });
      }
    } else {
      this.router.navigate(['biobanking/forms']);
    }
  }

  ngOnInit() {
    this.regTypeService.getRegTypes().subscribe(regType => {
      this.registryTypes = regType;
    });
    this.departmentService.getDepartments().subscribe(departments => {
      this.departments = departments;
    });
    this.organizationService.getAll().subscribe(organizations => {
      this.organizations = organizations;
    });
  }

  canDeactivate(): Observable<boolean> | boolean {
    // if (!MainComponent.isExpired && this.bioformcomponent.bioform.dirty) {
    //   return this.dialogService.confirm('Discard changes?');
    // }
    return true;
  }

  onSubmitTrigger(form_to_submit: Form) {
    this.is_processing = true;
    console.log(form_to_submit, 'SUBMITTING');
    const data = form_to_submit.toJSON();
    this.formService
      .updateForm(data)
      .subscribe(
        created_question => {
          console.warn(created_question, 'AYUS');
          this.is_processing = false;
          this.is_updated = true;
          this.notificationsService
            .success(
              'Form: ' + data.name,
              'Successfully Updated.',
              {
                timeOut: 10000,
                showProgressBar: true,
                pauseOnHover: false,
                clickToClose: false
              });
        }, errors => {
          this.is_processing = false;
          console.warn('error');
          throw errors;
        });
  }
}
