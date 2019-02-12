import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';

import { Form } from 'app/core/models';

@Component({
  selector: 'app-pcaricase-form-add',
  templateUrl: './pcaricase-form-add.component.html',
  styleUrls: ['./pcaricase-form-add.component.css']
})
export class PcaricaseFormAddComponent implements OnInit {

  private _forms: Form[];
  @Input() set forms(value: Form[]) {
    this._forms = value;
    this.dataSource = new MatTableDataSource(this._forms);
    this.selection = new SelectionModel<Form>(this.allowMultiSelect, this.initialSelection);
  }// -- setter for forms

  _show: boolean;
  @Input() set show(value: boolean) {
    this._show = value;
    if (this.selection) {
      this.selection.clear();
    }
  }// -- _reinit setter
  private selection: SelectionModel<Form>;

  displayedColumns = ['select', 'name', 'type', 'organization'];
  dataSource: MatTableDataSource<Form>;
  initialSelection = [];
  allowMultiSelect = true;

  @Output() onSaveFormAddTrigger: EventEmitter<Form[]> = new EventEmitter();
  @Output() onCancelFormAddTrigger: EventEmitter<null> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }


  onAddSelectedForm() {
    this.onSaveFormAddTrigger.emit(this.selection.selected);
  }

  onCancelAddForm() {
    this.onCancelFormAddTrigger.emit();
  }

  clickMe() {
    console.warn(this.selection.selected);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

}
