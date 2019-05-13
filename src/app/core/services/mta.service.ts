import { Injectable } from '@angular/core';

import { Headers, RequestOptions, Response } from '@angular/http';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

// import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { map } from 'rxjs/operators';

import { Helper } from '../helper';
import { MTA } from '../models';
import { MTAJSON } from '../interfaces';
import { environment } from 'environments/environment';

@Injectable()
export class MtaService {

  constructor(private http: HttpClient) {
  }// --constructor

  list(
    index:number=0, 
    skip:number=10, 
    keywords:string='', 
    sort:number=0
  ): Observable<MTAResultJSON>
  {
    const url = environment.API_ENDPOINT + 'mtas/list';
    let params = new HttpParams()
      .set('index', index.toString())
      .set('limit', skip.toString())
      .set('keywords', keywords)
      .set('sort', sort.toString());
    return this.http.get<{count: number, mtas:MTAJSON[]}>(url, {params}).pipe(
      map(result => {
        return {
          count: result.count,
          mtas: result.mtas.map(MTA.fromJSON)
        }
      })
    )
  }

  getAll(): Observable<MTA[]> {
    const url = environment.API_ENDPOINT + 'mtas/';

    return this.http.get(url)
      .map((response: Response) => {
        return response['data'].map(MTA.fromJSON);
      })
      .catch(Helper.handleError);
  }

  get(id: string): Observable<MTA> {
    const url = environment.API_ENDPOINT + 'mtas/find';
    let params = new HttpParams()
      .set('id', id);
    return this.http.get<MTAJSON>(url, {params}).pipe(
      map(MTA.fromJSON)
    )
  }

  delete(id: string): Observable<MTA> {
    const url = environment.API_ENDPOINT + 'mtas';
    let params = new HttpParams()
      .set('id', id);
    return this.http.delete<MTAJSON>(url, {params}).pipe(
      map(MTA.fromJSON)
    )
  }

  upsert(mta: MTA): Observable<MTA> {
    const url = environment.API_ENDPOINT + `mtas/`;

    let input = new FormData();
    let file = mta.file;
    input.append("file", file as any);
    const consent_mta = mta.toJSON();
    input.append("data", JSON.stringify(consent_mta));

    return this.http
      .post(url, input)
      .map((response: MTAJSON) => {
        return MTA.fromJSON(response);
      })
      .catch(Helper.handleError);
  }

  downloadAttachment(mta: MTA): Observable<Blob> {
    const url = environment.API_ENDPOINT + 'mtas/download/' + mta.id;

    return this.http.get(url, { responseType: 'blob' })
    .map((response: any) => {
      return response
    }).catch(Helper.handleError);
  }

  save(this_mta: FormData): Observable<MTA> {
    const url = environment.API_ENDPOINT + `mtas/`;
    //var headers = new HttpHeaders().set('Content-Type', 'multipart/form-data;boundary='+ Math.random());
    //headers.append('Accept', 'application/json');
    
    return this.http
      .post(url, this_mta)
      .map((response: MTAJSON) => {
        return MTA.fromJSON(response);
      })
      .catch(Helper.handleError);
  }
}

export interface MTAResultJSON {
  count: number;
  mtas: MTA[];
}