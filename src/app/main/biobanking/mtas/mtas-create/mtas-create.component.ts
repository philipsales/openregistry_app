import { Component, OnInit, ViewChild } from '@angular/core';
import { MTA } from 'app/core/models';
import { MtaService } from 'app/core/services';

@Component({
  selector: 'app-mtas-create',
  templateUrl: './mtas-create.component.html',
  styleUrls: ['./mtas-create.component.css']
})
export class MtasCreateComponent implements OnInit {

  @ViewChild('fileInput') fileInput;
  _form: MTA;

  constructor(private mtaService: MtaService) {
    this._form = new MTA('', '', false);
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
    formModel.set('name', this._form.name);

    this.mtaService.save(formModel).subscribe(
      (created_mta) => {
        console.log(created_mta, 'CREATED MTA');
      }, (error) => {
        console.log(error, 'ERROR on CREATE MTA');
      }
    );
  }

}
