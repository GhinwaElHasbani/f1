import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseClass } from '../shared/bases/http.base';
import { APIS_ENUM } from '../shared/enums';
import { DataTableRequestModel, PageChangeEvent } from '../shared/interfaces';
import { BeObject } from '../shared/interfaces/backend/be-data.interface';

@Injectable()
export class HomeService extends HttpBaseClass {

  constructor(
    public http: HttpClient,
    public injector: Injector
  ) {
    super(http, injector);
  }

  /**
   * Service method to call BE api to get the details per module 
   * The modules can be races, drivers, constructors, circuits...
   * @param series 
   * @param season 
   * @param module 
   * @param paginationObj 
   * @returns the observable for the BE api 
   */
  getModuleList(series: string, season: number, module: string, paginationObj?: DataTableRequestModel): Observable<HttpResponse<BeObject>> {
    let options = undefined;
    if (paginationObj) {
      options = this.setAndGetParams(paginationObj);
    }
    return this.get(`${series}/${season}/${module}`, options);
  }

  /**
   * Get the results per race
   * @param series 
   * @param season 
   * @param round 
   * @returns the observable for the BE api 
   */
  getModuleResults(series: string, season: number, round: number): Observable<HttpResponse<BeObject>> {
    return this.get(`${series}/${season}/${round}/${APIS_ENUM.RESULTS}`, undefined, undefined, undefined, true);
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
