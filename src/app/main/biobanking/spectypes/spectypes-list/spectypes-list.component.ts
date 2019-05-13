import { Component, OnInit, ViewChild } from '@angular/core';

import { environment } from 'environments/environment';

import { SpecTypeService } from 'app/core/services';
import { SpecType } from 'app/core/models';
import { NoJWTError } from 'app/core/errors';
import { SpectypePipe } from 'app/shared/_pipes/spectype.pipe';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'app-spectypes-list',
  templateUrl: './spectypes-list.component.html',
  styleUrls: ['./spectypes-list.component.css']
})
export class SpectypesListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  sort = 0; // desc == -1
  pagelength:number;

  spectypes: SpecType[];
  download_url = '';
  searchText = '';
  filter = '';

  constructor(private specTypeService: SpecTypeService) {

    this.download_url = environment.API_ENDPOINT + 'SpecTypes/';

  }// --constructor

  ngOnInit() {
    this.getSpecTypes({pageIndex: 0, pageSize: 10});
  }// --OnInit

  doSort() {
    this.sort = this.sort == 1 ? -1 : 1;
    this.getSpecTypes(this.paginator);
  }

  doSearch(newObject: any) {
    let pageIndex = 0;
    let pageSize = 10;
    this.getSpecTypes({pageIndex, pageSize}, true);
  }

  getSpecTypes(paginator={
    pageIndex: 0, 
    pageSize: 10}, reset=false) {
    this.specTypeService.list(paginator.pageIndex, 
      paginator.pageSize,
      this.searchText,
      this.sort)
      .subscribe(result => {
        this.spectypes = result.specTypes;
        this.pagelength = result.count;
        if (reset) {
          this.paginator.pageIndex = 0;
        }
      })
  }

}// --SpecTypeTypeListComponent
