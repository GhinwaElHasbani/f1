import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { LandingService } from './landing.service';
import { SeasonsComponent } from './seasons/seasons.component';


@NgModule({
  declarations: [
    LandingComponent,
    // Created Seasons as a component, it could be called by route or even by component as a child
    SeasonsComponent
  ],

  // All the required import or providers are exported from Shared Module
  imports: [
    SharedModule,
    LandingRoutingModule
  ],
  providers: [LandingService]
})

export class LandingModule { }
