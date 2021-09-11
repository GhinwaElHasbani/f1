import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SectionModel } from '../shared/interfaces';
import { SectionService } from '../shared/services/section.service';
import { homeMenuItems } from './home.config';

@Component({
  selector: 'f1-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit, OnDestroy {

  // The menu items added to config file passed to header component
  public menuItems = homeMenuItems;

  getRouteSubscription?: Subscription;
  currentSection?: SectionModel;

  constructor(
    private route: ActivatedRoute,
    private sectionService: SectionService,
    private router: Router) {
  }

  ngOnInit(): void {
    // get series and season from route param
    this.getRouteSubscription = this.route.params.subscribe(p => {
      if (p) {
        this.updateData(p['series'], Number(p['season']));
      }
    });
  }

  /**
   * Update current section with the selected series and season in the route
   * Then update the menu links with the series and season
   * @param series 
   * @param season 
   */
  updateData(series: string, season: number) {
    if (series && season) {
      this.currentSection = { season: season, series: series };
      if (this.currentSection && this.currentSection.season && this.currentSection.series) {
        this.sectionService.sendSection(this.currentSection);
        this.updateMenuItemsLinks(this.currentSection);
      }
    }
  }

  /**
   * Replace the params in the menu items links with the selected params so it works with router links
   * @param section 
   */
  private updateMenuItemsLinks(section: SectionModel) {
    this.menuItems.forEach(m => {
      m.currentLink = m.link?.replace(':series', <string>section?.series).replace(':season', <string>section?.season?.toString());
    });
  }

  /**
   * When the user changes the selected season from the header
   * The only change in the router will be the season
   * @param season 
   */
  changeSection(season: number) {
    const newUrl = this.router.url.replace(`${this.currentSection?.season}`, <string>season?.toString());
    this.router.navigate([newUrl]);
  }


  ngOnDestroy() {
    if (this.getRouteSubscription) { this.getRouteSubscription.unsubscribe(); }
  }

}
