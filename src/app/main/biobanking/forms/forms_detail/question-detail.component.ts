import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

//import { Question, Form, Section } from './form-question.model';
import { Question, Form, Section } from 'app/core/models';
import { forms } from './form-question.model';

import { NotificationsService } from 'angular2-notifications';
import { FormQuestionService } from './form-question.service';


@Component({
  selector: 'question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnChanges {
  @Input() inputSelectedQuestions: Question[];

  private questionForm: FormGroup;

  private questions: Question[];

  private errors: any = {};
  private has_errors = false;
  private is_processing = false;
  private options: any[];

  sort_order = 1;


  constructor(
    private _notificationsService: NotificationsService,
    private fb: FormBuilder,
    private questionService: FormQuestionService
  ) {		
      this.createForm();
      console.log(this.questionForm);

      this.options = [ 
        { "value": "textbox",     "label": "text" },
        { "value": "textarea",    "label": "paragraph" },
        { "value": "dropdown",    "label": "dropdown" },
        { "value": "checkbox",    "label": "checkbox" },
        { "value": "radiobutton", "label": "radio" },
        { "value": "datepicker",  "label": "date" }
      ];

  }

  ngOnChanges() {

    this.questions = this.inputSelectedQuestions;

    this.setQuestions(this.questions);

    this.ngInitForm();
  }

  ngInitForm() {
    this.secretLairs.push(this.createQuestion());
  }

  createForm() {
    this.questionForm = this.fb.group({
      name: '',
      secretLairs: this.fb.array([])
    });

  }

  setQuestions(questions: Question[]){
    const questionFGs = questions.map(question => this.fb.group(question));
    const questionFormArray = this.fb.array(questionFGs);
    this.questionForm.setControl('secretLairs', questionFormArray);
  }

  get secretLairs(): FormArray {
      return this.questionForm.get('secretLairs') as FormArray;
  };

  //TODO: Refractor
  createQuestion(): FormGroup {

    let order = this.secretLairs.controls.length + 1;
    return this.fb.group(new Question('','','','',false,order,[]));
  }

  onAddQuestion() {
    //this.secretLairs.push(this.fb.group(new Question()));
    this.secretLairs.push(this.createQuestion());
  }

  onDeleteQuestion(index:number) {
    this.secretLairs.removeAt(index);
  }

  //TODO: Refractor
  onCloneQuestion(question: FormGroup, index:number){

    console.log('question', question);
    console.log('question', question.controls.key.value);
    console.log('clone-index', index);


    let questionClone = new Question(
       question.controls.key.value,
       question.controls.label.value,
       question.controls.type.value,
       question.controls.value.value,
       question.controls.required.value,
       index+1,
       question.controls.options.value
    );


    console.log('--lairs before---',this.secretLairs);
    this.secretLairs.push(this.fb.group(questionClone));
    console.log('--lairs after---',this.secretLairs);
  }



  onAddSection() {
  }

  ionSaveClick(input_question: Question[]){
      console.log('---onSaveClick---');
  }


  onSaveClick(input_question: Question){
      this.errors = {};
      this.has_errors = false;
      this.is_processing = true;

      console.warn(input_question, 'TO CREATE');


      console.warn(input_question, 'TO CREATE');
      
      this.questionService.create(input_question).subscribe(
          created_question => {
	      this.is_processing = false;
	      console.warn(created_question, 'AYUS');
	      this._notificationsService.success(
		  'New Question : ' + input_question.label,
		  'Successfully Created.',
		  {
		      timeOut: 10000,
		      showProgressBar: true,
		      pauseOnHover: false,
		      clickToClose: false,
		  }
	      )
          },
          errors  => {
	      this.errors = errors;
	      this.has_errors = true;
	      this.is_processing = false;
	      console.warn('ERROR');
	      throw errors;
          });
  }//--onSaveClick


}
