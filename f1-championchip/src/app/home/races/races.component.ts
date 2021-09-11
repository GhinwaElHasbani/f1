import { HttpResponse, HttpSentEvent } from '@angular/common/http';
import { Component, Injector, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModuleBaseClass } from 'src/app/shared/bases/module.base';
import { CustomCardModel } from 'src/app/shared/components/custom-card/custom-card.model';
import { BeObject, PageChangeEvent, Race, RaceTable, Result, StandingsList } from 'src/app/shared/interfaces';
import { PaginatorConfig } from 'src/app/shared/models/frontend';
import { SectionService } from 'src/app/shared/services/section.service';
import { HomeService } from '../home.service';
import { RACES_MODULES_CONFIG } from './races.config';

@Component({
  selector: 'f1-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.sass']
})

//extending the module base class so it can run the common functionality between modules
export class RacesComponent extends ModuleBaseClass<Race> implements OnInit {

  rowExpandable = true;
  moduleConfig = RACES_MODULES_CONFIG;

  constructor(
    injector: Injector,
    private _modulesService: HomeService,
    protected sectionService: SectionService,
    private translateService: TranslateService
  ) {
    super(injector, sectionService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  /**
   * Call an api to get the list of races
   * Used the same in all modules
   * Can be added to base class but don't need to complicate things, so it can be easily customized
   * @param paginationObj 
   * @returns Observable for the api call
   */
  getModuleList(paginationObj: PageChangeEvent): Observable<HttpResponse<BeObject>> {
    return this._modulesService.getModuleList(<string>this.series, <number>this.season, this.moduleConfig.name, this.getPaginationParam(paginationObj));
  }

  /**
   * The implmentation of getExtraData here is calling 2 apis 
   * Get the list of teams per race as a fork join
   * Get the championchip for the current season
   * Then loop the list of races and fill in the extra data 
   * @param data 
   * @returns 
   */
  getExtraData(data: BeObject): Observable<BeObject> {
    if (data?.MRData?.RaceTable?.Races) {
      let getResultsObservables = this.mapRacesToGetObservable(data.MRData.RaceTable.Races);
      let getChampionObservables = this._modulesService.getSeasonWinner(<string>this.series, <number>this.season);
      return (forkJoin([forkJoin(getResultsObservables), getChampionObservables])).pipe(map((res: any) => {
        let resutls: HttpResponse<BeObject>[] = res[0];
        let winner: HttpResponse<BeObject> = res[1];
        let winnerTeam: StandingsList | undefined = {};
        if (this.getBody(winner).MRData.StandingsTable?.StandingsLists[0]) {
          winnerTeam = this.getBody(winner).MRData.StandingsTable?.StandingsLists[0];
        }
        (<RaceTable>data.MRData.RaceTable).Races = this.fillExtraData(<Race[]>data.MRData.RaceTable?.Races, resutls, winnerTeam);
        return data;
      }));
    }
    else return of(data);
  }

  /**
   * Fill the extra data into the list of races 
   * By mapping it into card data model so it can be displayed as list of cards
   * and the highlighted row based on the winning team
   * @param racesList 
   * @param racesTeamObj 
   * @param winnerTeam 
   * @returns 
   */
  private fillExtraData(racesList: Race[], racesTeamObj: HttpResponse<BeObject>[], winnerTeam?: StandingsList): Race[] {
    let list = racesList;
    list.forEach((c, i) => {
      if (this.getBody(racesTeamObj[i]).MRData.RaceTable?.Races[0]?.Results) {
        c.resultsList = this.mapToCard(<Result[]>this.getBody(racesTeamObj[i]).MRData.RaceTable?.Races[0].Results);

        if (winnerTeam?.DriverStandings && winnerTeam?.DriverStandings.length > 0) {
          let pos1 = this.getBody(racesTeamObj[i]).MRData.RaceTable?.Races[0].Results.find(r => r.position == 1);
          c.isHighlighted = pos1?.Driver?.driverId == winnerTeam.DriverStandings[0].Driver?.driverId;
        }
      }
    });
    return list;
  }

  /**
   * Return the list of apis observable for the list of races rounds
   * @param list 
   * @returns 
   */
  private mapRacesToGetObservable(list: Race[]): Observable<HttpResponse<BeObject>>[] {
    return list.map(m => {
      return this._modulesService.getModuleResults(<string>this.series, <number>this.season, Number(m.round));
    });
  }

  /**
  * It maps the list of teams object from BE to card data to show on cards under each race
  * @param resutlList 
  */
  mapToCard(resutlList: Result[]): CustomCardModel[] {
    return resutlList?.map(r => {
      return new CustomCardModel(
        Number(r.position),
        `${this.translateService.instant('modules.races.position')} ${r.position}`,
        `${this.translateService.instant('modules.races.number')} ${r.number}`,
        `${r.Driver.givenName} ${r.Driver.familyName}`,
        r.Constructor.name,
        r.Driver.url
      );
    });
  }
}
