import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, UserService, OrganizationService, DepartmentService } from 'app/core/services';
import { User, Organization, Position } from 'app/core/models';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {

  _show: boolean;
  @Input() set show(value: boolean) {
    console.warn(this._show);
    this._show = value;
    this.reset();
  }// -- _reinit setter

  model: any = {};
  password = '';
  loading = false;
  error = '';
  show_reset = false;
  is_successful = false;
  is_error = false;
  confirm_password = '';
  valid_email = false;

  organizationList = [];
  departmentList = [];
  positions = [
    new Position('Administrator'),
    new Position('Encoder'),
    new Position('Researcher'),
    new Position('Physician'),
  ];

  constructor(
    private router: Router,
    private userService: UserService,
    private departmentService: DepartmentService,
    private organizationService: OrganizationService,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.model['password'] = '';
    this.model['organizations'] = [];
    this.model['positions'] = [];
    this.model['departments'] = [];

    this.organizationService.getAll().subscribe(organizations => {
      this.organizationList = organizations;
    });

    this.departmentService.getAllDepartments().subscribe(departments => {
      this.departmentList = departments;
    });

  }// --ngOnInit

  validateEmail() {
    // tslint:disable-next-line:max-line-length
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.valid_email = re.test(this.model['username']);
  }

  reset() {
    this.model = {};
    this.is_successful = false;
    this.loading = false;
    this.is_error = false;
    this.confirm_password = '';
    this.valid_email = false;
  }

  signup() {
    this.is_error = false;
    this.is_successful = false;
    this.loading = true;
    const user = User.fromJSON(this.model);
    // if (true) return
    this.userService.create(user).subscribe(
      created_user => {
        this.loading = false;
        console.warn('OK!');
        this.is_successful = true;
      },
      errors => {
        this.error = errors;
        this.loading = false;
        this.is_error = true;
      });
   
  }// --login

  onUpdatedUserEvent(new_password: string) {
  }

  onCancelUpdatedEvent() {
  }
}
