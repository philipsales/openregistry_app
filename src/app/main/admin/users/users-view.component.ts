import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';

import { UserService } from 'app/core/services';

import { User } from 'app/core/models';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NoJWTError } from 'app/core/errors';
import { UserJSON } from 'app/core/interfaces';


@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.css']
})
export class UsersViewComponent implements OnInit {

  user: User;
  user_id: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.user = new User('', true, '', '', '', 'M', '', '', '', '', false);
  }

  ngOnInit() {
    this.user_id = this.route.snapshot.paramMap.get('id');
    this.userService.get(this.user_id).subscribe((response: User) => {
      delete this.user;
      this.user = response;
      console.log(response);
    }, error => {
      console.log(error); // get the error in error handler
      if (error instanceof NoJWTError) {
        console.warn('TO DO : handle JWT Expired');
      }
    });
  }

}
