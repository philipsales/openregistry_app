import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';

import { SpecService } from 'app/core/services';

import { Spec } from 'app/core/models';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NoJWTError } from 'app/core/errors';
import { SpecJSON } from 'app/core/interfaces';

@Component({
  selector: 'app-specs-update',
  templateUrl: './specs-update.component.html',
  styleUrls: ['./specs-update.component.css']
})
export class SpecsUpdateComponent implements OnInit {

  specimen: Spec;
  specimen_id: string;

  constructor(
    private route: ActivatedRoute,
    private specService: SpecService
  ) {
    this.specimen = new Spec('');
  }

  ngOnInit() {
    this.specimen_id = this.route.snapshot.paramMap.get('id');
    this.specService.get(this.specimen_id).subscribe((response: Spec) => {
      delete this.specimen;
      this.specimen = response;
    }, error => {
      console.log(error); // get the error in error handler
      if (error instanceof NoJWTError) {
        console.warn('TO DO : handle JWT Expired');
      }
    });
  }

}
