import { Component, OnInit, Input } from '@angular/core';
import { Case } from 'app/core/models';

@Component({
  selector: 'app-pcaricase-list',
  templateUrl: './pcaricase-list.component.html',
  styleUrls: ['./pcaricase-list.component.css']
})
export class PcaricaseListComponent implements OnInit {

  @Input() create_url: string;
  @Input() view_url: string;
  @Input() update_url: string;
  @Input() show_diagnosis: boolean;
  searchText = '';
  filter = '';

  is_adding_forms = true;
  _cases: Case[];

  @Input() set cases(value: Case[]) {
    this._cases = value;
    console.warn('HELLO!');
  }// -- setter for forms

  constructor() { }

  ngOnInit() {
  }

}
