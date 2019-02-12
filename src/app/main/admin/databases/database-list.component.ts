import { Component, OnInit } from '@angular/core';

import { DatabaseService } from 'app/core/services';
import { Database } from 'app/core/models';

import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-database-list',
  templateUrl: './database-list.component.html',
  styleUrls: ['./database-list.component.css']
})
export class DatabaseListComponent implements OnInit {

  databases: Database[] = [];
  private title;

  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
   

    this.databaseService
      .getDatabases()
      .subscribe(
        databases => {
          this.databases = databases;
        }
      );
  }



}
