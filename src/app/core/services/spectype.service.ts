import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Helper } from '../helper';
import { SpecType } from '../models';
import { SpecTypeJSON } from '../interfaces';
import { environment } from 'environments/environment';

@Injectable()
export class SpecTypeService {

  constructor(private http: HttpClient) {
  }// --constructor

  getAll(): Observable<SpecType[]> {

    const url = environment.API_ENDPOINT + 'spectypes/';
    return this.http.get(url)
      .map((response: Response) => {
        console.log('SERVICE get SpecType', response['data'].map(SpecType.fromJSON));
        return response['data'].map(SpecType.fromJSON);
      })
      .catch(Helper.handleError);

  }// --getAll

  create(this_spectype: SpecType): Observable<SpecType> {

    const url = environment.API_ENDPOINT + `spectypes/`;
    const json_spectype = this_spectype.toJSON();
    return this.http
      .post(url, json_spectype)
      .map((response: SpecTypeJSON) => {
        console.log(response);
        return SpecType.fromJSON(response);
      })
      .catch(Helper.handleError);

  }// --create

}// -- SpecTypeService
