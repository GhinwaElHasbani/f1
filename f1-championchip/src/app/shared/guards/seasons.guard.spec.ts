import { TestBed } from '@angular/core/testing';

import { SeasonsGuard } from './seasons.guard';

describe('SeasonsGuard', () => {
  let guard: SeasonsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SeasonsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
