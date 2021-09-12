import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { HttpBaseClass } from "../shared/bases/http.base";
import { MockHttpBaseClass } from "../shared/bases/http.base.spec";
import { APIS_ENUM } from "../shared/enums";
import { CachingService } from "../shared/services/caching.service";
import { HomeService } from "./home.service";

class CachingStub {

}

describe('HomeService', () => {
  let service: HomeService;
  let httpMock: HttpTestingController;
  let cachingService: CachingStub;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HttpBaseClass, useClass: MockHttpBaseClass },
        { provide: CachingService, useClass: CachingStub },
        HomeService],
    });
    service = TestBed.inject(HomeService);
    httpMock = TestBed.inject(HttpTestingController);
    cachingService = TestBed.inject(CachingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the get api when getModuleList is triggered', () => {
    spyOn(service, 'get');

    service.getModuleList('f1', 2021, 'races', { offset: 0, limit: 10 });

    expect(service.get).toHaveBeenCalledWith(`f1/2021/races`, { params: { offset: 0, limit: 10 } });
  });

  it('should call the get api when getModuleResults is triggered', () => {
    spyOn(service, 'get');

    service.getModuleResults('f1', 2021, 1);

    expect(service.get).toHaveBeenCalledWith(`f1/2021/1/${APIS_ENUM.RESULTS}`, undefined, undefined, undefined, true);
  });


  it('should call the get api when getSeasonWinner is triggered', () => {
    spyOn(service, 'get');

    service.getSeasonWinner('f1', 2021);

    expect(service.get).toHaveBeenCalledWith(`f1/2021/${APIS_ENUM.CHAMPION}`, undefined, undefined, undefined, true);
  });

});
