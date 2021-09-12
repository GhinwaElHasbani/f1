import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SeasonsGuard } from './seasons.guard';

class RouterStub {

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
});
