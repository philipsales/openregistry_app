import { Component, OnInit, Output, Input, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { QuestionBase } from './question-base';
import { QuestionControlService } from './question-control.service';
import { TextboxQuestion } from './question-textbox';
import { TextareaQuestion } from './question-textarea';
import { CheckboxQuestion } from './question-checkbox';
import { DropdownQuestion } from './question-dropdown';
import { RadiobuttonQuestion } from './question-radiobutton';
import { DatepickerQuestion } from './question-datepicker';
import { NotificationsService } from 'angular2-notifications';

import { Form, Section, Question, FormAnswer, Answer, Case, Consent } from 'app/core/models';
import { CaseService, FormAnswerService, ConsentService } from 'app/core/services';


@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  providers: [QuestionControlService]
})
export class DynamicFormComponent implements OnInit {


  @Input() formArray: FormArray;
  private questionz: Question[] = [];
  @Input() set inquestionz(value: Question[]) {
    if (value) {
      this.questionz = value;
      //this.initUI();
    }
  }

  @Input() method: string;
  @Input() caseid: string;
  @Input() casenumber: string;
  @Input() dirpath: string;
  @Input() formanswerid: string;
  @Input() answers: Map<string, string[]>;

  private sectionz: Section[] = [];
  @Input() set insectionz(value: Section[]) {
    if (value) {
      console.log('value',value);
      this.sectionz = value;
      //this.initUI();
    }
  }

  private _initsave: boolean;
  @Input() set initsave(value: boolean) {
    this._initsave = value;
    if (value === true) {
      this.onSubmit();
    }
  }

  @Output() onSuccessSubmit: EventEmitter<null> = new EventEmitter();

  private consents: Consent[];
  questions: QuestionBase<any>[] = [];
  form: FormGroup;
  payLoad = '';
  private section: string[];
  private sections: Section[];
  private is_processing = false;

  constructor(
    private qcs: QuestionControlService,
    private caseService: CaseService,
    private formAnswerService: FormAnswerService,
    private consentService: ConsentService,
    private notificationsService: NotificationsService
  ) {
  }// --constructor


  private questions_test: QuestionBase<any>[] = [];
  private form_test: FormGroup;
  private sections_test: Section;
  private sections_array: Section[] = [];

  sectionGroupTest: FormGroup;
  formArrayTest: FormArray;


  ngOnInit() {
    console.log('DYnamicFormOnInit');
    this.consentService.getConsents().subscribe(
      consents => {
        this.consents = consents;
      });
    this.initUI();
  }// --onInit


