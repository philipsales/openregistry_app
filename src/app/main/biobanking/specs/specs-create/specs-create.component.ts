import { Component, OnInit } from '@angular/core';

import { Spec } from 'app/core/models';

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
