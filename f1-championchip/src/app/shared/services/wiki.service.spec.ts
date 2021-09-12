import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { CachingService } from "./caching.service";
import { WikiService } from "./wiki.service";

class CachingStub {

}

describe('WikiService', () => {
  let service: WikiService;
  let httpMock: HttpTestingController;
  let cachingService: CachingStub;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: CachingService, useClass: CachingStub },
        WikiService],
    });
    service = TestBed.inject(WikiService);
    httpMock = TestBed.inject(HttpTestingController);
    cachingService = TestBed.inject(CachingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});