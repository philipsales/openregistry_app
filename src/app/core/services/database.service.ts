import { Injectable } from '@angular/core';

import { Headers, RequestOptions, Response, ResponseContentType } from '@angular/http';

import { HttpClient, HttpHeaders, HttpClientModule, HttpParams } from '@angular/common/http';
//import { Observable } from 'rxjs';
import { Observable } from 'rxjs/Observable';
//import { map, catch } from 'rxjs/operators';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
//import { AuthHttp } from 'angular2-jwt';
//import 'rxjs/add/operator/toPromise';

import { Helper } from '../helper';
import { Database } from '../models';
import { DatabaseJSON } from '../interfaces';
import { environment } from 'environments/environment';
import { Data } from '@angular/router/src/config';
import { map } from 'rxjs/operators';

@Injectable()
export class DatabaseService {

  //private headers = new Headers({ 'Content-Type': 'application/json' });

  private databaseUrlVersion = 'v1';
  private databaseUrl = environment.API_ENDPOINT + '/databases';

  constructor(
    private http: HttpClient
  ) {
  }//--constructor

  list(index:number=0, 
    skip:number=10, 
    keywords:string='', 
    sort:number=0) : Observable<DatabaseResultJSON>
  {
    const url = environment.API_ENDPOINT + 'databases/list';
    let params = new HttpParams()
      .set('index', index.toString())
      .set('limit', skip.toString())
      .set('keywords', keywords)
      .set('sort', sort.toString());
    return this.http.get<{count:number, databases: DatabaseJSON[]}>(url, {params}).pipe(
      map(result => {
        return {
          count: result.count,
          databases: result.databases.map(Database.fromJSON)
        }
      })
    )
  }

  create(database: Database): Observable<Database> {
    const url = environment.API_ENDPOINT + `databases/backup`;
    const database_json = database.toJSON();

    return this.http
      .post(url, database_json)
      .map((response: DatabaseJSON) => {
        return Database.fromJSON(response);
      })
      .catch(Helper.handleError);
  }

  getDatabases(): Observable<Database[]> {
    const url = environment.API_ENDPOINT + 'databases/';

    return this.http
      .get(url)
      .map((response: Response) => {
        //return (response.json() as Database[]);
        return response['data'].map(Database.fromJSON);
        //return (JSON.parse(response['_body']) as Database[]);
        //return (response.json() as Database[])
      })
      .catch(Helper.handleError);
  }

  getDatabase(id: string): Observable<Database> {
    const url = environment.API_ENDPOINT + `databases/${id}`;

    return this.http
      .get(url)
      .map((response: DatabaseJSON) => {
        return Database.fromJSON(response);
      })
      .catch(Helper.handleError);
  }

  update(id: string, database: Database): Observable<Database> {
    const url = environment.API_ENDPOINT + `databases/backup/${id}`;
    const database_json = database.toJSON();

    return this.http
      .patch(url, database_json)
      .map((response: DatabaseJSON) => {
        return Database.fromJSON(response);
      })
      .catch(Helper.handleError);
  }

  restore(id: string): Observable<Database> {
    const url = environment.API_ENDPOINT + `databases/restore/${id}`;

    return this.http
      .post(url, '')
      .map((response: DatabaseJSON) => {
        return Database.fromJSON(response);
      })
      .catch(Helper.handleError);
  }

  downloadDbDump(path: string): Observable<Blob> {
    const url = environment.API_ENDPOINT + `databases/download/${path}`;

    return this.http
      .get(url, { responseType: 'blob' })
      .map((response: any) => {
        return response;
      })
      .catch(Helper.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}

export interface DatabaseResultJSON {
  count: number;
  databases: Database[];
}
