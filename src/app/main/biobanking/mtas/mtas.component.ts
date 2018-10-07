import { Component, OnInit } from '@angular/core';

import { MtaService } from 'app/core/services';
import { MTA } from 'app/core/models';
import { NoJWTError } from 'app/core/errors';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-mtas',
  templateUrl: './mtas.component.html',
  styleUrls: ['./mtas.component.css']
})
export class MtasComponent implements OnInit {

  mtas: MTA[];
  download_url = '';
  searchText = '';
  filter = '';

  constructor(private mtaService: MtaService) {
    this.download_url = environment.API_ENDPOINT + 'mtas/';
  }// --constructor

  ngOnInit() {
    this.mtaService.getAll().subscribe(
      mtas => {
        this.mtas = mtas;
        console.warn(mtas);
      }, error => {
        console.log(error); // get the error in error handler
        if (error instanceof NoJWTError) {
          console.warn('TO DO : handle JWT Expired');
        }
      }
    );
  }// --OnInit

}
