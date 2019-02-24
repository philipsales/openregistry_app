import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Helper } from '../helper';
import { User } from '../models';
import { UserJSON } from '../interfaces';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) {
    }// --constructor

    list(index:number=0, 
        skip:number=10, 
        keywords:string='', 
        sort:number=0) : Observable<UserResultJSON>
    {
        const url = environment.API_ENDPOINT + 'users/list';
        let params = new HttpParams()
          .set('index', index.toString())
          .set('limit', skip.toString())
          .set('keywords', keywords)
          .set('sort', sort.toString());
        return this.http.get<{count:number, users:UserJSON[]}>(url, {params}).pipe(
            map(result => {
                return {
                    count: result.count,
                    users: result.users.map(User.fromJSON)
                };
            })
        )
    }

    getAll(): Observable<User[]> {
        const url = environment.API_ENDPOINT + 'users/';
        return this.http.get(url).map((response: Response) => {
            return response['data'].map(User.fromJSON);
        })
            .catch(Helper.handleError);
    }// --getAll

    get(user_id: string): Observable<User> {
        const url = environment.API_ENDPOINT + 'users/' + user_id;
        return this.http.get(url).map((response: UserJSON) => {
            return User.fromJSON(response);
        }).catch(Helper.handleError);
    }

    create(user: User): Observable<User> {
        const url = environment.API_ENDPOINT + 'users/';
        let json = user.toJSON();
        return this.http.post(url, json)
            .map((response: UserJSON) => {
                return User.fromJSON(response);
            })
            .catch(Helper.handleError);
    }// --create

    update(this_user: User): Observable<User> {
        const url = environment.API_ENDPOINT + 'users/' + this_user.id;
        const user_json = this_user.toJSON();

        return this.http.patch(url, user_json)
            .map((response: UserJSON) => {
                return User.fromJSON(response);
            }).catch(Helper.handleError);
    }

    getMyAccount(user_id: string): Observable<User> {
        const url = environment.API_ENDPOINT + 'users/me/' + user_id;
        return this.http.get(url).map((response: UserJSON) => {
            return User.fromJSON(response);
        }).catch(Helper.handleError);
    }

    updateMyAccount(this_user: User): Observable<User> {
        const url = environment.API_ENDPOINT + 'users/me/' + this_user.id;
        const user_json = this_user.toJSON();

        return this.http.patch(url, user_json)
            .map((response: UserJSON) => {
                return User.fromJSON(response);
            }).catch(Helper.handleError);
    }

    updateMyPassword(id: string, new_password: string): Observable<User> {
        const url = environment.API_ENDPOINT + 'users/me/' + id + '/true';
        const user_json = { password: new_password };

        return this.http.patch(url, user_json)
            .map((response: UserJSON) => {
                return User.fromJSON(response);
            }).catch(Helper.handleError);
    }
}

export interface UserResultJSON {
    count: number;
    users: User[];
  }
