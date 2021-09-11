import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { slideInAnimation } from './app.animations';

@Component({
  selector: 'f1-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {
  title = 'f1-championchip';
  // This is the F1 icon to show on loading
  public f1LogoTemplate = "<img src='https://upload.wikimedia.org/wikipedia/commons/3/33/F1.svg' />";

  constructor(
    private translate: TranslateService
  ) {
    // By default the language is set to EN and currently it is the only language supported
    this.translate.setDefaultLang('en');
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

}
