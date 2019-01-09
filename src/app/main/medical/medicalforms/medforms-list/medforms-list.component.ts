import { Component, OnInit } from '@angular/core';

import { FormService } from 'app/core/services';
import { Form } from 'app/core/models';
import { NotificationsService } from 'angular2-notifications';

import { environment } from 'environments/environment';

@Component({
  selector: 'app-medforms-list',
  templateUrl: './medforms-list.component.html',
  styleUrls: ['./medforms-list.component.css']
})
export class MedformsListComponent implements OnInit {
  type = environment.FORM_TYPE_MEDICAL;
  // forms: Form[];

  constructor(
    private formService: FormService) {
    // this.forms = [];
  }

  ngOnInit() {
    this.formService.currentForm = undefined;
    this.initForms();
  }

  initForms() {
    // this.formService.getMedicalForms().subscribe(
    //   forms => {
    //     this.forms = forms;
    //   }
    // );
  }

}
