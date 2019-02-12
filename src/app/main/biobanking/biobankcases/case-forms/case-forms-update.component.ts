import { Component, OnInit } from '@angular/core';
import { Form, FormAnswer, Answer } from 'app/core/models';
import { ActivatedRoute } from '@angular/router';
import { FormService, FormAnswerService } from 'app/core/services';
import { NoJWTError } from 'app/core/errors';

@Component({
  selector: 'app-case-forms-update',
  templateUrl: './case-forms-update.component.html',
  styleUrls: ['./case-forms-update.component.css']
})
export class CaseFormsUpdateComponent implements OnInit {

  private answers = new Map<string, string>();

  caseform: Form;
  caseid = '';
  casenumber = '';
  dirpath = '';
  form_answer_id = '';
  form_id = '';

  constructor(
    private route: ActivatedRoute,
    private formAnswerService: FormAnswerService,
    private formService: FormService
  ) {
    this.caseform = new Form('', '', [], [], '', '');
  }

  ngOnInit() {
    this.caseid = this.route.snapshot.paramMap.get('id');
    this.form_answer_id = this.route.snapshot.paramMap.get('formid');
    this.casenumber = this.route.snapshot.queryParamMap.get('nbr');

    this.formAnswerService.get(this.caseid, this.form_answer_id).subscribe((response: FormAnswer) => {
      const form_answers = response;
      this.form_id = form_answers.form_id;
      if (form_answers.answers) {
        this.answers.clear();
        form_answers.answers.map((answer: Answer) => {
          this.answers.set(answer.key, answer.answer);
        });
      }

      this.formService.getForm(this.form_id).subscribe((recv_form: Form) => {
        delete this.caseform;
        this.caseform = recv_form;
        this.dirpath = recv_form.dir_path;
      }, error => {
        console.log(error); // get the error in error handler
        if (error instanceof NoJWTError) {
          console.warn('TO DO : handle JWT Expired');
        }
      });
    }, error => {
      console.log(error); // get the error in error handler
      if (error instanceof NoJWTError) {
        console.warn('TO DO : handle JWT Expired');
      }
    });
  }

}
