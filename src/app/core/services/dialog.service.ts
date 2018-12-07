import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class DialogService {

  constructor() { }
  
  confirm(message?: string): Observable<boolean> {
    const confirmation = window.confirm(message || 'Are you sure?');

    return Observable.of(confirmation);
  };
}
