import { Component, OnInit, ViewChild } from '@angular/core';

import { MtaService } from 'app/core/services';
import { MTA } from 'app/core/models';
import { NoJWTError } from 'app/core/errors';
import { environment } from 'environments/environment';
import { MatPaginator } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-mtas',
  templateUrl: './mtas.component.html',
  styleUrls: ['./mtas.component.css']
})
export class MtasComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  mtas: MTA[];
  download_url = '';
  sort = 0; // desc == -1
  pagelength:number;
  searchText = '';
  filter = '';

  constructor(
    private mtaService: MtaService,
    private notificationService: NotificationsService) {}// --

  ngOnInit() {
    this.getMTAs({pageIndex: 0, pageSize: 10});
  }// --OnInit


  doSort() {
    this.sort = this.sort == 1 ? -1 : 1;
    this.getMTAs(this.paginator);
  }

  doSearch(newObject: any) {
    let pageIndex = 0;
    let pageSize = 10;
    this.getMTAs({pageIndex, pageSize}, true);
  }

  getMTAs(paginator={
      pageIndex: 0, 
      pageSize: 10
    }, 
    reset=false) 
  {
    this.mtaService.list(paginator.pageIndex, 
      paginator.pageSize,
      this.searchText,
      this.sort)
      .subscribe(result => {
        this.mtas = result.mtas;
        this.pagelength = result.count;
        if (reset) {
          this.paginator.pageIndex = 0;
        }
      });
  }

  onClickAttachment(mta: MTA) {
    this.mtaService.downloadAttachment(mta).subscribe(file => {
      var url = window.URL.createObjectURL(file);
      window.open(url);
    }, err => {
      console.error(err, 'micool');
    });
  }

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

}
