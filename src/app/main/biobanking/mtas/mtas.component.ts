import { Component, OnInit } from '@angular/core';

import { MtaService } from 'app/core/services';
import { MTA } from 'app/core/models';
import { NoJWTError } from 'app/core/errors';
import { environment } from 'environments/environment';
import { NotificationsService } from 'angular2-notifications';

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

  constructor(
    private mtaService: MtaService,
    private notificationService: NotificationsService) {
    this.download_url = environment.API_ENDPOINT + 'mtas/';
  }// --constructor

  delete(mta: MTA) {
    this.mtaService.delete(mta.id).subscribe(mta => {
      this.mtas.forEach((_mta, index, object) => {
        if (_mta.id == mta.id) {
          object.splice(index, 1);
        }
      });
      this.notificationService.success(
        'Removed MTA : ' + mta.name,
        'Successfully Deleted',
        {
          timeOut: 30*1000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: false,
        });
    }, error => {
      this.notificationService.error(
        'Removing MTA : ' + mta.name,
        'Deletion Failed',
        {
          timeOut: 30*1000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: false,
        });
    });
  }

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
