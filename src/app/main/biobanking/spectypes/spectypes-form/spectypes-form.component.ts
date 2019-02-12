import { Component, OnInit, Input } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';

import { SpecType } from 'app/core/models';
import { SpecTypeJSON } from 'app/core/interfaces';
import { SpecTypeService } from 'app/core/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-spectypes-form',
  templateUrl: './spectypes-form.component.html',
  styleUrls: ['./spectypes-form.component.css']
})
export class SpectypesFormComponent implements OnInit {

  _resetspecimentype: SpecTypeJSON;
  _specimentype: SpecType;
  @Input() set specimentype(value: SpecType) {
    if (value) {
      this._specimentype = value;
      this._resetspecimentype = this._specimentype.toJSON();
    }
  }// -- _reinit setter

  @Input() method: string;

  errors: any = {};
  has_errors = false;
  is_processing = false;

  constructor(
        private specTypeService: SpecTypeService,
        private _notificationsService: NotificationsService,
        private router: Router
    ) {
        this._specimentype = new SpecType('');
        this._resetspecimentype = this._specimentype.toJSON();
    }// --constructor

  ngOnInit() {
  }

  onResetSpecimenTypeClick() {
    this._specimentype = SpecType.fromJSON(this._resetspecimentype);
  }

  onSaveClick(this_specimentype: SpecType) {
    if (this.method === 'CREATE') {
        this.createSpecimen(this_specimentype);
    } else if (this.method === 'UPDATE') {
        this.updateSpecimen(this_specimentype);
    }
  }// --onSaveClick

  createSpecimen(this_specimentype: SpecType) {
    this.errors = {};
    this.has_errors = false;
    this.is_processing = true;
    this.specTypeService.create(this_specimentype).subscribe((created_specimentype: SpecType) => {
        this.is_processing = false;
        this._notificationsService.success(
            'New Specimen Type : ' + created_specimentype.name,
            'Successfully Created',
            {
                timeOut: 10000,
                showProgressBar: true,
                pauseOnHover: false,
                clickToClose: false,
            }
        );
        this.router.navigate(['/biobanking/spectypes']);
    },
        errors => {
            console.log(errors, 'ERROR : spectypes-form.component');
            this.errors = errors;
            this.has_errors = true;
            this.is_processing = false;
        });
  }

  updateSpecimen(this_specimentype: SpecType) {
    this.errors = {};
    this.has_errors = false;
    this.is_processing = true;
    this.specTypeService.update(this_specimentype).subscribe((updated_specimentype: SpecType) => {
        this.is_processing = false;
        this._notificationsService.success(
            'Specimen : ' + this_specimentype.name,
            'Successfully Updated',
            {
                timeOut: 10000,
                showProgressBar: true,
                pauseOnHover: false,
                clickToClose: false,
            }
        );
    },
        errors => {
            console.log(errors, 'ERROR : spectypes-form.component');
            this.errors = errors;
            this.has_errors = true;
            this.is_processing = false;
        });
  }
}
