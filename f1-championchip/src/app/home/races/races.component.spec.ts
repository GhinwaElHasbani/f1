import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { ModuleBaseClass } from 'src/app/shared/bases/module-base.class';
import { ModuleBaseClassMock } from 'src/app/shared/bases/module-base.class.spec';
import { SectionService } from 'src/app/shared/services/section.service';
import { SectionStub } from 'src/app/shared/services/section.service.spec';
import { HomeService } from '../../home.service';

import { RacesComponent } from './races.component';


class HomeStub {

}

class TranslateStub {

}

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

describe('RacesComponent', () => {
  let component: RacesComponent;
  let fixture: ComponentFixture<RacesComponent>;
  let homeServcie: HomeService;
  let sectionServcie: SectionService;
  let translateService: TranslateService;
  let router: RouterStub;
  let route: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RacesComponent],
      imports: [
        TranslateModule.forChild(),
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: Router, useClass: RouterStub },
        { provide: ModuleBaseClass, useClass: ModuleBaseClassMock },
        { provide: HomeService, useClass: HomeStub },
        { provide: SectionService, useClass: SectionStub },
        { provide: TranslateService, useClass: TranslateStub }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    homeServcie = TestBed.inject(HomeService);
    sectionServcie = TestBed.inject(SectionService);
    translateService = TestBed.inject(TranslateService);
    fixture = TestBed.createComponent(RacesComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
