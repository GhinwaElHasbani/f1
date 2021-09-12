import { of } from 'rxjs';
import { HttpRequestOptions } from '../models/backend/http-request-options.model';
import { HttpBaseClass } from './http.base';

export class MockHttpBaseClass {

  get(method: string, options?: HttpRequestOptions, showLoader?: boolean, host?: string, shouldCacheData?: boolean, forceFetchData?: boolean) {
      of(null);
  }
}

describe('HttpBaseClass', () => {
  it('should create an instance', () => {
    //expect(new HttpBaseClass()).toBeTruthy();
  });
});
