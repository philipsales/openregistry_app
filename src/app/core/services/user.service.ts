import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Helper } from '../helper';
import { User } from '../models';
import { UserJSON } from '../interfaces';
import { environment } from 'environments/environment';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) {
    }// --constructor

    getAll(): Observable<User[]> {
        const url = environment.API_ENDPOINT + 'users/';
        return this.http.get(url).map((response: Response) => {
            console.log(response['data'], 'OUTPUT GET /users');
            return response['data'].map(User.fromJSON);
        })
            .catch(Helper.handleError);
    }// --getAll

    get(user_id: string): Observable<User> {
        const url = environment.API_ENDPOINT + 'users/' + user_id;
        return this.http.get(url).map((response: UserJSON) => {
            console.log(response, 'OUTPUT GET /users');
            return User.fromJSON(response);
        }).catch(Helper.handleError);
    }

    create(user: User): Observable<User> {
        const url = environment.API_ENDPOINT + 'users/';
        let json = user.toJSON();
        console.log(json, 'json');
        return this.http.post(url, json)
            .map((response: UserJSON) => {
                return User.fromJSON(response);
            })
            .catch(Helper.handleError);
    }// --create

    update(this_user: User): Observable<User> {
        console.log('FOO', this_user);
        const url = environment.API_ENDPOINT + 'users/' + this_user.id;
        const user_json = this_user.toJSON();
        console.log('fuck', user_json);

        return this.http.patch(url, user_json)
            .map((response: UserJSON) => {
                console.log(response, 'USER UPDATED from /users');
                return User.fromJSON(response);
            }).catch(Helper.handleError);
    }

    getMyAccount(user_id: string): Observable<User> {
        const url = environment.API_ENDPOINT + 'users/me/' + user_id;
        return this.http.get(url).map((response: UserJSON) => {
            console.log(response, 'OUTPUT GET /users');
            return User.fromJSON(response);
        }).catch(Helper.handleError);
    }

    updateMyAccount(this_user: User): Observable<User> {
        const url = environment.API_ENDPOINT + 'users/me/' + this_user.id;
        const user_json = this_user.toJSON();
        console.log(user_json);

        return this.http.patch(url, user_json)
            .map((response: UserJSON) => {
                console.log(response, 'USER UPDATED from /users');
                return User.fromJSON(response);
            }).catch(Helper.handleError);
    }

    updateMyPassword(id: string, new_password: string): Observable<User> {
        const url = environment.API_ENDPOINT + 'users/me/' + id + '/true';
        const user_json = { password: new_password };
        console.log(user_json);

        return this.http.patch(url, user_json)
            .map((response: UserJSON) => {
                console.log(response, 'USER UPDATED from /users');
                return User.fromJSON(response);
            }).catch(Helper.handleError);
    }
}
