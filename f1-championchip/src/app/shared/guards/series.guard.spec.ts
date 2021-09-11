import { TestBed } from '@angular/core/testing';

import { SeriesGuard } from './series.guard';

describe('SeriesGuard', () => {
  let guard: SeriesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SeriesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
