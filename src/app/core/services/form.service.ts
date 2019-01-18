import { Injectable } from '@angular/core';
import * as moment from 'moment';

// import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
// Statics
import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

import { Helper } from '../helper';
import { Form, Question } from '../models';
import { environment } from 'environments/environment';
import { FormJSON } from 'app/core/interfaces';
import { map } from 'rxjs/operators';

@Injectable()
export class FormService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private apiV1 = 'v1';

  private apiVersion = this.apiV1;
  private formUrl = environment.API_ENDPOINT + '/forms';

  private _currentForm: Form;

  set currentForm(instance: Form) {
    console.log(instance, 'RECEIVED FORM');
    this._currentForm = instance;
  }

  get currentForm(): Form {
    return this._currentForm;
  }

  constructor(public http: HttpClient) {
  }// --constructor
  /*
    getQuestions(): Observable<Question[]>  {
      const url = environment.API_ENDPOINT + '/questions/';
      // const url = 'http://127.0.0.1:8888' + '/questions';
      return this.http
               .get(url)
               .map((response: Response) => {
                  console.warn(response, 'OUTTTTTTTTTTTTTT');
                  response.json().data1.map(Question.fromJSON);
                  // return (response.json().data as Question[])
              });
    }// --getQuestions
  */

  getForms(): Observable<Form[]> {
    const url = environment.API_ENDPOINT + 'forms/';

    return this.http.get(url).map((response: Response) => {
      return response['data'].map(Form.fromJSON);
    }).catch(Helper.handleError);
  }

  list(type: string = environment.FORM_TYPE_BIOBANK, 
    index:number=0, skip:number=10, keywords:string='', sort:number=0): Observable<FormResultJSON> {
    const url = environment.API_ENDPOINT + 'forms/list';
    let params = new HttpParams()
      .set('index', index.toString())
      .set('limit', skip.toString())
      .set('keywords', keywords)
      .set('sort', sort.toString())
      .set('type', type);
    return this.http.get<{count:number; forms: FormJSON[]}>(url, {params}).pipe(
      map(result => {
        return {
          count: result.count,
          forms: result.forms.map(Form.fromJSON)
        }
      })
    );
  }

  getBiobankForms(): Observable<Form[]> {
    const biobank_form_type = environment.FORM_TYPE_BIOBANK;
    const user = JSON.parse(localStorage.getItem('user'));
    const url = environment.API_ENDPOINT + 'forms/';
    return this.http.get(url).map((response) => {
      return response['data'].filter((all_forms: FormJSON) => {
        return all_forms.type == biobank_form_type &&
        (<string[]>user['departments']).some(dept => all_forms.department.indexOf(dept) != -1);
      }).map(Form.fromJSON);
    }).catch(Helper.handleError);
  }

  getMedicalForms(): Observable<Form[]> {
    const medical_form_type = environment.FORM_TYPE_MEDICAL;
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    const url = environment.API_ENDPOINT + 'forms/';
    return this.http.get(url).map((response: Response) => {
      return response['data'].filter((all_forms: FormJSON) => {
        console.log(all_forms, 'ALL');
        return all_forms.type == medical_form_type 
        && (<string[]>user['departments']).some(dept => all_forms.department.indexOf(dept) != -1);
      }).map(Form.fromJSON);
    }).catch(Helper.handleError);
  }

  getValidMedicalForms(): Observable<Form[]> {
    const medical_form_type = environment.FORM_TYPE_MEDICAL;
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    const url = environment.API_ENDPOINT + 'forms/';
    return this.http.get(url).map((response: Response) => {
      return response['data'].filter((all_forms: FormJSON) => {
        return all_forms.type == medical_form_type
        && (<string[]>user['departments']).some(
          dept => all_forms.department.indexOf(dept) != -1)
        && all_forms.status === 'Approved'
        && moment().isSameOrBefore(all_forms.validity_date, 'day');
      }).map(Form.fromJSON);
    }).catch(Helper.handleError);
  }

  getValidBiobankForms(): Observable<Form[]> {
    const biobank_form_type = environment.FORM_TYPE_BIOBANK;
    const user = JSON.parse(localStorage.getItem('user'));
    const url = environment.API_ENDPOINT + 'forms/';
    return this.http.get(url).map((response) => {
      console.log(response, 'response');
      return response['data'].filter((all_forms: FormJSON) => {
        return all_forms.type == biobank_form_type 
          && (<string[]>user['departments']).some(
            dept => all_forms.department.indexOf(dept) != -1)
          && all_forms.status === 'Approved'
          && all_forms.isValid
      }).map(Form.fromJSON);
    }).catch(Helper.handleError);
  }

  getForm(id: string): Observable<Form> {
    const url = environment.API_ENDPOINT + `forms/${id}`;
    return this.http.get(url)
      .map((response: FormJSON) => {
        // return (response.json().data as Form)
        return Form.fromJSON(response);
      })
      .catch(Helper.handleError);
  }

  delete(form: Form): Observable<Form> {
    const url = environment.API_ENDPOINT + `forms/${form.id}`;
    return this.http.delete(url)
      .map((response: FormJSON) => {
        // return (response.json().data as Form)
        return Form.fromJSON(response);
      })
      .catch(Helper.handleError);
  }
  /*
  // TODO: SHOUD return Object Form instead of Question
  submitForm(form: Form): Observable<Question> {


    // TODO: DUMMY REQUESTION, replace FORM object when API done
    const question = [
      {
      'id': '123',
      'key': 'pcari1',
      'label': 'pcari1',
      'options': 'Male|Female',
      'order': 0,
      'required': true,
      'type': 'dropdown',
      'value': ''
      },
      {
      'id': '1233',
      'key': 'postman2',
      'label': 'pcari2',
      'options': 'Male|Female',
      'order': 0,
      'required': true, 
      'type': 'dropdown',
      'value': ''
      }
    ];

    const url = environment.API_QUESTION_HOST + '/questions';

    let question_json = JSON.stringify(question);

    //TODO: Refractor headers to allow cors
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Accept', 'application/json');
    headers.append('Allow', 'GET,POST,HEAD,OPTIONS');
    headers.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: headers });

    //return this.authHttp

    return this.http.post(url, question_json, options)
               .map((response: Response) => {

                  //TODO: temporary API not done
                  console.warn('--TEMPORARY FAKE RESPONSE---');
                  //return new Question('','','','',false,1,[]);
                  return (response.json() as Question);

                  //TODO: SHOUD return Object Form instead of Question
                  //return Question.fromJSON(response.json());
               })
               .catch(error => {
                  console.log('error',error);
                  throw error;
              });
  }// --create
*/

  checkForm(form: Form) {
    const ewan_json = JSON.stringify(form);
    const form_json = form.toJSON();
    console.warn(form_json, 'IN STRING');
  }

  //submitForm(form: FormJSON): Observable<Form> {
  submitForm(form: any): Observable<Form> {
    const url = environment.API_ENDPOINT + 'forms/';

    let input = new FormData();
    var file = form.file;
    input.append("file", file);
    console.log('FILE TO UPLOAD', file);
    console.log('FORM BEFORE dirpath: ', form);
    input.append("data", JSON.stringify(Form.fromJSON(form)));
    console.log('FORM AFTER dirpath: ', form);

    return this.http
      .post(url, input)
      .map((response: FormJSON) => {
        console.log(response, 'FORM CREATED from /forms');
        return Form.fromJSON(response);
      })

      .catch(Helper.handleError);
  }

  upload(fileToUpload: any): Observable<any> {
    let input = new FormData();
    input.append("file", fileToUpload);
    const url = environment.API_ENDPOINT + 'cases/upload';

    return this.http
      .post(url, input)
      .map((response: Response) => {
        return response;
      }).catch(Helper.handleError);
  }

  //updateForm(form: FormJSON): Observable<Form> {
  updateForm(form: any): Observable<Form> {
    const url = environment.API_ENDPOINT + 'forms/' + form._id;

    let input = new FormData();
    var file = form.file;
    input.append("file", file);
    input.append("data", JSON.stringify(Form.fromJSON(form)));

    return this.http
      //.patch(url, form)
      .patch(url, input)
      .map((response: FormJSON) => {
        return Form.fromJSON(response);
      })
      .catch(Helper.handleError);
  }
}

export interface FormResultJSON {
  count: number;
  forms: Form[];
}