import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { Question, Form, Section } from 'app/core/models';

import 'rxjs/add/operator/map';


@Component({
  selector: 'app-forms-table-section',
  templateUrl: './forms-table-section.component.html',
  styleUrls: ['./forms-table-section.component.css']
})
export class FormsTableSectionComponent implements OnInit {
  @Input() formArray: FormArray;
  @Input() section: Section;
  @Input() sectionLength: number;
  @Input() viewState: string;
  @Input() index: number;

  @Output() removed = new EventEmitter();

  sectionGroup: FormGroup;
  //index: number;

  constructor(
    private fb: FormBuilder,
  ) {
    this.formArray = new FormArray([]);
  }

  ngOnInit() {
    this.sectionGroup = this.toFormGroup(this.section);
    this.index = this.formArray.length;
    this.formArray.push(this.sectionGroup);
  }

  toFormGroup(section: Section) {
    return this.fb.group({
      key: section.key,
      name: section.name
    });
  }

}
