import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Helper } from '../helper';
import { Spec } from '../models';
import { SpecJSON } from '../interfaces';
import { environment } from 'environments/environment';

@Injectable()
export class SpecService {

  constructor(private http: HttpClient) {
  }// --constructor

  getAll(): Observable<Spec[]> {

    const url = environment.API_ENDPOINT + 'specs/';
    return this.http.get(url)
      .map((response: Response) => {
        console.log('SERVICE get Spec', response['data'].map(Spec.fromJSON));
        return response['data'].map(Spec.fromJSON);
      })
      .catch(Helper.handleError);

  }// --getAll

  create(this_spec: Spec): Observable<Spec> {

    const url = environment.API_ENDPOINT + `specs/`;
    const json_spec = this_spec.toJSON();
    return this.http
      .post(url, json_spec)
      .map((response: SpecJSON) => {
        console.log(response);
        return Spec.fromJSON(response);
      })
      .catch(Helper.handleError);

  }// --create

  update(this_spec: Spec): Observable<Spec> {
    const url = environment.API_ENDPOINT + 'specs/' + this_spec.id;
    const role_json = this_spec.toJSON();
    console.log(role_json);
    return this.http.patch(url, role_json)
      .map((response: SpecJSON) => {
        console.log(response, 'SPEC UPDATED from /specs');
        return Spec.fromJSON(response);
    }).catch(Helper.handleError);
  }

}// -- SpecService
