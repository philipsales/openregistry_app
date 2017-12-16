import { Component, Input } from '@angular/core';
import { FormGroup }        from '@angular/forms';

import { QuestionBase }     from './question-base';

@Component({
  selector: 'df-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.css']
})
export class DynamicFormQuestionComponent{
    @Input() question : QuestionBase<any>;
    @Input() form     : FormGroup;

    get isValid() {
	return this.form.controls[this.question.key].valid;
    }//--isValid
}//--DynamicFormQuestionComponent
