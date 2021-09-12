import {
  HttpEvent, HttpHandler, HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class JsonFormatterInterceptor implements HttpInterceptor {

    constructor(
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
