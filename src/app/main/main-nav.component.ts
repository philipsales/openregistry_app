import { Component, OnInit } from '@angular/core';
import { User } from 'app/core/models';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  roles: string[];
  private firstname: string;

  constructor() { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.firstname = user.first_name;
    this.roles = user.roles;
  }

}
