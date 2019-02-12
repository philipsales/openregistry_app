import { Component, OnInit, Output, Input, OnChanges } from '@angular/core';

import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Question, Form, Section, Option, SpecForm } from 'app/core/models';

import { KeyGenerator } from 'app/core/utils';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-table-question-content-array',
  templateUrl: './table-question-content-array.component.html',
  styleUrls: ['./table-question-content-array.component.css']
})
export class TableQuestionContentArrayComponent implements OnInit {

  @Input() parentForm: FormGroup;
  @Input() questions: Question[];
  @Input() viewState: string;
  @Input() sectionIndex: string;

  questionGroup: FormGroup;
  specform: SpecForm[] = [];

  specs = [
    {value: 'urine', viewValue: 'Urine'},
    {value: 'stool', viewValue: 'stool'},
  ];
  spectypes = [
    {value: 'frozen', viewValue: 'Frozen'},
    {value: 'embedded', viewValue: 'Embedded'},
  ];

  constructor(
    private fb: FormBuilder,
    private keyGenerator: KeyGenerator
  ) { }

  ngOnInit() {
    this.initQuestion();
    this.parentForm.addControl('questions', new FormArray([]));
    /*
    REFACTOR
    this.specform.push(new SpecForm('', '', '', '', '', '', '', ''));
    */
  }

  initQuestion() {
    if (this.questions.length === 0) {
      let options: Option[] = [];
      this.questions.push(new Question(
        this.keyGenerator.create(),
        'specform_row',
        'specform_row',
        '||||||||',
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
      'specform_row',
      'specform_row',
      '|||||||',
      false,
      (<FormArray>this.parentForm.controls.questions).length,
      options
    ));
  }

  addTableQuestion() {
    /*
    REFACTOR
    this.specform.push(new SpecForm('', '', '', '', '', '', '', ''));
    */
    let options: Option[] = [];
    this.questions.push(new Question(
      this.keyGenerator.create(),
      'specform_row',
      'specform_row',
      '|||||||',
      false,
      this.questions.length,
      options
    ));
  }

  removeTableQuestion(index: number) {
    if (this.specform.length !== 1) {
      this.specform.splice(index, 1);
    }
    this.removeQuestion(index);
  }

  onChangeSpec($event: MatSelectChange) {
    const ar_id = ($event.source.id.split('-'));
    const index = ar_id[ar_id.length - 1];
    const curval = (this.questions[index].value).split('|');
    curval[1] = $event.value;
    this.questions[index].value = curval.join('|');
  }

  onChangeSpecType($event: MatSelectChange) {
    const ar_id = ($event.source.id.split('-'));
    const index = ar_id[ar_id.length - 1];
    const curval = (this.questions[index].value).split('|');
    curval[2] = $event.value;
    this.questions[index].value = curval.join('|');
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

    for (let index = 0; index < this.questions.length; index++) {
      this.questions[index].order = index;
    }
    
    const ctrl = <FormArray>this.parentForm.controls['questions'];
    ctrl.controls.forEach((x, indexes) => {
      x.patchValue({ order: indexes });
    });
  }


}
