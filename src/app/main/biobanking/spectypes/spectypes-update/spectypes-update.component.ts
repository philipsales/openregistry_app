import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';

import { SpecTypeService } from 'app/core/services';

import { SpecType } from 'app/core/models';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NoJWTError } from 'app/core/errors';
import { SpecTypeJSON } from 'app/core/interfaces';

@Component({
  selector: 'app-spectypes-update',
  templateUrl: './spectypes-update.component.html',
  styleUrls: ['./spectypes-update.component.css']
})
export class SpectypesUpdateComponent implements OnInit {
  specimentype: SpecType;
  specimentype_id: string;

  constructor(
    private route: ActivatedRoute,
    private specTypeService: SpecTypeService
  ) {
    this.specimentype = new SpecType('');
  }

  ngOnInit() {
    this.specimentype_id = this.route.snapshot.paramMap.get('id');
    this.specTypeService.get(this.specimentype_id).subscribe((response: SpecType) => {
      delete this.specimentype;
      this.specimentype = response;
      console.log(response);
    }, error => {
      console.log(error); // get the error in error handler
      if (error instanceof NoJWTError) {
        console.warn('TO DO : handle JWT Expired');
      }
    });
  }

}

