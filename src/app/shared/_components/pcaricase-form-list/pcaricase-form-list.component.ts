import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormAnswer, Answer, Form, SpecForm, Case } from 'app/core/models';
import { FormService, FormAnswerService, CaseService } from 'app/core/services';
import { NoJWTError } from 'app/core/errors';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-pcaricase-form-list',
  templateUrl: './pcaricase-form-list.component.html',
  styleUrls: ['./pcaricase-form-list.component.css']
})
export class PcaricaseFormListComponent implements OnInit {
  answers = new Map<string, string>();
  caseform: Form;
  dirpath = '';
  is_ok = false;
  form_answer_id = '';
  specs = [
    {value: 'urine', viewValue: 'Urine'},
    {value: 'stool', viewValue: 'stool'},
  ];
  spectypes = [
    {value: 'frozen', viewValue: 'Frozen'},
    {value: 'embedded', viewValue: 'Embedded'},
  ];

  @Input() caseid: string;
  @Input() casenumber: string;
  @Input() specform: SpecForm[] = [];
  @Input() method: string;
  @Input() update_url: string;
  @Input() view_url: string;

  _forms: FormAnswer;
  @Input() set forms(value: FormAnswer) {
    console.log('yahooo!');
    if (value) {
      this._forms = value;
      if (value.answers) {
        value.answers.map((answer: Answer) => {
          this.answers.set(answer.key, answer.answer);
        });
      }
    }
  }

  _show: boolean;
  @Input() set show(value: boolean) {
    console.warn(this._show);
    this._show = value;
  }// -- _reinit setter

  @Output() onCallSelectFormTrigger: EventEmitter<null> = new EventEmitter();

  constructor(
    private formAnswerService: FormAnswerService,
    private formService: FormService,
    private caseService: CaseService,
    private _notificationsService: NotificationsService
  ) {
  }

  ngOnInit() {
    if (this.specform.length === 0) {
      this.specform.push(new SpecForm('', '', '', '', '', '', '', ''));
    }
  }

  onSaveClick() {
    console.log(this.specform, 'SPECIMEN');
    this.caseService.updateSpecForm(this.caseid, this.specform).subscribe((updated_case: Case) => {
      //this.is_processing = false;
      console.log(updated_case, 'CASE UPDATED : case-update.component');
      this._notificationsService.success(
        'Case : ' + updated_case.case_nbr,
        'Successfully Updated.',
        {
          timeOut: 10000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: false,
        }
      );
    }, errors => {
      console.log(errors, 'ERROR : case-update.component');
      // this.is_processing = false;
    });
  }

  onAddRow() {
    this.specform.push(new SpecForm('', '', '', '', '', '', '', ''));
  }

  onRemoveRow(index) {
    this.specform.splice(index, 1);
  }

  onAddForm() {
    this.onCallSelectFormTrigger.emit();
  }

  onRevealForm(form_answer_id, form_id) {
    this.is_ok = false;
    this.form_answer_id = form_answer_id;

    this.formAnswerService.get(this.caseid, this.form_answer_id).subscribe((response: FormAnswer) => {
      const form_answers = response;
      if (form_answers.answers) {
        this.answers.clear();
        form_answers.answers.map((answer: Answer) => {
          this.answers.set(answer.key, answer.answer);
        });
      }
      console.log(response, 'answers for caseform');
      console.log(this.answers, 'answers for caseform');

      this.formService.getForm(form_id).subscribe((recv_form: Form) => {
        delete this.caseform;
        this.caseform = recv_form;
        console.log(recv_form, 'nakuhang caseform');
        this.dirpath = recv_form.dir_path;
        this.is_ok = true;
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
