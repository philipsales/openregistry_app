import { Component, OnInit } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';

import { Spec } from 'app/core/models';
import { SpecService } from 'app/core/services';

@Component({
  selector: 'app-specs-create',
  templateUrl: './specs-create.component.html',
  styleUrls: ['./specs-create.component.css']
})
export class SpecsCreateComponent implements OnInit {

  new_spec: Spec;

  constructor() {
    this.new_spec = new Spec('');
   }

  ngOnInit() {
  }
  
}
