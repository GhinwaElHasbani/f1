import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SeriesGuard } from './series.guard';

class RouterStub {
  url: any;

  navigate(url: any) {

  }
}

describe('SeriesGuard', () => {
  let guard: SeriesGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
        SeriesGuard
      ]
    });
    guard = TestBed.inject(SeriesGuard);
    router = TestBed.inject(Router);

  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should navigate to default series if the urls has invalid one', () => {
    let route = new ActivatedRouteSnapshot();
    route.params = { series: 'f2', season: 2021 };
    expect(guard.canActivate(route, undefined)).toBeFalse;
  });

  
  it('should allow the urls with valid series', () => {
    let route = new ActivatedRouteSnapshot();
    route.params = { series: 'f1', season: 2021 };
    expect(guard.canActivate(route, undefined)).toBeTrue;
  });
});
