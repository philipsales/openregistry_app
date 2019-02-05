import { Component, OnInit, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { MTA } from 'app/core/models';
import { MtaService } from 'app/core/services';

@Component({
  selector: 'app-mta-form',
  templateUrl: './mta-form.component.html',
  styleUrls: ['./mta-form.component.css']
})
export class MtaFormComponent implements OnInit {
  
  @Output() onSubmitTrigger = new EventEmitter<MTA>();

  @ViewChild('fileInput') fileInput;

  _readonly = false;
  @Input() set readonly(readonly: boolean) {
    this._readonly = readonly;
  }

  _form: MTA;
  @Input() set form(form: MTA) {
    this._form = form;
  }

  constructor(private mtaService: MtaService) { }

  ngOnInit() {
  }

  onChangeFile() {
    let fi = this.fileInput.nativeElement;
    let formModel = new FormData();

    if (fi.files && fi.files[0]) {
      formModel = fi.files[0];
      this._form.dir_path = (fi.files[0].name).split(' ').join('_');
      this._form.file = formModel;
    }
  }

  onClickAttachment() {
    this.mtaService.downloadAttachment(this._form).subscribe(file => {
      var url = window.URL.createObjectURL(file);
      window.open(url);
    }, err => {
      console.error(err, 'micool');
    });
  }

  onSubmit() {
    this.onSubmitTrigger.emit(this._form);
  }

}
