import { TestBed } from '@angular/core/testing';

import { JsonFormatterInterceptor } from './json-formatter.interceptor';

describe('JsonFormatterInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      JsonFormatterInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: JsonFormatterInterceptor = TestBed.inject(JsonFormatterInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
