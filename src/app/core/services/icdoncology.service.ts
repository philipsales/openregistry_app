import { Injectable } from '@angular/core';

import { Headers, RequestOptions, Response } from '@angular/http';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Helper } from '../helper';
import { environment } from 'environments/environment';
import { Icdoncology } from 'app/core/models';

@Injectable()
export class IcdoncologyService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private databaseUrlVersion = 'v1';
  private databaseUrl = environment.API_ENDPOINT + '/icdoncologies';

  constructor(private http: HttpClient) {
  }//--constructor

  //getDiagnoses(params: any): Observable<Icdoncology[]> {
  getDiagnoses(params: any): Observable<any[]> {

    let query = '';

    if (params.site && !params.histology) {
      query = `?site=${params.site}`;
    } else if (!params.site && params.histology) {
      query = `?histology=${params.histology}`
    } else {
      query = `?site=${params.site}&histology=${params.histology}`;
    }

    const url = environment.API_ENDPOINT + `icd/icdoncologies/` + query;

    return this.http
      .get(url)
      .map((response: Response) => {

        if (!response['result']['error']) {
          return response['result']['payload'].map(Icdoncology.fromJSON);
        } else {
          return response['result']['error'];
        }
      })
      .catch(Helper.handleError);
  }

}
