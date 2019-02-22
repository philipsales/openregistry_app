import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormAnswer, Answer, Form, SpecForm, Case } from 'app/core/models';
import { FormService, FormAnswerService, CaseService } from 'app/core/services';
import { NoJWTError } from 'app/core/errors';
import { NotificationsService } from 'angular2-notifications';

declare var jquery: any;
declare var $: any;

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
  @Input() isBiobank = false;
  ewan = false;
  ewan2 = true;
  openqueue = {
    queue: -1,
    index: -1,
    form_id: '',
    form_id_id: '',
    savequeue: -1,
    saveindex: -1,
    save: false,
  };

  _forms: FormAnswer;
  @Input() set forms(value: FormAnswer) {
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
    /*
    REFACTOR
    if (this.isBiobank && this.specform.length === 0) {
      this.specform.push(new SpecForm('', '', '', '', '', '', '', ''));
    }
    */
  }

  onSaveClick() {
    this.caseService.updateSpecForm(this.caseid, this.specform).subscribe((updated_case: Case) => {
      //this.is_processing = false;
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
      console.warn(errors, 'ERROR : case-update.component');
      // this.is_processing = false;
    });
  }

  onAddRow() {
    /*
    REFACTOR
    this.specform.push(new SpecForm('', '', '', '', '', '', '', ''));
    */
  }

  onRemoveRow(index) {
    this.specform.splice(index, 1);
  }

  onAddForm() {
    this.onCallSelectFormTrigger.emit();
  }

  tryOpen(index, form_id, form_form_id, eventObject) {
    console.log('eventObject', eventObject);
    const prev = this.openqueue.index;
    this.openqueue.save = false;
    if (this.openqueue.index !== index) {
      this.openqueue.queue = index;
      this.openqueue.form_id = form_id;
      this.openqueue.form_id_id = form_form_id;
      this.openqueue.savequeue = prev;

      if (prev !== -1) {
        $('#modal_confirmation').modal('show');
      } else {
        this.setAll();
      }
    } else {
      this.setAll();
    }
  }

  onCloseConfirmation() {
    $('#modal_confirmation').modal('hide');
    this.setAll();
  }

  onConfirmSave() {
    //this.openqueue.save = true;
    $('#modal_confirmation').modal('hide');
    this.openqueue.saveindex = this.openqueue.savequeue;
    console.warn(this.openqueue, 'WOOOOOO');
    // this.openqueue.index = this.openqueue.queue;
    // this.onRevealForm(this.openqueue.form_id, this.openqueue.form_id_id);
  }

  onSuccessSubmitEvent() {
    this.setAll();
  }

  private setAll() {
    console.log("SETALL");
    this.openqueue.savequeue = -1;
    this.openqueue.saveindex = -1;
    this.openqueue.index = this.openqueue.queue;
    this.onRevealForm(this.openqueue.form_id, this.openqueue.form_id_id);
  }

  onRevealForm(form_answer_id, form_id) {
    console.log("ONREVEALFORM");
    this.is_ok = false;
    this.form_answer_id = form_answer_id;

    
    this.formAnswerService.get(this.caseid, this.form_answer_id).subscribe((response: FormAnswer) => {
    console.log("this.formAnswerService");
      const form_answers = response;
      console.log('form_answers', form_answers);

      if (form_answers.answers) {
        this.answers.clear();
        form_answers.answers.map((answer: Answer) => {
          this.answers.set(answer.key, answer.answer);
        });
      }

      this.formService.getForm(form_id).subscribe((recv_form: Form) => {
        console.log("this.formService");
        delete this.caseform;
        //this.caseform = new Form('', '', [], [], '', '');
        this.caseform = recv_form;
        //this.caseform = new Form('', '', [], [], '', '');

        console.log('this.caseform', this.caseform);
        this.dirpath = recv_form.dir_path;
        this.is_ok = true;
      }, error => {
        console.log(error); // get the error in error handler
        if (error instanceof NoJWTError) {
          console.warn('TO DO : handle JWT Expired');
        }
      });
    }, error => {
      if (error instanceof NoJWTError) {
        console.warn('TO DO : handle JWT Expired');
      }
    });
  }

}
