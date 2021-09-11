import { HttpClient } from '@angular/common/http';
import { NgModule, Provider } from '@angular/core';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CachingService } from '../services/caching.service';
import { SectionService } from '../services/section.service';
import { SpinnerService } from '../services/spinner.service';
import { WikiService } from '../services/wiki.service';

// Create translate loaded from the translation folder in assets
// Currently it contains only one file for english
// Added the v=date param to prevent caching on browser, so when chaning it and deploy, will be reflected directly
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/translation/', `.json?v=${new Date().getTime()}`);
}

// Provide all shared services
@NgModule({})
export class ServicesModule {
  static forShared(): Provider[] {
    return [
      SpinnerService,
      CachingService,
      TranslateService,
      <Provider>TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
        }
      }).providers,
      SectionService,
      WikiService
    ];
  }
}
