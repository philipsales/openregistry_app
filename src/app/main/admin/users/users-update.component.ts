import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';

import { UserService } from 'app/core/services';

import { User } from 'app/core/models';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NoJWTError } from 'app/core/errors';
import { UserJSON } from 'app/core/interfaces';

@Component({
  selector: 'app-users-update',
  templateUrl: './users-update.component.html',
  styleUrls: ['./users-update.component.css']
})
export class UsersUpdateComponent implements OnInit {

  user: User;
  user_id: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.user = new User('', true, '', '', '', 'M', '', [], '', false);
  }

  ngOnInit() {
    this.user_id = this.route.snapshot.paramMap.get('id');
    this.userService.get(this.user_id).subscribe((response: User) => {
      delete this.user;
      this.user = response;
    }, error => {
      console.log(error); // get the error in error handler
      if (error instanceof NoJWTError) {
        console.warn('TO DO : handle JWT Expired');
      }
    });
  }
}
