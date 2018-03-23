import { Injectable } from '@angular/core';

import { Headers, RequestOptions, Response } from '@angular/http';

import { HttpClient } from '@angular/common/http';

// import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Helper } from '../helper';
import { MTA } from '../models';
import { MTAJSON } from '../interfaces';
import { environment } from 'environments/environment';

@Injectable()
export class MtaService {

  constructor(private http: HttpClient) {
  }// --constructor

  getAll(): Observable<MTA[]> {
    const url = environment.API_ENDPOINT + 'mtas/';

    return this.http.get(url)
      .map((response: Response) => {
        console.log('SERVICE getCNOSENT', response['data'].map(MTA.fromJSON));
        return response['data'].map(MTA.fromJSON);
      })
      .catch(Helper.handleError);
  }


}
