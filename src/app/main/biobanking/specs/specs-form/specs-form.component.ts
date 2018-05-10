import { Component, OnInit, Input } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';

import { Spec } from 'app/core/models';
import { SpecJSON } from 'app/core/interfaces';
import { SpecService } from 'app/core/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-specs-form',
  templateUrl: './specs-form.component.html',
  styleUrls: ['./specs-form.component.css']
})
export class SpecsFormComponent implements OnInit {

  _resetspecimen: SpecJSON;
  _specimen: Spec;
  @Input() set specimen(value: Spec) {
    console.log(value, 'OIST');
    if (value) {
      this._specimen = value;
      this._resetspecimen = this._specimen.toJSON();
    }
    console.warn('HELLO!');
  }// -- _reinit setter

  @Input() method: string;

  errors: any = {};
  has_errors = false;
  is_processing = false;

  constructor(
        private specService: SpecService,
        private _notificationsService: NotificationsService,
        private router: Router
    ) {
        this._specimen = new Spec('');
        this._resetspecimen = this._specimen.toJSON();
    }// --constructor

  ngOnInit() {
  }

  onResetSpecimenClick() {
    this._specimen = Spec.fromJSON(this._resetspecimen);
  }

  onSaveClick(this_specimen: Spec) {
    if (this.method === 'CREATE') {
        this.createSpecimen(this_specimen);
    } else if (this.method === 'UPDATE') {
        this.updateSpecimen(this_specimen);
    }
  }// --onSaveClick

  createSpecimen(this_specimen: Spec) {
    console.log(this_specimen, 'My Specimen');
    this.errors = {};
    this.has_errors = false;
    this.is_processing = true;
    this.specService.create(this_specimen).subscribe((created_specimen: Spec) => {
        this.is_processing = false;
        console.log(created_specimen, 'Specimen CREATED : specs-form.component');
        this._notificationsService.success(
            'New Specimen : ' + created_specimen.name,
            'Successfully Created',
            {
                timeOut: 10000,
                showProgressBar: true,
                pauseOnHover: false,
                clickToClose: false,
            }
        );
        this.router.navigate(['/biobanking/specs']);
    },
        errors => {
            console.log(errors, 'ERROR : specs-form.component');
            this.errors = errors;
            this.has_errors = true;
            this.is_processing = false;
        });
  }

  updateSpecimen(this_specimen: Spec) {
    console.log(this_specimen, 'My Specimen');
    this.errors = {};
    this.has_errors = false;
    this.is_processing = true;
    this.specService.update(this_specimen).subscribe((updated_specimen: Spec) => {
        this.is_processing = false;
        console.log(updated_specimen, 'SPECIMEN UPDATED : spec-form.component');
        this._notificationsService.success(
            'Specimen : ' + this_specimen.name,
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
            console.log(errors, 'ERROR : spec-form.component');
            this.errors = errors;
            this.has_errors = true;
            this.is_processing = false;
        });
  }
}
