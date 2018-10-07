import { Injectable } from '@angular/core';

import { Headers, RequestOptions, Response } from '@angular/http';

import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  create(this_mta: MTA): Observable<MTA> {
    const url = environment.API_ENDPOINT + `mtas/`;
    const consent_mta = this_mta.toJSON();

    return this.http
      .post(url, consent_mta)
      .map((response: MTAJSON) => {
        console.log(response);
        return MTA.fromJSON(response);
      })
      .catch(Helper.handleError);
  }

  save(this_mta: FormData): Observable<MTA> {
    const url = environment.API_ENDPOINT + `mtas/`;
    //var headers = new HttpHeaders().set('Content-Type', 'multipart/form-data;boundary='+ Math.random());
    //headers.append('Accept', 'application/json');
    
    return this.http
      .post(url, this_mta)
      .map((response: MTAJSON) => {
        console.log(response);
        return MTA.fromJSON(response);
      })
      .catch(Helper.handleError);
  }
}
