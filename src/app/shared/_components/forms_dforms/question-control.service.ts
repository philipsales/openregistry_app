//builtin
import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder }  from '@angular/forms';

//custom
import { QuestionBase } from './question-base';

import { Question, Form, Section } from 'app/core/models';

@Injectable()
export class QuestionControlService {
  
  constructor(
    private fb: FormBuilder
  ) { }//--constructor

  private myForm: FormGroup;

  toFormGroupQuestionType(questions: QuestionBase<any>[]) { 

    let group: any = [];

    questions.forEach(question => {

        group['key'] = question.key;
        group['required'] = question.required;
        group['order'] = question.order;
        group['controlType'] = question.controlType;
        group['label'] = question.label;
        group['value'] = question.value;
        group['options'] = question['options'];
    });

      return this.fb.group({
          value      : group['value'],
          key        : group['key'],
          label      : group['label'],
          required   : group['required'],
          order      : group['order'],
          controlType: group['controlType'],
          options    : new FormControl(group['options']),
          type       : group['type']
      });

  }//--toFormGroup

  toFormGroup(questions: QuestionBase<any>[]) {
    let group: any = {};
    questions.forEach(question => {
      let value = question.value || '';
      console.log(value, '=======ORIGIN VALUE');
      if (question.controlType === 'checkbox') {
        if (value) {
          //revert string into string[]
          // console.log(value.split(','), '=======PARSE SHIT VALUE');
          // value = JSON.parse(value);
          value = value.split(',');
        }
      }
      if (question.required) {
        group[question.key] = new FormControl({
          value: value,
          disabled: question.disabled
        }, Validators.required);
      } else {
        group[question.key] = new FormControl({
          value: value,
          disabled: question.disabled
        });
      }
    });
    return new FormGroup(group);
  }// --toFormGroup

  toFormGroupQuestionBase(section: Section) {
    return this.fb.group( {
        key  : section.key,
        name : section.name
    });
  }


  toFormGroupSection(section: Section) {
    return this.fb.group( {
        key  : section.key,
        name : section.name
    });
  }

  toFormGroupQuestion(question: Question){
    return this.fb.group({
        key        : [question.key],
        label      : [question.label],
        type       : [question.type],
        value      : [question.value],
        required   : [question.required],
        order      : [question.order],
        options    : [question.options]
    });
  }



}//--QuestionControlService
