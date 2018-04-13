import { Component, OnInit, Output, Input, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { NotificationsService } from 'angular2-notifications';

import { Form, Section, Question, FormAnswer, Answer, Case, Consent, SpecForm } from 'app/core/models';
import { CaseService, FormAnswerService, ConsentService } from 'app/core/services';


@Component({
  selector: 'app-dynamic-table-form',
  templateUrl: './dynamic-table-form.component.html',
  styleUrls: ['./dynamic-table-form.component.css']
})
export class DynamicTableFormComponent implements OnInit {

  @Input() formArray: FormArray;
  private questionz: Question[] = [];
  @Input() set inquestionz(value: Question[]) {
    if (value) {
      this.questionz = value;
      console.warn(this.questionz, 'HELLO questionz!');
    }
  }

  @Input() method: string;
  @Input() caseid: string;
  @Input() casenumber: string;
  @Input() dirpath: string;
  @Input() formanswerid: string;
  @Input() answers: Map<string, string>;
  specform: SpecForm[] = [];

  private sectionz: Section[] = [];
  @Input() set insectionz(value: Section[]) {
    if (value) {
      this.sectionz = value;
      console.warn(this.sectionz, 'HELLO sectionz!');
      console.log('yahooo!');
      this.specform.length = 0;
      this.sectionz.map(section => {
        section.questions.map(question => {
          let arvalue = question.value.split('|');
          console.log(arvalue);
          if(arvalue.length > 3) {
            this.specform.push(new SpecForm('', arvalue[1], arvalue[2], '', '', '', '', ''));
          } else {
            this.specform.push(new SpecForm('', '', '', '', '', '', '', ''));
          }
        });
      });
    }
  }

  specs = [
    {value: 'urine', viewValue: 'Urine'},
    {value: 'stool', viewValue: 'stool'},
  ];
  spectypes = [
    {value: 'frozen', viewValue: 'Frozen'},
    {value: 'embedded', viewValue: 'Embedded'},
  ];


  constructor(
    private caseService: CaseService,
    private formAnswerService: FormAnswerService,
    private notificationsService: NotificationsService
  ) {
  }// --constructor

  ngOnInit() {
  }


  onClickAttachment(dirpath: string) {
    this.caseService
      .downloadAttachment(dirpath)
      .subscribe(
        file => {
          var url = window.URL.createObjectURL(file);
          window.open(url);
        },
        errors => {
          console.log('attachment error');
        }
      );
  }
}
