import { Component, OnInit } from '@angular/core';

import { RoleService } from 'app/core/services';
import { Role } from 'app/core/models';
import { RolePipe } from 'app/shared/_pipes/role.pipe';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.css']
})
export class RolesListComponent implements OnInit {

  roles: Role[];
  searchText = '';
  filter = '';

  constructor(private roleService: RoleService) {
  }//--constructor

  ngOnInit() {
    this.roleService.getAll().subscribe(roles => {
      this.roles = roles;
      console.warn(roles);
    });
  }//--OnInit

}
