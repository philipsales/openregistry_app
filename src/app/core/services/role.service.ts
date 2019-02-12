import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// import { Http, Headers, RequestOptions, Response } from '@angular/http';
// import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Helper } from '../helper';
import { Role } from '../models';
import { RoleJSON } from '../interfaces';
import { environment } from 'environments/environment';

@Injectable()
export class RoleService {

    constructor(private http: HttpClient) {
    }// --constructor

    getAll(): Observable<Role[]> {
      const url = environment.API_ENDPOINT + 'roles/';
      return this.http.get(url)
                 .map((response: Response) => {
                   return response['data'].map(Role.fromJSON);
                 })
                 .catch(Helper.handleError);
    }// --getAll

    get(role_id: string): Observable<Role> {
      const url = environment.API_ENDPOINT + 'roles/' + role_id;
      return this.http.get(url).map((response: RoleJSON) => {
        return Role.fromJSON(response);
      }).catch(Helper.handleError);
    }

    create(role: Role): Observable<Role> {
      const url = environment.API_ENDPOINT + 'roles/';
      const role_json = role.toJSON();
      return this.http.post(url, role_json)
              .map((response: RoleJSON) => {
                return Role.fromJSON(response);
              })
              .catch(Helper.handleError);
      }// --create

      update(this_role: Role): Observable<Role> {
        const url = environment.API_ENDPOINT + 'roles/' + this_role.id;
        const role_json = this_role.toJSON();

        return this.http.patch(url, role_json)
          .map((response: RoleJSON) => {
            // return (response.json().data as Form[])
            return Role.fromJSON(response);
        }).catch(Helper.handleError);
      }
}
