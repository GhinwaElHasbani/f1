import {
  HttpEvent, HttpHandler, HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SpinnerService } from '../services/spinner.service';

@Injectable()
export class JsonFormatterInterceptor implements HttpInterceptor {

    constructor(
        public spinnerService: SpinnerService,
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(request.url.includes(environment.baseUrl)){

            request = request.clone({
                url: `${request.url}.json`
            });
        }

        return next.handle(request).pipe(tap(
            event => { },
            error => { }
        ));
    }

}
