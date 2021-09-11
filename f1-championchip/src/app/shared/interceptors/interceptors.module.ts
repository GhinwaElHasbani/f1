import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Provider } from '@angular/core';
import { BadRequestsInterceptor } from '../interceptors/bad-requests.interceptor';
import { JsonFormatterInterceptor } from '../interceptors/json-formatter.interceptor';
import { SpinnerInterceptor } from '../interceptors/spinner.interceptor';

@NgModule({})
export class InterceptorsModule {
    static forShared(): Provider[] {
        return [
            {
                provide: HTTP_INTERCEPTORS,
                useClass: SpinnerInterceptor,
                multi: true
            },
            {
                provide: HTTP_INTERCEPTORS,
                useClass: BadRequestsInterceptor,
                multi: true
            },
            {
                provide: HTTP_INTERCEPTORS,
                useClass: JsonFormatterInterceptor,
                multi: true
            },
            
        ];
    }
}
