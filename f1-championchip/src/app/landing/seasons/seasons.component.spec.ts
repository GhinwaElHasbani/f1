import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { MockHelperBaseClass } from 'src/app/shared/bases/helper-base.class.spec';
import { HelpersBaseClass } from 'src/app/shared/bases/helpers-base.class';
import { LanguageHelper } from 'src/app/shared/helpers';
import { LangHelperMock } from 'src/app/shared/helpers/lang.helper.spec';
import { LandingService } from '../landing.service';
import { SeasonsComponent } from './seasons.component';


class RouterStub {

}

class ActivatedRouteStub {
  private subject = new Subject();

  push(value) {
    this.subject.next(value);
  }

  get params() {
    return this.subject.asObservable();
  }
}

class LandingStub {

}

class TranslateStub {

}


describe('SeasonsComponent', () => {
  let component: SeasonsComponent;
  let fixture: ComponentFixture<SeasonsComponent>;
  let router: Router;
  let route: ActivatedRoute;
  let landingService: LandingService;
  let translateService: TranslateService;
  let helpersBaseClass: HelpersBaseClass;
  let languageHelper: LanguageHelper;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeasonsComponent],
      imports: [
        TranslateModule.forChild(),
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: Router, useClass: RouterStub },
        { provide: LandingService, useClass: LandingStub },
        { provide: TranslateService, useClass: TranslateStub },
        { provide: HelpersBaseClass, useClass: MockHelperBaseClass },
        { provide: LanguageHelper,useClass: LangHelperMock}
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    landingService = TestBed.inject(LandingService);
    translateService = TestBed.inject(TranslateService);
    helpersBaseClass = TestBed.inject(HelpersBaseClass);
    languageHelper = TestBed.inject(LanguageHelper);
    fixture = TestBed.createComponent(SeasonsComponent);
    component = fixture.componentInstance;
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to route params changes', () => {

    component.ngOnInit();

    expect(component.getRouteParamSubscription).toBeTruthy();
  });

  it('should fill seasonsList on init', () => {
    spyOn(component, 'getSeasonsList');

    component.ngOnInit();

    expect(component.getSeasonsList).toHaveBeenCalled();
    expect(component.seasonsList).not.toBeNull();
  });

  it('should get series and season from route param', () => {
    spyOn(component, 'getSeasonsList');
    spyOn(component, 'fillData');

    let route: any = TestBed.inject(ActivatedRoute);

    component.ngOnInit();
    route.push({ series: 'f1' });

    expect(component.fillData).toHaveBeenCalledWith('f1', component.seasonsList);
  });

  it('should fill seasonsList with years from 2005 till now', () => {

    let list = component.getSeasonsList();

    expect(list.length).toEqual((new Date()).getFullYear() - 2005  + 1);
  });
});
