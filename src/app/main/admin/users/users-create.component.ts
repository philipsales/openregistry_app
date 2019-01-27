import { Component, OnInit } from '@angular/core';
import { User } from 'app/core/models';

@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.css']
})
export class UsersCreateComponent implements OnInit {

  new_user: User;

  constructor() { }

  ngOnInit() {
    this.new_user = new User('', false, '', '', '', '', '', [], '', false);
  }

}
