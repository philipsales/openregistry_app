import { Component, OnInit } from '@angular/core';

import { FormService } from 'app/core/services';
import { Form } from 'app/core/models';

import { environment } from 'environments/environment';

@Component({
  selector: 'app-bioforms-list',
  templateUrl: './bioforms-list.component.html',
  styleUrls: ['./bioforms-list.component.css']
})
export class BioformsListComponent implements OnInit {
  type = environment.FORM_TYPE_BIOBANK;

  constructor(private formService: FormService) {
    this.formService.currentForm = undefined;
  }

  ngOnInit() {
  }

  onDeleteForm(for_delete: Form) {
    console.log(for_delete, 'FORM FOR DELETE');
  }
}
