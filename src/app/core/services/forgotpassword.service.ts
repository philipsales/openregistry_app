import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ForgotPassword } from '../models';
import { environment } from 'environments/environment';

@Injectable()
export class ForgotpasswordService {

  constructor(private http: HttpClient) { }

  forgotPassword(user: ForgotPassword) {
    const url = environment.API_ENDPOINT + 'users/forgot';
    return this.http.post(url, user.toJSON());
  }

}
