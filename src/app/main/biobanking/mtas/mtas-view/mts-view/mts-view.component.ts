import { Component, OnInit, ViewChild } from '@angular/core';
import { MTA } from 'app/core/models';
import { ActivatedRoute } from '@angular/router';
import { MtaService } from 'app/core/services';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-mts-view',
  templateUrl: './mts-view.component.html',
  styleUrls: ['./mts-view.component.css']
})
export class MtsViewComponent implements OnInit {

  mta_id: string;

  @ViewChild('fileInput') fileInput;
  _form: MTA;

  readonly = true;

  constructor(
    private route: ActivatedRoute,
    private mtaService: MtaService,
    private notificationService: NotificationsService
  ) {
    this._form = new MTA('', '', '', '', false);
  }

  ngOnInit() {
    this.mta_id = this.route.snapshot.paramMap.get('id');
    this.mtaService.get(this.mta_id).subscribe(mta => {
      this._form = mta;
    })
  }

}
