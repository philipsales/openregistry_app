import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
// import { Observable } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


import { Helper } from '../helper';
import { User } from '../models';
import { environment } from 'environments/environment';

@Injectable()
export class AuthService {
  public token: string;
  public current_user: User;

  constructor(private http: Http) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }// --constructor

  login(username: string, password: string): Observable<any> {
      const url = environment.API_HOST + '/users/token';
      return this.http.post(url, { username: username, password: password }).map((response: Response) => {
            const token = response.json() && response.json().token;
            const permissions = response.json() && response.json().permissions;
            if (token) {
                this.token = token;
                const user = response.json() && response.json().user;
                this.current_user = User.fromJSON(user);

                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token, user: this.current_user }));
                localStorage.setItem('user', JSON.stringify(this.current_user));
                localStorage.setItem('access_token', this.token);
                localStorage.setItem('permissions', JSON.stringify(permissions));

                return {
                    status: true,
                    user: user,
                };
            } else {
                return {
                    status: false,
                    user: null,
                };
            }
      })
    //   .catch(Helper.handleError);
    .catch(e => {
        if (e['status'] == 401) {
            let res = {
                status: false,
                code: e['status']
            };
            return Observable.throw(res);
        }
        return Helper.handleError(e);
    });
  }// --login

  checkPassword(username: string, password: string): Observable<any> {
        const url = environment.API_HOST + '/users/token';
        return this.http.post(url, { username: username, password: password }).map((response: Response) => {
            const token = response.json() && response.json().token;
            if (token) {
                return true;
            } else {
                return false;
            }
        })
        .catch((error: Response) => {
            let errMsg = 'Failed';
            if (error.status === 400) {
                errMsg = 'Wrong password';
            }
            return Observable.throw(errMsg);
        });
    }// --login
}
