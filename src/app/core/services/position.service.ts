import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//import { map, catch } from 'rxjs/operators';
//import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
//import { AuthHttp } from 'angular2-jwt';

import { Helper }         from '../helper';
import { Position }       from '../models';
import { PositionJSON }   from '../interfaces';
import { environment }    from 'environments/environment';

@Injectable()
export class PositionService {

    constructor(
	private http: Http
  // public authHttp: AuthHttp
  ) {
    }//--constructor

    getAll(): Observable<Position[]> {
	const url = environment.API_ENDPOINT + '/positions/';
	return this.http.get(url)
	    .map((response: Response) => {
		return response.json().map(Position.fromJSON);
            })
	    .catch(Helper.handleError);
    }//--getAll

}
