import { TestBed } from '@angular/core/testing';

import { BadRequestsInterceptor } from './bad-requests.interceptor';

describe('BadRequestsInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BadRequestsInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: BadRequestsInterceptor = TestBed.inject(BadRequestsInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
