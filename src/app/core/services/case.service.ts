import { Injectable } from '@angular/core';

import { Headers, RequestOptions, Response, ResponseContentType } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Helper } from '../helper';
import { Case, SpecForm } from '../models';
import { CaseJSON } from '../interfaces';
import { environment } from 'environments/environment';
import { map, filter } from 'rxjs/operators';

@Injectable()
export class CaseService {

  private apiV1 = 'v1';
  private caseUrl = environment.API_ENDPOINT + '/cases';

  constructor(
    private httpclient: HttpClient) {
  }// --constructor

  list(index:number=0, 
    skip:number=10, 
    keywords:string='', 
    sort:number=0): Observable<CaseResultJSON>
  {
    const url = environment.API_ENDPOINT + 'cases/list';
    let params = new HttpParams()
      .set('index', index.toString())
      .set('limit', skip.toString())
      .set('keywords', keywords)
      .set('sort', sort.toString());
    return this.httpclient.get<{count:number, cases: CaseJSON[]}>(url, {params}).pipe(
      map(result => {
        return {
          count: result.count,
          cases: result.cases.map(Case.fromJSON)
        }
      })
    );
  }

  getAll(): Observable<Case[]> {
    const url = environment.API_ENDPOINT + 'cases/';

    return this.httpclient.get(url).map((response: Response) => {
      return response['data'].map((item: CaseJSON) => {
        return Case.fromJSON(item);
      });
    }).catch(Helper.handleError);
  }

  getMedicalCases(): Observable<Case[]> {
    const url = environment.API_ENDPOINT + 'cases/';
    const medical_org = environment.ORG_MEDICAL;
    return this.httpclient.get(url).map((response: Response) => {
      return response['data'].filter((all_cases: CaseJSON) => {
        return all_cases.organization === medical_org;
      }).map(Case.fromJSON);
    }).catch(Helper.handleError);
  }

  getBiobankCases(): Observable<Case[]> {
    const url = environment.API_ENDPOINT + 'cases/';
    const biobank_org = environment.ORG_BIOBANK;
    return this.httpclient.get(url).map((response: Response) => {
      return response['data'].filter((all_cases: CaseJSON) => {
        return all_cases.organization === biobank_org;
      }).map(Case.fromJSON);
    }).catch(Helper.handleError);
  }

  getBiobankCaseNumbers(): Observable<string[]> {
    const url = environment.API_ENDPOINT + 'cases/';
    const biobank_org = environment.ORG_BIOBANK;
    return this.httpclient.get(url).map((response: Response) => {
      return response['data'].filter((all_cases: CaseJSON) => {
        return all_cases.organization === biobank_org;
      }).map((x) => {
        return x['case_number'];
      });
    }).catch(Helper.handleError);
  }

  getMedicalCaseNumbers(): Observable<Case[]> {
    const url = environment.API_ENDPOINT + 'cases/';
    const medical_org = environment.ORG_MEDICAL;
    return this.httpclient.get(url).map((response: Response) => {
      return response['data'].filter((item: CaseJSON) => 
        item.organization == medical_org &&
        (item.specforms.length == 0)
      ).map(Case.fromJSON)
    }).catch(Helper.handleError);
  }


  get(case_id: string): Observable<Case> {
    const url = environment.API_ENDPOINT + 'cases/' + case_id;
    return this.httpclient.get(url).map((response: CaseJSON) => {
      return Case.fromJSON(response);
    }).catch(Helper.handleError);
  }

  createMedical(mycase: Case): Observable<Case> {
    const url = environment.API_ENDPOINT + 'cases/';
    const case_json = mycase.toJSON();
    case_json['origin'] = 'medical';

    return this.httpclient.post(url, case_json)
      .map((response: CaseJSON) => {
        // return (response.json().data as Form[])
        return Case.fromJSON(response);
      // }).catch(Helper.handleError);
      }).catch(error => Observable.throw(error));
  }

  create(mycase: Case): Observable<Case> {
    const url = environment.API_ENDPOINT + 'cases/';
    const case_json = mycase.toJSON();

    return this.httpclient.post(url, case_json)
      .map((response: CaseJSON) => {
        // return (response.json().data as Form[])
        return Case.fromJSON(response);
      // }).catch(Helper.handleError);
      }).catch(error => Observable.throw(error));
  }

  update(mycase: Case): Observable<Case> {
    const url = environment.API_ENDPOINT + 'cases/' + mycase.id;
    const case_json = mycase.toJSON();

    return this.httpclient.patch(url, case_json)
      .map((response: CaseJSON) => {
        // return (response.json().data as Form[])
        return Case.fromJSON(response);
      }).catch(error => Observable.throw(error));
  }

  updateSpecForm(case_id: string, specform: SpecForm[]): Observable<Case> {
    const url = environment.API_ENDPOINT + 'cases/' + case_id + '/specform';
    let specformjson = [];
    if (specform) {
      specformjson = specform.map((cur_specform) => cur_specform.toJSON());
    }
    return this.httpclient.patch(url, {specform: specformjson})
      .map((response: Case) => {
        // return (response.json().data as Form[])
        return Case.fromJSON(response);
    }).catch(Helper.handleError);
  }

  setFileHeader() {
    return new HttpHeaders({
      'Accept': 'application/json',
    });
  }

  upload(fileToUpload: any): Observable<any> {
    let input = new FormData();
    input.append("file", fileToUpload);

    const url = environment.API_ENDPOINT + 'cases/upload';


    var headers = { 'Content-Disposition': 'multipart/form-data' };
    var header1 = { 'Content-Type': 'application/json' };
    var header2 = { 'Accept': 'application/json' };

    /*
    return this.httpclient.post(url, form, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return this.httpclient.post(url, input,
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
    */
    return this.httpclient.post(url, input,
      {
      }
    )
      .map((response: Response) => {
        return response;
      }).catch(Helper.handleError);
  }


  downloadAttachment(path: string): Observable<Blob> {
    const url = environment.API_ENDPOINT + `cases/download/${path}`;

    return this.httpclient
      .get(url, { responseType: 'blob' })
      .map((response: any) => {
        return response;
      })
      .catch(Helper.handleError);
  }
}

export interface CaseResultJSON {
  count: number;
  cases: Case[];
}