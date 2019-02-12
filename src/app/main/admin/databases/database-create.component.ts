import { Component, OnInit } from '@angular/core';

import { Router, NavigationExtras, ActivatedRoute, ParamMap } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

import { DatabaseService } from 'app/core/services';
import { Database } from 'app/core/models';
import { DatabaseJSON } from 'app/core/interfaces';

@Component({
  selector: 'app-database-create',
  templateUrl: './database-create.component.html',
  styleUrls: ['./database-create.component.css']
})
export class DatabaseCreateComponent implements OnInit {

  database_id: string;
  database: Database;

  errors: any = {};
  has_errors = false;
  is_processing = false;

  state_view: string;
  is_restore: boolean;

  constructor(
    private _notificationsService: NotificationsService,
    private databaseService: DatabaseService,
    private route: ActivatedRoute,
    private router: Router) {

    this.database = new Database('', '');
  }

  ngOnInit() {
    this.errors = {};
    this.has_errors = false;
    this.is_processing = false;
    this.is_restore = false;

    this.database_id = this.route.snapshot.paramMap.get('id');
    this.state_view = this.route.snapshot.url[0].path;

    if (this.state_view === 'update') {
      this.updateDatabase();
    }
    else if (this.state_view == 'create') {
      this.saveDatabase();
    }
    else if (this.state_view == 'view') {
      this.viewDatabase();
    }
  }

  updateDatabase() {
    this.getDatabase();
  }

  viewDatabase() {
    this.getDatabase();
  }

  saveDatabase() {
  }

  getDatabase() {
    this.databaseService
      .getDatabase(this.database_id)
      .subscribe(
        database => {
          this.database = database;
        });
  }

  onSaveClick(input_database: Database) {
    this.is_processing = true;

    this.databaseService
      .create(input_database)
      .subscribe(
        saved_database => {
          this.notificationPrompt(saved_database);
        },
        errors => {
          this.errors = errors;
          this.has_errors = true;
          this.is_processing = false;
        }
      );
  }

  onUpdateClick(input_database: Database) {
    this.databaseService
      .update(this.database_id, input_database)
      .subscribe(
        updated_database => {
          this.notificationPrompt(updated_database);
        },
        errors => {
          this.errors = errors;
          this.has_errors = true;
          this.is_processing = false;
        }
      );
  }

  onResetClick() {
    this.is_processing = false;
    this.database = new Database('', '');
  }

  onRestoreClick(id) {
    this.databaseService
      .restore(id)
      .subscribe(
        restored_database => {
          this.notificationPrompt(restored_database);
        },
        errors => {
          this.errors = errors;
          this.has_errors = true;
          this.is_processing = false;
        }
      );
  }

  onDownloadClick(dirPath: string) {
    var path = dirPath.split('/');

    this.databaseService
      .downloadDbDump(path[1])
      .subscribe(
        database => {
          var a = document.createElement("a");
          document.body.appendChild(a);

          var fileName = path[1];
          var url = window.URL.createObjectURL(database);
          a.href = url;
          a.download = fileName;
          a.click();

          this.notificationPrompt({ 'name': path[1] });
        },
        errors => {
          this.errors = errors;
          this.has_errors = true;
          this.is_processing = false;
        }
      );
  }

  notificationPrompt(input_database) {
    this._notificationsService
      .success(
        'Database: ' + input_database.name,
        'Successfully ' + this.state_view.substr(0, 1).toUpperCase() + this.state_view.substr(1) + 'd',
        {
          timeOut: 10000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: false
        })
  }

}
