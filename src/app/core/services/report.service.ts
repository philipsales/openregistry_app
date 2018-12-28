import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, ResponseContentType } from '@angular/http';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Helper } from '../helper';
import { Report } from '../models';
import { environment } from 'environments/environment';

@Injectable()
export class ReportService {

  constructor(private http: HttpClient) {
  }// --constructor

  getMedicalReportCounts(parameters: any): Observable<Report[]> {
    const url = environment.API_ENDPOINT + 'reports/medicalreportparameters';

    return this.http
      .post(url, {
        form_name: parameters['form_name'],
        diagnosis: parameters['diagnosis']
      })
      .map((response: Response) => {
        return response['result'];
      })
      .catch(Helper.handleError);
  }

  getMedicalReportCountResults(parameters: any): Observable<Report[]> {
    const url = environment.API_ENDPOINT + 'reports/medicalreportcountresults';

    return this.http
      .post(url, {
        form_name: parameters['form_name'],
        form_field: parameters['form_field'],
        diagnosis: parameters['diagnosis']
      })
      .map((response: Response) => {
        return response['result']['payload'][0]['results'];
      })
      .catch(Helper.handleError);
  }

  getMedicalReportRaw(): Observable<Report[]> {
    const url = environment.API_ENDPOINT + 'reports/medicalreports';

    return this.http
      .get(url)
      .map((response: Response) => {
        return response['result'];
      })
      .catch(Helper.handleError);
  }
}
