import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Helper } from '../../core/helper';

@Component({
  selector: 'app-my-account-menu',
  templateUrl: './my-account-menu.component.html',
  styleUrls: ['./my-account-menu.component.css']
})
export class MyAccountMenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout() {
    Helper.logout(this.router);
  }
}
