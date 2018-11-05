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

  constructor(
    private mtaService: MtaService,
    private _notificationsService: NotificationsService) {
    this._form = new MTA('', '', '', '', false);
  }

  ngOnInit() {
  }


  onChangeFile() {
    console.log('new file');
    let fi = this.fileInput.nativeElement;
    // let formModel = new FormData();
    this._form.dir_path = (fi.files[0].name).split(' ').join('_');
  }

  saveMTA() {
    console.log(this._form, 'MTA');
    let fi = this.fileInput.nativeElement;
    let formModel = new FormData();
    /*
    if (fi.files && fi.files[0]) {
      formModel = fi.files[0];
      console.log('FOMR MODEL', formModel);
    }
    */
    // formModel.set('name', this._form.name);
    formModel.append('name', this._form.name);
    formModel.append('type', this._form.type);
    formModel.append('description', this._form.description);

    this.mtaService.save(formModel).subscribe(
      (created_mta) => {
        this._notificationsService.success(
          'New MTA : ' + this._form.name,
          'Successfully Created',
          {
            timeOut: 60*1000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: false,
          }
        );
      }, (error) => {
        console.log(error, 'ERROR on CREATE MTA');
      }
    );
  }

}
