import { TestBed } from '@angular/core/testing';
import { NgxSpinnerService } from 'ngx-spinner';

import { SpinnerService } from './spinner.service';

class SpinnerStub {

}

describe('SpinnerService', () => {
  let service: SpinnerService;
  let spinnerService: SpinnerStub;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SpinnerService,
        { provide: NgxSpinnerService, useClass: SpinnerStub }
      ],
    });
    service = TestBed.inject(SpinnerService);
    spinnerService = TestBed.inject(NgxSpinnerService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
