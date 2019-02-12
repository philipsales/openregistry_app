import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Helper } from '../helper';
import { Permission } from '../models';
import { PermissionJSON } from '../interfaces';
import { environment } from 'environments/environment';

@Injectable()
export class PermissionService {

    constructor(private http: HttpClient) {
    }// --constructor

    getAll(): Observable<Permission[]> {
      const url = environment.API_ENDPOINT + 'permissions/';
      return this.http .get(url)
                 .map((response: Response) => {
                    return response['data'].map(Permission.fromJSON);
                 })
                 .catch(Helper.handleError);
    }// --getAll
}
