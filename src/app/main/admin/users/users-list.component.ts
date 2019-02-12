import { Component, OnInit } from '@angular/core';

import { UserService } from 'app/core/services';
import { User } from 'app/core/models';
import { NoJWTError } from 'app/core/errors';
import { UserPipe } from 'app/shared/_pipes/user.pipe';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: User[];
  searchText = '';
  filter = '';

  constructor(private userService: UserService) {
  }//--constructor

  ngOnInit() {
    this.userService.getAll().subscribe(
      users => {
        this.users = users;
      }, error => {
        console.warn(error);//get the error in error handler
        if (error instanceof NoJWTError) {
          console.warn('TO DO : handle JWT Expired');
        }
      }
    );
  }//--OnInit

}
