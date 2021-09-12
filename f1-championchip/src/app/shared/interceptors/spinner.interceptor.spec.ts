import { TestBed } from '@angular/core/testing';
import { SpinnerService } from '../services/spinner.service';

import { SpinnerInterceptor } from './spinner.interceptor';

class SpinnerStub {

}

describe('SpinnerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: SpinnerService, useClass: SpinnerStub },
      SpinnerInterceptor
    ]
  }));

  it('should be created', () => {
    const interceptor: SpinnerInterceptor = TestBed.inject(SpinnerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
