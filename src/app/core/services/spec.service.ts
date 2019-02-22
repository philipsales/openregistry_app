import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Helper } from '../helper';
import { Spec } from '../models';
import { SpecJSON } from '../interfaces';
import { environment } from 'environments/environment';
import { SpecsCreateComponent } from 'app/main/biobanking/specs/specs-create/specs-create.component';
import { map } from 'rxjs/operators';

@Injectable()
export class SpecService {

  constructor(private http: HttpClient) {
  }// --constructor

  list(index:number=0, 
    skip:number=10, 
    keywords:string='', 
    sort:number=0): Observable<SpecResultJSON>
  {
    const url = environment.API_ENDPOINT + 'specs/list';
    let params = new HttpParams()
      .set('index', index.toString())
      .set('limit', skip.toString())
      .set('keywords', keywords)
      .set('sort', sort.toString());
    return this.http.get<{count:number, specs:SpecJSON[]}>(url, {params}).pipe(
      map(result => {
        return {
          count: result.count,
          specs: result.specs.map(Spec.fromJSON)
        }
      })
    );
  }

  getAll(): Observable<Spec[]> {

    const url = environment.API_ENDPOINT + 'specs/';
    return this.http.get(url)
      .map((response: Response) => {
        return response['data'].map(Spec.fromJSON);
      })
      .catch(Helper.handleError);

  }// --getAll

  get(spec_id: string): Observable<Spec> {
    const url = environment.API_ENDPOINT + 'specs/' + spec_id;
    return this.http.get(url).map((response: SpecJSON) => {
      return Spec.fromJSON(response);
    }).catch(Helper.handleError);
  }// --get

  create(this_spec: Spec): Observable<Spec> {

    const url = environment.API_ENDPOINT + `specs/`;
    const json_spec = this_spec.toJSON();
    return this.http
      .post(url, json_spec)
      .map((response: SpecJSON) => {
        return Spec.fromJSON(response);
      })
      .catch(Helper.handleError);

  }// --create

  update(this_spec: Spec): Observable<Spec> {
    const url = environment.API_ENDPOINT + 'specs/' + this_spec.id;
    const role_json = this_spec.toJSON();
    return this.http.patch(url, role_json)
      .map((response: SpecJSON) => {
        return Spec.fromJSON(response);
    }).catch(Helper.handleError);
  }

}// -- SpecService


export interface SpecResultJSON {
  count: number;
  specs: Spec[];
}