import { Component, OnInit, Output, Input, OnChanges } from '@angular/core';

import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Question, Form, Section, Option } from 'app/core/models';

import { KeyGenerator } from 'app/core/utils';

@Component({
  selector: 'question-content-array',
  templateUrl: './question-content-array.component.html',
  styleUrls: ['./question-content-array.component.css']
})
export class QuestionContentArrayComponent implements OnInit {

  @Input() parentForm: FormGroup;
  @Input() questions: Question[];
  @Input() viewState: string;
  @Input() sectionIndex: string;

  questionGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private keyGenerator: KeyGenerator
  ) { }

  ngOnInit() {
    this.initQuestion();
    this.parentForm.addControl('questions', new FormArray([]));
  }

  initQuestion() {
    if (this.questions.length === 0) {
      let options: Option[] = [];
      this.questions.push(new Question(
        this.keyGenerator.create(),
        'Untitled question',
        'textbox',
        '',
        false,
        0,
        options
      ));
    }
  }

  addQuestion() {
    let options: Option[] = [];
    this.questions.push(new Question(
      this.keyGenerator.create(),
      'Untitled question',
      'textbox',
      '',
      false,
      (<FormArray>this.parentForm.controls.questions).length,
      options
    ));
  }

  toFormGroup(question: Question) {
    return this.fb.group({
      key: [question.key],
      label: [question.label],
      type: [question.type],
      value: [question.value],
      required: [question.required],
      order: [question.order],
      options: [question.options]
    });
  }

  cloneQuestion(question: Question, index: number) {

    let questionClone = new Question(
      this.keyGenerator.create(),
      this.parentForm.controls['questions'].value[index].label,
      this.parentForm.controls['questions'].value[index].type,
      this.parentForm.controls['questions'].value[index].value,
      this.parentForm.controls['questions'].value[index].required,
      index + 1,
      this.parentForm.controls['questions'].value[index].options
    )

    this.questions.splice(index + 1, 0, questionClone);
    this.refreshOrder();


  }

  refreshOrder() {
    const ctrl = <FormArray>this.parentForm.controls['questions'];
    console.log('-CTRL--', ctrl);
    ctrl.controls.forEach((x, indexes) => {
      x.patchValue({ order: indexes });
    });
  }

  patchValues() {
    return this.fb.group({
      order: [10]
    });
  }

  removeQuestion(index: number) {

    if (this.questions.length > 1) {
      this.questions.splice(index, 1);

      (<FormArray>this.parentForm
        .get('questions'))
        .removeAt(index);
    }

    const ctrl = <FormArray>this.parentForm.controls['questions'];
    ctrl.controls.forEach((x, indexes) => {
      x.patchValue({ order: indexes });
    });
  }

}
