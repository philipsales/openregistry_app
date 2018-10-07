import { Component, OnInit } from '@angular/core';

import { environment } from 'environments/environment';

import { SpecTypeService } from 'app/core/services';
import { SpecType } from 'app/core/models';
import { NoJWTError } from 'app/core/errors';
import { SpectypePipe } from 'app/shared/_pipes/spectype.pipe';

@Component({
  selector: 'app-spectypes-list',
  templateUrl: './spectypes-list.component.html',
  styleUrls: ['./spectypes-list.component.css']
})
export class SpectypesListComponent implements OnInit {

  spectypes: SpecType[];
  download_url = '';
  searchText = '';
  filter = '';

  constructor(private specTypeService: SpecTypeService) {

    this.download_url = environment.API_ENDPOINT + 'SpecTypes/';

  }// --constructor

  ngOnInit() {

    this.specTypeService.getAll().subscribe(
      this_spectypes => {
        this.spectypes = this_spectypes;
        console.warn(this_spectypes);
      }, error => {
        console.log(error); // get the error in error handler
        if (error instanceof NoJWTError) {
          console.warn('TO DO : handle JWT Expired');
        }
      }
    );

  }// --OnInit

}// --SpecTypeTypeListComponent
