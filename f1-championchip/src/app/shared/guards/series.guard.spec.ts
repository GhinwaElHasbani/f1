import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SeriesGuard } from './series.guard';

class RouterStub {

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
});
