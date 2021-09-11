import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { APP_SERIES } from '../constants';
import { ROUTES_ENUM } from '../enums';

@Injectable()
// This guard is added whenever we have the series as a param in the route so we only allow supported series
export class SeriesGuard implements CanActivate {

  constructor(private router: Router) { }


  /**
   * @param route 
   * @param state 
   * @returns 
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // If the user is trying to access with any supported series, the user won't be blocked
    if (route.params && route.params.series && APP_SERIES.includes(route.params.series)) {
      return true
    }
    // If the user is trying to access anything but supported series, the user will be redirected to the first supported series
    else {
      this.router.navigate([`${ROUTES_ENUM.LANDING}/${APP_SERIES[0]}`]);
    }
    return false;
  }

}
