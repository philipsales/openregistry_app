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


    @Input() set user(value: User) {
        this._user = value;
        if (this._user.organizations) {
            this.organization_search = this._user.organizations;
            this.is_organization_ok = true;
        }
        if (this._user.position) {
            this.position_search = this._user.position;
            this.is_position_ok = true;
        }
        this._resetuser = this._user.toJSON();
        if (this._user.department) {
            this.department_search = this._user.department;
            this.is_department_ok = true;
        } else {
            this.department_search = '';
        }
        console.warn(this.department_search, 'HELLO!');
        this.departmentService.getDepartments().subscribe(
            (dept) => {
                this.departmentCompleterData = this.departmentCompleterService.local(dept, 'name', 'name');
            }
        );
    }// -- _reinit setter

    @Input() method: string;

    confirmation_password: String;

    position_search = '';
    positionCompleterData: CompleterData;
    @ViewChild('positionCompleter') positionCompleter: CompleterCmp;

    organization_search = '';
    organizationCompleterData: CompleterData;
    @ViewChild('organizationCompleter') organizationCompleter: CompleterCmp;

    roles: Role[];
    @ViewChild('sel_roles') sel_roles: MatSelectionList;

    department_search;
    departmentCompleterData: CompleterData;
    @ViewChild('departmentCompleter') departmentCompleter: CompleterCmp;

    errors: any = {};

    has_errors = false;
    is_processing = false;
    is_organization_ok = false;
    is_position_ok = false;
    is_department_ok = false;
    approval_status = [];
    departments: Department[];

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

        this._user = new User('', false, '', '', '', '', '', '', '', '', false);
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
        this.organizationCompleterData = organizationCompleterService.local(
            this.organizationService.getAll(), 'name', 'name');
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
    }

    onToggleIsActive(input_is_active: boolean) {
        console.log(input_is_active);
        this._user.isActive = input_is_active;
    }

    onToggleGender(input_gender: string) {
        console.log(input_gender);
        this._user.gender = input_gender;
    }

    onSelectOrganization(data: CompleterItem) {
        if (data) {
            this._user.organizations = this.organization_search;
            this.is_organization_ok = true;
        } else {
            this.is_organization_ok = false;
        }

        console.log(this.organization_search, 'organization');
    }

    isOrganizationsOpen(isOpen: boolean) {
        if (isOpen) {
            this.organization_search = "";
            this.is_organization_ok = false;
        }
    }

    onSelectPosition(data: CompleterItem) {
        if (data) {
            this._user.position = data.title;
            this.is_position_ok = true;
        } else {
            this.is_position_ok = false;
        }
    }

    isPositionOpen(isOpen: boolean) {
        if (isOpen) {
            this.position_search = "";
            this.is_position_ok = false;
        }
    }

    onRolesListChanged(cur_roles: MatSelectionList) {
        this._user.roles = this.sel_roles.selectedOptions.selected.map(item => item.value);
        console.log(this._user.roles, 'SELECTED');
    }

    onOrganizationSearchClick() {
        if (this.organizationCompleter.isOpen()) {
            this.organizationCompleter.close();
        } else {
            this.organizationCompleter.open();
        }
    }

    onSelectDepartment(data: CompleterItem) {
        if (data && data.originalObject) {
            console.log(data, 'COMPLETER');
            this._user.department = data.originalObject.name;
            this.is_department_ok = true;
        }
        console.log(this.department_search, 'COMPLETER');
        console.log(this._user.department, 'COMPLETER');
        this.is_department_ok = (this._user.department) ? true : false;
    }

    isDepartmentOpen(isOpen: boolean) {
        if (isOpen) {
            this.department_search = "";
            this.is_department_ok = false;
        }
    }

    onDepartmentSearchClick() {
        if (this.departmentCompleter.isOpen()) {
            this.departmentCompleter.close();
        } else {
            this.departmentCompleter.open();
        }
    }

    onPositionSearchClick() {
        if (this.positionCompleter.isOpen()) {
            this.positionCompleter.close();
        } else {
            this.positionCompleter.open();
        }
    }

    onResetUserClick() {
        this._user = User.fromJSON(this._resetuser);
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
                this._notificationsService.success(
                    'Successfully Updated Account',
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
}
