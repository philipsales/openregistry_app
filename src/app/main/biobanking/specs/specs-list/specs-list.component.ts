import { Component, OnInit, ViewChild } from '@angular/core';

import { environment } from 'environments/environment';

import { SpecService } from 'app/core/services';
import { Spec } from 'app/core/models';
import { MatPaginator } from '@angular/material';
import { NoJWTError } from 'app/core/errors';

@Component({
  selector: 'app-specs-list',
  templateUrl: './specs-list.component.html',
  styleUrls: ['./specs-list.component.css']
})
export class SpecsListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  specs: Spec[];
  download_url = '';
  sort = 0; // desc == -1
  pagelength:number;
  searchText = '';
  filter = '';

  constructor(private specService: SpecService) {

    this.download_url = environment.API_ENDPOINT + 'specs/';

  }// --constructor

  ngOnInit() {
    this.getSpecs({pageIndex: 0, pageSize: 10});
  }// --OnInit

  doSort() {
    this.sort = this.sort == 1 ? -1 : 1;
    this.getSpecs(this.paginator);
  }

  doSearch(newObject: any) {
    let pageIndex = 0;
    let pageSize = 10;
    this.getSpecs({pageIndex, pageSize}, true);
  }

  getSpecs(paginator={
      pageIndex: 0, 
      pageSize: 10
    }, 
    reset=false) 
  {
    this.specService.list(paginator.pageIndex, 
      paginator.pageSize,
      this.searchText,
      this.sort)
      .subscribe(result => {
        this.specs = result.specs;
        this.pagelength = result.count;
        if (reset) {
          this.paginator.pageIndex = 0;
        }
      });
  }

}// --SpecsListComponent
