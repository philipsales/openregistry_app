import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Helper } from '../helper';
import { Case, FormAnswer, Answer } from '../models';
import { CaseJSON, FormAnswerJSON } from '../interfaces';
import { environment } from 'environments/environment';

@Injectable()
export class FormAnswerService {

  private caseUrl = environment.API_ENDPOINT + '/cases';

  constructor(private http: Http,
              private httpclient: HttpClient) {
  }// --constructor

  get(case_id: string, formanswer_id: string): Observable<FormAnswer> {
    const url = environment.API_ENDPOINT + 'cases/' + case_id + '/forms/' + formanswer_id;
    return this.httpclient.get(url).map((response: FormAnswerJSON) => {
      return FormAnswer.fromJSON(response);
    }).catch(Helper.handleError);
  }

  create(case_id: string, formanswer_id: string, formanswer: FormAnswer): Observable<FormAnswer> {
    const url = environment.API_ENDPOINT + 'cases/' + case_id + '/forms/' + formanswer_id;
    const formanswer_json = formanswer.toJSON();

    return this.httpclient.post(url, formanswer_json)
      .map((response: FormAnswerJSON) => {
        // return (response.json().data as Form[])
        return FormAnswer.fromJSON(response);
    }).catch(Helper.handleError);
  }

  update(case_id: string, formanswer_id: string, form_answers: FormAnswer): Observable<FormAnswer> {
    const url = environment.API_ENDPOINT + 'cases/' + case_id + '/forms/' + formanswer_id;
    const formanswer_json = form_answers.toJSON();

    return this.httpclient.patch(url, {answers: formanswer_json.answers})
      .map((response: FormAnswerJSON) => {
        // return (response.json().data as Form[])
        return FormAnswer.fromJSON(response);
    }).catch(Helper.handleError);
  }
}
