import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Case } from 'app/core/models';
import { CaseService } from 'app/core/services';
import { MatPaginator } from '@angular/material';
import { NoJWTError } from 'app/core/errors';

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

  @ViewChild(MatPaginator) paginator: MatPaginator;

  sort = 0; // desc == -1
  pagelength:number;

  searchText = '';
  filter = '';

  is_adding_forms = true;
  cases: Case[];
  constructor(private caseService: CaseService) { }

  ngOnInit() {
    this.getCases({pageIndex: 0, pageSize: 10});
  }


  doSort() {
    this.sort = this.sort == 1 ? -1 : 1;
    this.getCases(this.paginator);
  }

  doSearch(newObject: any) {
    let pageIndex = 0;
    let pageSize = 10;
    this.getCases({pageIndex, pageSize}, true);
  }

  getCases(paginator={
    pageIndex: 0, 
    pageSize: 10}, reset=false) {
    this.caseService.list(paginator.pageIndex, 
      paginator.pageSize,
      this.searchText,
      this.sort)
      .subscribe(result => {
        console.log(result, 'hello world');
        this.cases = result.cases;
        this.pagelength = result.count;
        if (reset) {
          this.paginator.pageIndex = 0;
        }
      })
  }

}
