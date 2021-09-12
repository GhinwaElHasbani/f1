import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BadRequestsInterceptor } from './bad-requests.interceptor';

class MatSnackBarStub {

}

describe('BadRequestsInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: MatSnackBar, useClass: MatSnackBarStub },
      BadRequestsInterceptor
    ]
  }));

  it('should be created', () => {
    const interceptor: BadRequestsInterceptor = TestBed.inject(BadRequestsInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
