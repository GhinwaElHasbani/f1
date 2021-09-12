import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { ModuleBaseClass } from 'src/app/shared/bases/module.base';
import { SectionService } from 'src/app/shared/services/section.service';
import { SectionStub } from 'src/app/shared/services/section.service.spec';
import { HomeService } from '../home.service';
import { CircuitsComponent } from './circuits.component';

export class ModuleBaseClassMock<T>{
  constructor() {

  }
}

class HomeStub {

}

class TranslateStub {

}

class RouterStub {

}

class ActivatedRouteStub {
  private subject = new Subject();

  push(value: any) {
    this.subject.next(value);
  }

  get params() {
    return this.subject.asObservable();
  }
}

describe('CircuitsComponent', () => {
  let component: CircuitsComponent;
  let fixture: ComponentFixture<CircuitsComponent>;
  let homeServcie: HomeService;
  let sectionServcie: SectionService;
  let translateService: TranslateService;
  let router: RouterStub;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CircuitsComponent],
      imports: [
        RouterTestingModule,
        TranslateModule.forChild()
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
      .compileComponents();
  });

  beforeEach(() => {
    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    homeServcie = TestBed.inject(HomeService);
    sectionServcie = TestBed.inject(SectionService);
    translateService = TestBed.inject(TranslateService);
    fixture = TestBed.createComponent(CircuitsComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