  initUI() {
    console.log('this.sectionz', this.sectionz);
    this.formArrayTest = new FormArray([]);
    for (const my_section of this.sectionz) {

      this.sectionGroupTest = this.qcs.toFormGroupSection(my_section);
      this.formArrayTest.push(this.sectionGroupTest);
      this.sectionGroupTest.addControl('questions', new FormArray([]));
      this.sectionGroupTest.addControl('questionsType', new FormArray([]));
      for (let my_question of my_section.questions) {

        (<FormArray>this.sectionGroupTest.get('questions')).push(this.qcs.toFormGroupQuestion(my_question));
        if (my_question.type === 'textbox' || my_question.type === 'text') {
          this.questions.push(
            new TextboxQuestion({
              key: my_question.key,
              label: my_question.label,
              // value    : my_question.value,
              value: this.answers.get(my_question.key),
              required: my_question.required ? true : false,
              order: my_question.order,
              disabled: this.method === 'VIEW'
            })
          );
        } else if (my_question.type === 'dropdown') {
          // Convert ["option"] to option without the bracket and quote
          // this.answers.get(my_question.key) == ["option 1"]
          // this.answers.get(my_question.key).toString() == "option 1"
          let temp = '';
          if (this.answers.get(my_question.key)) {
            temp = (this.answers.get(my_question.key)).toString();
          }

          this.questions.push(
            new DropdownQuestion({
              key: my_question.key,
              label: my_question.label,
              type: my_question.type,
              // value    : my_question.value,
              // value: (this.answers.get(my_question.key)),
              // value: (this.answers.get(my_question.key)).toString(),
              value: temp,
              order: my_question.order,
              required: my_question.required ? true : false,
              options: my_question.options,
              disabled: this.method === 'VIEW'
            })
          );
        } else if (my_question.type === 'checkbox') {

          let temp = '';
          if (this.answers.get(my_question.key)) {
            temp = (this.answers.get(my_question.key)).toString();
          }

          this.questions.push(
            new CheckboxQuestion({
              key: my_question.key,
              label: my_question.label,
              type: my_question.type,
              // value    : my_question.value,
              //working if without value
              // value: this.answers.get(my_question.key),
              // working if with value
              // value: (this.answers.get(my_question.key)).toString(),
              value: temp,

              order: my_question.order,
              required: my_question.required ? true : false,
              options: my_question.options,
              disabled: this.method === 'VIEW'
            })
          );
        } else if (my_question.type === 'radiobutton') {
          let temp = '';
          if (this.answers.get(my_question.key)) {
            temp = (this.answers.get(my_question.key)).toString();
          }

          this.questions.push(
            new RadiobuttonQuestion({
              key: my_question.key,
              label: my_question.label,
              type: my_question.type,
              // value    : my_question.value,
              // value: this.answers.get(my_question.key),
              // value: (this.answers.get(my_question.key)).toString(),
              value: temp,
              order: my_question.order,
              required: my_question.required ? true : false,
              options: my_question.options,
              disabled: this.method === 'VIEW'
            })
          );
        } else if (my_question.type === 'datepicker') {
          let temp = '';
          if (this.answers.get(my_question.key)) {
            temp = (this.answers.get(my_question.key)).toString();
          }

          this.questions.push(
            new DatepickerQuestion({
              key: my_question.key,
              label: my_question.label,
              type: my_question.type,
              // value    : my_question.value,
              // value: this.answers.get(my_question.key),
              // value: (this.answers.get(my_question.key)).toString(),
              value: temp,
              required: my_question.required ? true : false,
              order: my_question.order,
              disabled: this.method === 'VIEW'
            })
          );
        } else if (my_question.type === 'textarea') {
          this.questions.push(
            new TextareaQuestion({
              key: my_question.key,
              label: my_question.label,
              type: my_question.type,
              required: my_question.required ? true : false,
              order: my_question.order,
              value: this.answers.get(my_question.key),
              disabled: this.method === 'VIEW'
            })
          );
        } else if (my_question.type === 'email') {
          this.questions.push(
            new TextboxQuestion({
              key: my_question.key,
              label: my_question.label,
              type: my_question.type,
              order: my_question.order,
              value: this.answers.get(my_question.key),
              disabled: this.method === 'VIEW'
            })
          );
        } else if (my_question.type === 'password') {
          this.questions.push(
            new TextboxQuestion({
              key: my_question.key,
              label: my_question.label,
              type: my_question.type,
              order: my_question.order,
              value: this.answers.get(my_question.key),
              disabled: this.method === 'VIEW'
            })
          );
        } else {
          console.warn('FIX ME : Not yet supported ', my_question.type);
        }

        (<FormArray>this.sectionGroupTest.get('questionsType'))
          .push(this.qcs.toFormGroupQuestionType(this.questions));
      }// --for
    }// --for
    // this.questions = this.questions.sort((a, b) => a.order - b.order);
    this.form = this.qcs.toFormGroup(this.questions);
  }

  onSubmit() {
    this.is_processing = true;
    console.warn(this.form.value, 'FORM.VALUE');
    this.payLoad = JSON.stringify(this.form.value);
    console.warn(this.payLoad, 'Stringified FORM.VALUE');
    let answers: Answer[] = [];
    Object.keys(this.form.value).forEach((key) => {
      let value = this.form.value[key];
      /*
      if (value instanceof Array) {
        value = JSON.stringify(value);
      }
      */
      answers.push(new Answer(key, value));
    });
    let forms: FormAnswer[] = [];
    forms.push(new FormAnswer('', '', false, answers));

    console.warn(this.casenumber, 'CASE NUMBER');
    console.warn(answers, 'WAAAAAAAAA-ANSWERS');
    console.warn(forms, 'WAAAAAAAAA-FORMS');
    console.warn(this.caseid, 'WAAAAAAAAA');
    console.warn(this.formanswerid, 'WAAAAAAAAA');

    this.formAnswerService.update(
      this.caseid,
      this.formanswerid,
      new FormAnswer('', '', false, answers)).subscribe(updated_formanswer => {
        this.is_processing = false;
        console.warn(updated_formanswer, 'AYUS');
        if(this._initsave) {
          this.onSuccessSubmit.emit();
        }
        this.notificationsService
          .success(
            'Form : ' + updated_formanswer.form_name,
            'Successfully Updated',
            {
              timeOut: 10000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: false
            }
          );
      }, errors => {
        console.warn('errors');
        this.is_processing = false;
        throw errors;
      });

    /*
    let to_save = new Case(this.casenumber.toString(), '', forms);
    this.caseservice.create(to_save).subscribe(created_case => {
      console.warn(created_case, 'AYUS');
      this.notificationsService
            .success(
              'Case: ' + created_case['case_number'],
              'Successfully Saved.',
              {
                timeOut: 10000,
                showProgressBar: true,
                pauseOnHover: false,
                clickToClose: false
              }
            );
    }, errors => {
      console.warn('errors');
      throw errors;
    });
    */
  }// --onSubmit

  onClickAttachment(dirpath: string) {
    this.caseService
      .downloadAttachment(dirpath)
      .subscribe(
        file => {
          var url = window.URL.createObjectURL(file);
          window.open(url);
        },
        errors => {
          console.warn('attachment error');
        }
      );
  }
}// --DynamicFormComponent
