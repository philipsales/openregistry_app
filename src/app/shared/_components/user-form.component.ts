import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';
import {
    CompleterCmp,
    CompleterService,
    CompleterData,
    CompleterItem
} from 'ng2-completer';

import {
    User,
    Position,
    Organization,
    Role,
    Department
} from 'app/core/models';
import {
    UserService,
    PositionService,
    OrganizationService,
    RoleService,
    DepartmentService
} from 'app/core/services';

import { MatSelectionList } from '@angular/material';
import { FormControl } from '@angular/forms';
import { UserJSON } from 'app/core/interfaces';

@Component({
    selector: 'shared-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css']
})

export class UserFormComponent implements OnInit {

    _resetuser: UserJSON;
    _user: User;

    resetuser: User;


    @Input() set user(value: User) {
        this._user = value;
        this.resetuser = Object.assign({}, value);
        if (this._user.position) {
            // this.position_search = this._user.position;
            this.is_position_ok = true;
        }
        // this.departmentService.getDepartments().subscribe(
        //     (dept) => {
        //         this.departments = dept;
        //         // this.departmentCompleterData = this.departmentCompleterService.local(dept, 'name', 'name');
        //     }
        // );
    }// -- _reinit setter

    @Input() method: string;

    confirmation_password: String;

    position_search = '';
    positionCompleterData: CompleterData;
    @ViewChild('positionCompleter') positionCompleter: CompleterCmp;

    roles: Role[];
    @ViewChild('sel_roles') sel_roles: MatSelectionList;

    departments: Department[];
    @ViewChild('sel_departments') sel_departments: MatSelectionList;

    errors: any = {};

    organizationList = [];
    departmentList = [];
    positions = [
      new Position('Researcher'),
      new Position('Physician')
    ];

    has_errors = false;
    is_processing = false;
    is_organization_ok = false;
    is_position_ok = false;
    approval_status = [];

    constructor(
        private userService: UserService,
        private positionService: PositionService,
        private positionCompleterService: CompleterService,
        private organizationCompleterService: CompleterService,
        private organizationService: OrganizationService,
        private departmentCompleterService: CompleterService,
        private departmentService: DepartmentService,
        private roleService: RoleService,
        private _notificationsService: NotificationsService
    ) {

        this._user = new User('', false, '', '', '', '', '', [], '', false);
        this.resetuser = Object.assign({}, this._user);
        this._user.gender = 'M';
        this.confirmation_password = '';
        const position = [
            new Position('Researcher'),
            new Position('Physician')
        ];
        this.approval_status = [
            { "text": "Active", "value": true },
            { "text": "Inactive", "value": false }
        ];

        this.positionCompleterData = positionCompleterService.local(position, 'name', 'name');

        this.organizationService.list().subscribe(organizations => {
            this.organizationList = organizations;
        });

        this.departmentService.getAllDepartments().subscribe(departments => {
            this.departmentList = departments;
        });
    }

    ngOnInit() {
        this.roleService.getAll().subscribe(
            roles => {
                console.warn(roles, 'Roles ON service');
                this.roles = roles;
            },
            error => {
                console.log(error);
            }
        );

        this.departmentService.getDepartments().subscribe(
            departments => this.departments = departments,
            error => {
                console.log(error);
            }
        );
    }

    onToggleIsActive(input_is_active: boolean) {
        console.log(input_is_active);
        this._user.isActive = input_is_active;
    }

    onToggleGender(input_gender: string) {
        console.log(input_gender);
        this._user.gender = input_gender;
    }

    onSaveClick(input_user: User) {
        console.log(input_user, 'ONSAVECLICK');
        if (this.method === 'CREATE') {
            this.createUser(input_user);
        } else if (this.method === 'UPDATE') {
            this.updateUser(input_user);
        } else if (this.method === 'MYACCOUNT') {
            this.updateMyAccount(input_user);
        }
    }// --onSaveClick

    createUser(input_user: User) {
        this.errors = {};
        this.has_errors = false;
        this.is_processing = true;
        this.userService.create(input_user).subscribe(
            created_user => {
                this.is_processing = false;
                this.resetuser = Object.assign({}, input_user);
                this._notificationsService.success(
                    'New User : ' + input_user.username,
                    'Successfully Created',
                    {
                        timeOut: 10000,
                        showProgressBar: true,
                        pauseOnHover: false,
                        clickToClose: false,
                    });
            },
            errors => {
                this.errors = errors;
                this.has_errors = true;
                this.is_processing = false;
            });
    }

    updateUser(input_user: User) {
        this.errors = {};
        this.has_errors = false;
        this.is_processing = true;
        this.userService.update(input_user).subscribe(
            created_user => {
                this.is_processing = false;
                this.resetuser = Object.assign({}, input_user);
                this._notificationsService.success(
                    'User : ' + input_user.username,
                    'Successfully Updated',
                    {
                        timeOut: 10000,
                        showProgressBar: true,
                        pauseOnHover: false,
                        clickToClose: false,
                    });
            },
            errors => {
                this.errors = errors;
                this.has_errors = true;
                this.is_processing = false;
            });
    }

    updateMyAccount(input_user: User) {
        this.errors = {};
        this.has_errors = false;
        this.is_processing = true;
        this.userService.updateMyAccount(input_user).subscribe(
            created_user => {
                this.is_processing = false;
                this.resetuser = Object.assign({}, input_user);
                this._notificationsService.success(
                    'Account',
                    'Successfully Updated!',
                    {
                        timeOut: 10000,
                        showProgressBar: true,
                        pauseOnHover: false,
                        clickToClose: false,
                    });
            },
            errors => {
                this.errors = errors;
                this.has_errors = true;
                this.is_processing = false;
            });
    }

    compareWithId(selected, comparator) {
        return comparator != null && selected._id == comparator._id;
    }

    compareDepartmentId(selected, comparator) {
        console.log(comparator, 'micool comparator');
        console.log(selected, 'micool selected');
        console.log('\n');
        console.log(comparator != null && selected._id == comparator.id, 'matched');
        return comparator != null && selected._id == comparator.id;
    }
}
