import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { AuthHttp } from 'angular2-jwt';

import { User }           from 'app/core/models';
import { environment }    from 'environments/environment';

@Injectable()
export class UserService {

    constructor(
	private http: Http,
	public authHttp: AuthHttp) {
    }//--constructor

    getAll(): Observable<User[]> {
	const url = environment.API_ENDPOINT + '/users-via-email/';
	return this.http.get(url).map((response: Response) => {
            return <User[]>response.json();
        });
    }//--getAll

    mapUsers(response:Response): User[]{
	// The response of the API has a results
	// property with the actual results
	console.warn(response.json());
	console.warn(response.json().data);
	return response.json().map(this.toUser)
    }

    toUser(r:any): User{
	console.warn('waaaaaaaaaaaaaaaaaaaaa');
	let user = <User>({
	    username: r.username,
	    first_name: r.first_name,
	    middle_name: r.middle_name,
	    last_name: r.last_name,
	    gender: r.gender,
	    verification_status: r.verification_status,
	    email: r.username,
	});
	console.log('Parsed user:', user);
	return user;
    }
}
