import { Component, OnInit, Input } from '@angular/core';

import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { Question, Form, Section } from 'app/core/models';

@Component({
  selector: 'form-section-array',
  templateUrl: './form-section-array.component.html',
  styleUrls: ['./form-section-array.component.css'] })
export class FormSectionArrayComponent implements OnInit {

  @Input() parentForm: FormGroup;
  @Input() sections: Section[];
  @Input() viewState: string; 

  constructor( private fb: FormBuilder) { }

  ngOnInit() {
    this.initSection();
    this.parentForm.addControl('sections', new FormArray([]));
  }

  initSection(){
    if(this.sections.length == 0){
      this.sections.push(new Section(
        '',
        ''
      ));
    }
  }

  addSection(){
    let questions : Question[] = [];
    this.sections.push(new Section(
      '',
      '',
      this.sections.length,
      questions
    ));
  }

  removeSection(index: number){

    if(this.sections.length > 1){
      this.sections.splice(index,1);

      (<FormArray>this.parentForm
                      .get('sections'))
                      .removeAt(index);
    }

  }



}
