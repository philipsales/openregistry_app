import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

//import { AuthHttp } from 'angular2-jwt';

import { Helper }         from '../helper';
import { Department }        from '../models';
import { environment }    from 'environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DepartmentJSON } from '../interfaces/departmentJSON';
import { map } from 'rxjs/operators';
import { asTextData } from '@angular/core/src/view';


@Injectable()
export class DepartmentService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private apiV1 = 'v1';

  private apiVersion = this.apiV1;
  private formUrl = environment.API_ENDPOINT + '/departments'; 

  constructor(
    private http: HttpClient
    //public authHttp: AuthHttp
    ) {
  }//--constructor

  get(id:string): Observable<Department> {
    const url = environment.API_ENDPOINT + 'departments/find';
    let params = new HttpParams()
      .set('id', id);
    return this.http.get<DepartmentJSON>(url, { params }).pipe(
      map(json => new Department(json))
    );
  }

  update(department: Department): Observable<any> {
    const url = environment.API_ENDPOINT + 'departments/';
    let params = new HttpParams()
      .set('id', department.id);
    return this.http.patch<DepartmentJSON>(url, department.toJSON(), {params}).pipe(
      map(json => new Department(json))
    ).catch(Helper.handleError);
  }

  list(index:number=0, skip:number=10, keywords: string = '', sort=1): Observable<any> {
    const url = environment.API_ENDPOINT + 'departments/';
    let params = new HttpParams()
      .set('index', index.toString())
      .set('limit', skip.toString())
      .set('keywords', keywords)
      .set('sort', sort.toString());
    return this.http.get<DepartmentsResultJSON>(url, { params }).pipe(
      map(res => {
        return {
          count: res.count,
          departments: res.departments.map(json => new Department(json))
        }
      })
    )
    .catch(error => Observable.throw(error));
  }

  create(department: Department): Observable<Department> {
    const url = environment.API_ENDPOINT + 'departments/';
    return this.http.post<DepartmentJSON>(url, department.toJSON())
      .map(deptJSON => Department.fromJSON(deptJSON))
      .catch(Helper.handleError);
  }

  isDepartmentNameValid(id, name): Observable<boolean> {
    const url = environment.API_ENDPOINT + 'departments/isDepartmentNameValid';
    const params = {id, name};
    return this.http.get<boolean>(url, {params});
  }

  getAllDepartments() {
    const url = environment.API_ENDPOINT + 'departments/all';
    return this.http.get<Department[]>(url)
                    .catch(Helper.handleError);
  }

  getDepartments(): Observable<Department[]> {
    const url = environment.API_ENDPOINT + 'departments/';
    return this.http
               .get<Department[]>(url)
                 .catch(Helper.handleError);
  }

}

export interface DepartmentsResultJSON {
  count: number;
  departments: Department[];
}