import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { HelpersBaseClass } from 'src/app/shared/bases/helper.base';
import { CustomCardModel } from 'src/app/shared/components/custom-card/custom-card.model';
import { APP_SEASONS_START } from 'src/app/shared/constants';
import { ROUTES_ENUM } from 'src/app/shared/enums';
import { BeObject } from 'src/app/shared/interfaces';
import { LandingService } from '../landing.service';
import { SeasonModel } from './seasons.model';

@Component({
  selector: 'f1-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.sass']
})
export class SeasonsComponent extends HelpersBaseClass implements OnInit, OnDestroy {

  public seasonsList: SeasonModel[] = [];
  currentSeries: any;

  getSubscription?: Subscription;

  cardData?: CustomCardModel[];
  getRouteParamSubscription?: Subscription;

  constructor(
    private _landingService: LandingService,
    private router: Router,
    private route: ActivatedRoute,
    private translateService: TranslateService) {
    super();
  }

  /**
   * initialise the list of seasons
   * initialise the the selected series getting it from route param
   * fill the list of seasons with data
   */
  ngOnInit(): void {
    this.seasonsList = this.getSeasonsList();
    this.getRouteParamSubscription = this.route.params.subscribe(p => {
      this.currentSeries = p['series'];
      this.fillData(this.currentSeries, this.seasonsList);
    })
  }

  /**
   * list on year from 2015 till now, because the api itself doesn't take from to params
   * The list is sorted descending and mapped to a season model
   * @returns list of seasons
   */
  getSeasonsList(): SeasonModel[] {
    const thisYear = (new Date()).getFullYear();
    const years = this.languageHelper.generateListFromTo(APP_SEASONS_START, thisYear);
    const sortedList = years?.sort((a, b) => b - a);
    const seasonsList: SeasonModel[] = <SeasonModel[]>sortedList?.map(m => { return new SeasonModel(m) });
    return seasonsList;
  };


  /**
   * Get the winners by season and call the map to card for the filled data
   * @param currentSeries 
   * @param seasonsList 
   */
  fillData(currentSeries: string, seasonsList: SeasonModel[]) {
    if (currentSeries && seasonsList && seasonsList.length > 0) {
      this.getSubscription = this.getWinnersBySeason(currentSeries, seasonsList).subscribe(res => {
        if (res) {
          res.forEach((w, i) => {
            if (this.getBody(w)?.MRData?.StandingsTable?.StandingsLists &&
              this.getBody(w)?.MRData?.StandingsTable?.StandingsLists[0]?.DriverStandings) {
              // The winner team is returned from backend in the list of DriverStandings
              let winners = this.getBody(w)?.MRData?.StandingsTable?.StandingsLists[0].DriverStandings;
              if (winners && winners.length > 0) {
                this.seasonsList[i].winner = (<any[]>winners)[0];
              }
            }
          });
          this.mapToCard(this.seasonsList);
        }
      });
    }
  }

  /**
   * Map the list of seasons into list of observables to call winner api from backend for each season
   * @param currentSeries 
   * @param seasonsList 
   * @returns Observable for the list of apis fork joined
   */
  getWinnersBySeason(currentSeries: string, seasonsList: SeasonModel[]): Observable<HttpResponse<BeObject>[]> {
    let obsGetResults = seasonsList.map(m => { return this._landingService.getSeasonWinner(currentSeries, <number>m.Season) });
    return forkJoin(obsGetResults);
  }

  /**
   * It maps the list of seasons with winner object from BE to card data to show on cards
   * @param list 
   */
  mapToCard(list: SeasonModel[]) {
    this.cardData = list?.map(s => {
      return new CustomCardModel(
        <number>s.Season,
        `${s.Season}`,
        this.translateService.instant('modules.seasons.top_1'),
        `${s.winner?.Driver?.givenName} ${s.winner?.Driver?.familyName}`,
        s.winner?.Constructors[0].name,
        s.winner?.Driver?.url
      );
    });
  }

  /**
   * Navigate user to details of the selected season
   * @param season 
   */
  goToDetails(season: number) {
    this.router.navigate([`${ROUTES_ENUM.HOME}/${this.currentSeries}/${season}`]);
  }

  ngOnDestroy() {
    this.unsubscribeAll([this.getSubscription, this.getRouteParamSubscription]);
  }

}
