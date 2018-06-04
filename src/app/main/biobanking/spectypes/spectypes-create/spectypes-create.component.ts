import { Component, OnInit } from '@angular/core';

import { SpecType } from 'app/core/models';

@Component({
  selector: 'app-spectypes-create',
  templateUrl: './spectypes-create.component.html',
  styleUrls: ['./spectypes-create.component.css']
})
export class SpectypesCreateComponent implements OnInit {

  new_spectype: SpecType;

  constructor() {
    this.new_spectype = new SpecType('');
   }

  ngOnInit() {
  }

}
