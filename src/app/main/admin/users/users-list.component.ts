import { Component, OnInit, ViewChild } from '@angular/core';

import { UserService } from 'app/core/services';
import { User } from 'app/core/models';
import { NoJWTError } from 'app/core/errors';
import { UserPipe } from 'app/shared/_pipes/user.pipe';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  sort = 1; // desc == 1
  pagelength:number;

  users: User[];
  searchText = '';
  filter = '';

  constructor(private userService: UserService) {
  }//--constructor

  ngOnInit() {
    this.getUsers({pageIndex: 0, pageSize: 10});
  }//--OnInit


  doSort() {
    this.sort = this.sort == 1 ? -1 : 1;
    this.getUsers(this.paginator);
  }

  doSearch(newObject: any) {
    let pageIndex = 0;
    let pageSize = 10;
    this.getUsers({pageIndex, pageSize}, true);
  }

  getUsers(paginator={
    pageIndex: 0, 
    pageSize: 10}, reset=false) {
    this.userService.list(paginator.pageIndex, 
      paginator.pageSize,
      this.searchText,
      this.sort)
      .subscribe(result => {
        this.users = result.users;
        this.pagelength = result.count;
        if (reset) {
          this.paginator.pageIndex = 0;
        }
      })
  }

}
