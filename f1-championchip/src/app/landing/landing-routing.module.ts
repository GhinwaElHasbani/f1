import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_SERIES } from '../shared/constants';
import { SeriesGuard } from '../shared/guards/series.guard';
import { LandingComponent } from './landing.component';
import { SeasonsComponent } from './seasons/seasons.component';

export const routes: Routes = [
  {
    path: '', component: LandingComponent,
    children: [
      // By default accessing the landing should redirect to first element in supported series
      { path: '', redirectTo: APP_SERIES[0] },

      // Added series as a param not static route, in case this will be used for other series or even other type of sports
      // Added the series guard to prevent opening screens for data not handled yet
      { path: ':series', component: SeasonsComponent, canActivate: [SeriesGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
