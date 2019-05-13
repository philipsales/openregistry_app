import { Component, OnInit, ViewChild } from '@angular/core';

import { DatabaseService } from 'app/core/services';
import { Database } from 'app/core/models';

import { MatPaginator } from '@angular/material';

import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-database-list',
  templateUrl: './database-list.component.html',
  styleUrls: ['./database-list.component.css']
})
export class DatabaseListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  sort = 0; // desc == -1
  pagelength:number;

  searchText = '';
  databases: Database[] = [];
  private title;

  constructor(private databaseService: DatabaseService) { }
  
  ngOnInit() {
    this.getDatabases({pageIndex: 0, pageSize: 10});
  }

  doSort() {
    this.sort = this.sort == 1 ? -1 : 1;
    this.getDatabases(this.paginator);
  }

  doSearch(newObject: any) {
    let pageIndex = 0;
    let pageSize = 10;
    this.getDatabases({pageIndex, pageSize}, true);
  }

  getDatabases(paginator={
    pageIndex: 0, 
    pageSize: 10}, reset=false) {
    this.databaseService.list(paginator.pageIndex, 
      paginator.pageSize,
      this.searchText,
      this.sort)
      .subscribe(result => {
        this.databases = result.databases;
        this.pagelength = result.count;
        if (reset) {
          this.paginator.pageIndex = 0;
        }
      })
  }
}
