import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MtaService } from 'app/core/services';
import { NotificationsService } from 'angular2-notifications';
import { MTA } from 'app/core/models';

@Component({
  selector: 'app-mts-update',
  templateUrl: './mts-update.component.html',
  styleUrls: ['./mts-update.component.css']
})
export class MtsUpdateComponent implements OnInit {

  mta_id: string;

  @ViewChild('fileInput') fileInput;
  _form: MTA;

  readonly = false;

  constructor(
    private route: ActivatedRoute,
    private mtaService: MtaService,
    private _notificationsService: NotificationsService) {
    this._form = new MTA('', '', '', '', false);
  }

  ngOnInit() {
    this.mta_id = this.route.snapshot.paramMap.get('id');
    this.mtaService.get(this.mta_id).subscribe(mta => {
      this._form = mta;
    })
  }

  onSubmit(mta: MTA) {
    this.mtaService.upsert(mta).subscribe(updated_mta => {
      this.readonly = true;
      this._notificationsService.success(
        'Update MTA : ' + updated_mta.name,
        'Successfully Updated',
        {
          timeOut: 30*1000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: false,
        });
      }, error => {
        this._notificationsService.error(
          'Update MTA : ' + mta.name,
          'Updating Failed',
          {
            timeOut: 30*1000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: false,
          });
      });
  }

}
