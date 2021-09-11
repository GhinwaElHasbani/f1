import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES_ENUM } from '../shared/enums';
import { SeasonsGuard } from '../shared/guards/seasons.guard';
import { SeriesGuard } from '../shared/guards/series.guard';
import { CircuitsComponent } from './circuits/circuits.component';
import { ConstructorsComponent } from './constructors/constructors.component';
import { DriversComponent } from './drivers/drivers.component';
import { HomeComponent } from './home.component';
import { RacesComponent } from './races/races.component';

export const routes: Routes = [
  {
    // Passsing the series and season as params in the route  
    // Applies the series and the seasons guard
    path: ':series/:season', component: HomeComponent,
    children: [
      // Races is the default activated menu item
      // Each module has its own route
      { path: '', redirectTo: ROUTES_ENUM.RACES },
      { path: ROUTES_ENUM.RACES, component: RacesComponent },
      { path: ROUTES_ENUM.DRIVERS, component: DriversComponent },
      { path: ROUTES_ENUM.CONSTRUCTORS, component: ConstructorsComponent },
      { path: ROUTES_ENUM.CIRCUITS, component: CircuitsComponent }
    ], canActivate: [SeriesGuard, SeasonsGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
