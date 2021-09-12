import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpBaseClass } from '../shared/bases/http.base';
import { MockHttpBaseClass } from '../shared/bases/http.base.spec';
import { APIS_ENUM } from '../shared/enums';
import { CachingService } from '../shared/services/caching.service';
import { LandingService } from './landing.service';

class CachingStub {

}

describe('LandingService', () => {
  let service: LandingService;
  let httpMock: HttpTestingController;
  let cachingService: CachingStub;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HttpBaseClass, useClass: MockHttpBaseClass },
        { provide: CachingService, useClass: CachingStub },
        LandingService],
    });
    service = TestBed.inject(LandingService);
    httpMock = TestBed.inject(HttpTestingController);
    cachingService = TestBed.inject(CachingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the get api when getSeasonWinner is triggered', () => {
    spyOn(service, 'get');

    service.getSeasonWinner('f1', 2021);

    expect(service.get).toHaveBeenCalledWith(`f1/2021/${APIS_ENUM.CHAMPION}`, undefined, undefined, undefined, true);
  });

});
