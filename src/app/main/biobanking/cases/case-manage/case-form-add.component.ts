import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {MatTableDataSource} from '@angular/material';

import { FormService } from 'app/core/services';
import { Form } from 'app/core/models';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-case-form-add',
  templateUrl: './case-form-add.component.html',
  styleUrls: ['./case-form-add.component.css']
})
export class CaseFormAddComponent implements OnInit {

  private forms: Form[];
  private _show: boolean;
  @Input() set show(value: boolean) {
      console.warn(this._show);
      this._show = value;
  }// -- _reinit setter
  private selection: SelectionModel<Form>;

  displayedColumns = ['select', 'name', 'type', 'organization'];
  dataSource: MatTableDataSource<Form>;
  initialSelection = [];
  allowMultiSelect = true;

  @Output() onSaveFormAddTrigger: EventEmitter<Form[]> = new EventEmitter();
  @Output() onCancelFormAddTrigger: EventEmitter<null> = new EventEmitter();

  constructor(private formService: FormService) { }

  ngOnInit() {
    this.formService.getForms().subscribe(
      forms => {
        this.forms = forms;
        this.dataSource = new MatTableDataSource(this.forms);
        this.selection = new SelectionModel<Form>(this.allowMultiSelect, this.initialSelection);
        console.log(forms, 'FORMS');
      }
    );
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
    console.warn('HELLO');
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

}

export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: Element[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];