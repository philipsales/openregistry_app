import { Component, OnInit, ViewChild } from '@angular/core';

import { RoleService } from 'app/core/services';
import { Role } from 'app/core/models';
import { MatPaginator } from '@angular/material';
import { RolePipe } from 'app/shared/_pipes/role.pipe';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.css']
})
export class RolesListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  sort = 1; // desc == -1
  pagelength:number;

  roles: Role[];
  searchText = '';
  filter = '';

  constructor(private roleService: RoleService) {
  }//--constructor

  ngOnInit() {
    this.getRoles({pageIndex: 0, pageSize: 10});
  }

  doSort() {
    this.sort = this.sort == 1 ? -1 : 1;
    this.getRoles(this.paginator);
  }

  doSearch(newObject: any) {
    let pageIndex = 0;
    let pageSize = 10;
    this.getRoles({pageIndex, pageSize}, true);
  }

  getRoles(paginator={
    pageIndex: 0, 
    pageSize: 10}, reset=false) {
    this.roleService.list(paginator.pageIndex, 
      paginator.pageSize,
      this.searchText,
      this.sort)
      .subscribe(result => {
        this.roles = result.roles;
        this.pagelength = result.count;
        if (reset) {
          this.paginator.pageIndex = 0;
        }
      })
  }
}
