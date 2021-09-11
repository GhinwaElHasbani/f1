import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { HomeService } from './home.service';
import { HomeRoutingModule } from './home-routing.module';
import { RacesComponent } from './races/races.component';
import { DriversComponent } from './drivers/drivers.component';
import { ConstructorsComponent } from './constructors/constructors.component';
import { CircuitsComponent } from './circuits/circuits.component';


@NgModule({
  declarations: [
    HomeComponent,
    // Each mobule in F1 has its own component that can be customized later on
    RacesComponent,
    DriversComponent,
    ConstructorsComponent,
    CircuitsComponent
  ],
  imports: [
    SharedModule,
    HomeRoutingModule
  ],
  providers: [HomeService]
})

export class HomeModule { }
