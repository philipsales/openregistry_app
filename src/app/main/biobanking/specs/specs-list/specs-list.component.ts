import { Component, OnInit } from '@angular/core';

import { environment } from 'environments/environment';

import { SpecService } from 'app/core/services';
import { Spec } from 'app/core/models';
import { NoJWTError } from 'app/core/errors';

@Component({
  selector: 'app-specs-list',
  templateUrl: './specs-list.component.html',
  styleUrls: ['./specs-list.component.css']
})
export class SpecsListComponent implements OnInit {

  specs: Spec[];
  download_url = '';

  constructor(private specService: SpecService) {

    this.download_url = environment.API_ENDPOINT + 'specs/';

  }// --constructor

  ngOnInit() {

    this.specService.getAll().subscribe(
      specs => {
        this.specs = specs;
        console.warn(specs);
      }, error => {
        console.log(error); // get the error in error handler
        if (error instanceof NoJWTError) {
          console.warn('TO DO : handle JWT Expired');
        }
      }
    );

  }// --OnInit

}// --SpecsListComponent
