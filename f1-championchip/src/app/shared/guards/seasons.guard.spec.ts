import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SeasonsGuard } from './seasons.guard';

class RouterStub {
  url: any;

  navigate(url: any) {

  }
}

describe('SeasonsGuard', () => {
  let guard: SeasonsGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
        SeasonsGuard
      ]
    });
    guard = TestBed.inject(SeasonsGuard);
    router = TestBed.inject(Router);

  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should navigate to default season if the urls has invalid one', () => {
    let route = new ActivatedRouteSnapshot();
    route.params = { series: 'f1', season: 1000 };
    spyOn(router, 'navigate');
    let val = guard.canActivate(route, <RouterStateSnapshot>{ url: '/f1/1000' });
    expect(val).toBeFalse;
    expect(router.navigate).toHaveBeenCalledWith(['/f1/2021']);
  });


  it('should allow the urls with valid season', () => {
    let route = new ActivatedRouteSnapshot();
    route.params = { series: 'f1', season: 2010 };
    expect(guard.canActivate(route, undefined)).toBeTrue;
  });
});
