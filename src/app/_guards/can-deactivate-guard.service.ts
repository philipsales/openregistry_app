import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class CanDeactivateGuardService implements CanDeactivate<CanComponentDeactivate> {

  constructor() { }

    canDeactivate(component: CanComponentDeactivate, 
           route: ActivatedRouteSnapshot, 
           state: RouterStateSnapshot) {

     let url: string = state.url;
     console.log('Url: '+ url);

     return component.canDeactivate ? component.canDeactivate() : true;
  }
}
