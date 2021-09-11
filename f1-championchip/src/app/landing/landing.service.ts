import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseClass } from '../shared/bases/http.base';
import { APIS_ENUM } from '../shared/enums';
import { BeObject } from '../shared/interfaces/backend/be-data.interface';

@Injectable()
export class LandingService extends HttpBaseClass {

  constructor(
    public http: HttpClient,
    public injector: Injector
  ) {
    super(http, injector);
  }

  /**
    * An observable that called the backend api to get the champion for the requested series and season
    * @param currentSeries 
    * @param season 
    * @returns Observable with BeObjects that contains the list of StandingsLists
    */
   getSeasonWinner(currentSeries: string, season: number): Observable<HttpResponse<BeObject>> {
    return this.get(`${currentSeries}/${season}/${APIS_ENUM.CHAMPION}`, undefined, undefined, undefined, true);
  }

}
