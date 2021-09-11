import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { APP_SEASONS_START } from '../constants';
import { LanguageHelper } from '../helpers';

// This guard is added whenever we have the season as a param in the route so we only allow supported seasons
// In other case when we support more series, the list of supported seasons wont be static anymore, in that case we can replace this guard by a resolver
@Injectable()
export class SeasonsGuard implements CanActivate {

  private languageHelper = LanguageHelper;

  constructor(private router: Router) { }

  /**
   * @param next 
   * @param state 
   * @returns 
   */
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const thisYear = (new Date()).getFullYear();
    const supportedSeasons = this.languageHelper.generateListFromTo(APP_SEASONS_START, thisYear);
    // If the user is trying to access with any supported season, the user won't be blocked
    if (route.params && route.params.season && Number(route.params.season) && supportedSeasons?.includes(Number(route.params.season))) {
      return true
    }
    // If the user is trying to access anything but supported season, the user will be redirected to the latest supported season
    else {
      const newUrl = state.url.replace(route.params.season, <string>this.languageHelper.getLastElement<number>(<number[]>supportedSeasons)?.toString());
      this.router.navigate([newUrl]);
    }
    return false;
  }
}