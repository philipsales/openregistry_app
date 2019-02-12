import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      // logged in so return true
        const user = JSON.parse(currentUser).user;
      if (user) {
        return true;
      } else {
          this.router.navigate(['/login']);
        return false;
      }
    }

    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
