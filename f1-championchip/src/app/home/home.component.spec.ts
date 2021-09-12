import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SectionService } from '../shared/services/section.service';
import { HomeComponent } from './home.component';
import { SectionStub } from 'src/app/shared/services/section.service.spec';


class ActivatedRouteStub {
  private subject = new Subject();

  push(value: any) {
    this.subject.next(value);
  }

  get params() {
    return this.subject.asObservable();
  }
}

class RouterStub {
  url: any;

  navigate(url: any) {

  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;
  let sectionService: SectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: Router, useClass: RouterStub },
        { provide: SectionService, useClass: SectionStub },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    router = TestBed.inject(Router);
    sectionService = TestBed.inject(SectionService);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to route params changes', () => {

    fixture.detectChanges();

    expect(component.getRouteSubscription).toBeTruthy();
  });

  it('should get series and season from route param', () => {
    spyOn(component, 'updateData');
    let route: any = TestBed.inject(ActivatedRoute);

    fixture.detectChanges();
    route.push({ series: 'f1', season: '2021' });

    expect(component.updateData).toHaveBeenCalled();
  });

  it('should have a header', () => {
    const compiled = fixture.debugElement.nativeElement;
    let h = compiled.querySelector('f1-menu-header');
    expect(h).not.toBeNull();

  });

  it('should have a header with a menu', () => {
    const debugEls = fixture.debugElement.queryAll(By.css('f1-menu-header'));

    expect(debugEls[0].properties['withMenu']).toBeTrue;
  });
});