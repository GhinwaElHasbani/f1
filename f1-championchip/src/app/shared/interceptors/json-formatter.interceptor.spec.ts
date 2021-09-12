import { HttpClient, HttpEvent, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { JsonFormatterInterceptor } from './json-formatter.interceptor';

describe('JsonFormatterInterceptor', () => {
  let interceptor: JsonFormatterInterceptor;
  let client: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        JsonFormatterInterceptor
      ]
    })
    client = TestBed.inject(HttpClient);
    interceptor = TestBed.inject(JsonFormatterInterceptor);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });


  it('should append json to the request', () => {
    let request: HttpRequest<any> = new HttpRequest('GET', 'http://ergast.com/api');
    let next: HttpHandler = { handle: jasmine.createSpy('handle').and.callFake((l) => of(l)) };
    let res: any = interceptor.intercept(request, next);
    res.subscribe(s => {
      expect(s.url).toEqual(`http://ergast.com/api.json`);
    })
  });
});
