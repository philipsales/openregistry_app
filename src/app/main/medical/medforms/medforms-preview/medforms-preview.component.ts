import { Component, OnInit } from '@angular/core';
import { Form } from 'app/core/models';
import { FormService } from '../../../../core/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medforms-preview',
  templateUrl: './medforms-preview.component.html',
  styleUrls: ['./medforms-preview.component.css']
})
export class MedformsPreviewComponent implements OnInit {

  private caseform: Form;
  private caseid = '';
  private casenumber = '';
  private form_answer_id = '';
  private form_id = '';
  private answers = new Map<string, string>();

  constructor(
    private formService: FormService,
    private router: Router
  ) {
    this.caseid = '';
    this.form_answer_id = '';
    this.casenumber = '';
    if (this.formService.currentForm) {
      this.caseform = this.formService.currentForm;
      console.log(this.caseform, 'hello');
    } else {
      this.router.navigate(['medical/medforms']);
    }
  }

  ngOnInit() {
  }

}
