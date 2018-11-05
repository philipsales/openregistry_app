import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';

import { Role, Permission } from 'app/core/models';
import { RoleService, PermissionService } from 'app/core/services';
import { MatSelectionList } from '@angular/material';
import { RoleJSON } from 'app/core/interfaces';

@Component({
    selector: 'app-roles-manage',
    templateUrl: './roles-manage.component.html',
    styleUrls: ['./roles-manage.component.css']
})
export class RolesManageComponent implements OnInit {
    _resetrole: RoleJSON;
    _role: Role;
    @Input() set role(value: Role) {
        this._role = value;
        if (!this._role.permissions) {
            this._role.permissions = [];
        }
        this._resetrole = this._role.toJSON();
        console.warn('HELLO!');
    }// -- _reinit setter

    @Input() method: string;

    errors: any = {};
    has_errors = false;
    is_processing = false;
    permissions: Permission[];
    selected_permissions: String[];

    @ViewChild('permission') permission: MatSelectionList;

    constructor(
        private roleService: RoleService,
        private permissionService: PermissionService,
        private _notificationsService: NotificationsService
    ) {
        this._role = new Role('', '', false);
    }// --constructor

    ngOnInit() {
        this.permissionService.getAll().subscribe(
            permissions => {
                console.warn(permissions, 'PERMISSIONS ON service');
                this.permissions = permissions;
            },
            error => {
                console.log(error);
            }
        );
    }

    onResetRoleClick() {
        this._role = Role.fromJSON(this._resetrole);
    }

    onPermissionListChanged(list) {
        this._role.permissions = this.permission.selectedOptions.selected.map(item => item.value);
        console.log(this._role.permissions, 'SELECTED');
    }

    onToggleIsActive(input_is_active: boolean) {
        this._role.isActive = input_is_active;
    }

    onSaveClick(role: Role) {
        if (this.method === 'CREATE') {
            this.createRole(role);
        } else if (this.method === 'UPDATE') {
            this.updateRole(role);
        }
    }// --onSaveClick

    createRole(role: Role) {
        console.log(role, 'My Role');
        this.errors = {};
        this.has_errors = false;
        this.is_processing = true;
        this.roleService.create(role).subscribe((created_role: Role) => {
            this.is_processing = false;
            console.log(created_role, 'ROLE CREATED : roles-create.component');
            this._notificationsService.success(
                'New Role : ' + role.name,
                'Successfully Created',
                {
                    timeOut: 60*1000,
                    showProgressBar: true,
                    pauseOnHover: false,
                    clickToClose: false,
                }
            );
        },
            errors => {
                console.log(errors, 'ERROR : roles-create.component');
                this.errors = errors;
                this.has_errors = true;
                this.is_processing = false;
            });
    }

    updateRole(role: Role) {
        console.log(role, 'My Role');
        this.errors = {};
        this.has_errors = false;
        this.is_processing = true;
        this.roleService.update(role).subscribe((updated_role: Role) => {
            this.is_processing = false;
            console.log(updated_role, 'ROLE UPDATED : roles-manage.component');
            this._notificationsService.success(
                'Role : ' + role.name,
                'Successfully Updated',
                {
                    timeOut: 10000,
                    showProgressBar: true,
                    pauseOnHover: false,
                    clickToClose: false,
                }
            );
        },
            errors => {
                console.log(errors, 'ERROR : roles-manage.component');
                this.errors = errors;
                this.has_errors = true;
                this.is_processing = false;
            });
    }
}
