import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { FormService } from 'app/core/services';
import { Icdoncology } from 'app/core/models';
import { IcdoncologyService } from 'app/core/services';

@Component({
  selector: 'app-icdoncology-search',
  templateUrl: './icdoncology-search.component.html',
  styleUrls: ['./icdoncology-search.component.css']
})
export class IcdoncologySearchComponent implements OnInit {

  _search: any = {};
  dataSource: MatTableDataSource<any>;
  private diagnosis: Icdoncology[];
  private error: string;

  @Output() onSelectDiagnosisTrigger: EventEmitter<any> = new EventEmitter();

  displayedColumns = ['diagnosis_name', 'select'];
  constructor(
    private icdOncologyService: IcdoncologyService
  ) { }

  ngOnInit() {
  }

  onSubmitICDSearch(params: any) {

    this.icdOncologyService
      .getDiagnoses(params)
      .subscribe(
        diagnosis => {
          if (diagnosis['message']) {
            this.error = diagnosis['message'];
            this.dataSource = new MatTableDataSource();
          } else {
            this.error = '';
            this.dataSource = new MatTableDataSource(diagnosis);
          }
        }
      );
  }

  onSelectDiagnosis(selected) {
    this.onSelectDiagnosisTrigger.emit(selected);
  }

  onResetDiagnosis() {
    this.error = '';
    this.dataSource = new MatTableDataSource();
  }

}
