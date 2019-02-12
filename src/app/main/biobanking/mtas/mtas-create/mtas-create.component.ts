import { Component, OnInit, ViewChild } from '@angular/core';
import { MTA } from 'app/core/models';
import { MtaService } from 'app/core/services';

import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-mtas-create',
  templateUrl: './mtas-create.component.html',
  styleUrls: ['./mtas-create.component.css']
})
export class MtasCreateComponent implements OnInit {

  @ViewChild('fileInput') fileInput;
  _form: MTA;

  readonly = false;

  constructor(
    private mtaService: MtaService,
    private _notificationsService: NotificationsService) {
    this._form = new MTA('', '', '', '', false);
  }

  ngOnInit() {
  }

  onSubmit(form: MTA) {
    this.mtaService.upsert(form).subscribe(created_mta => {
      this._form = created_mta;
      this.readonly = true;
      this._notificationsService.success(
        'New MTA : ' + created_mta.name,
        'Successfully Created',
        {
          timeOut: 30*1000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: false,
        });
      }, error => {
        this._notificationsService.error(
          'Create MTA : ' + form.name,
          'Creation Failed',
          {
            timeOut: 30*1000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: false,
          });
      });
  }
}
