import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { LanguageHelper } from './lang.helper';

export class FrameworkHelper extends LanguageHelper {

    static getBody<BodyModel>(response: HttpResponse<BodyModel>): BodyModel {
        return this.getPropValueIfObjIsDefined(response, 'body');
    }

    static getHeaders(response: HttpResponse<any>): HttpHeaders {
        return this.getPropValueIfObjIsDefined(response, 'headers');
    }

    static getFromBody(response: HttpResponse<any>, prop: string) {
        return this.getPropValueIfObjIsDefined(this.getBody(response), prop);
    }

    static getFromHeader(response: HttpResponse<any>, prop: string) {
        return this.getHeaders(response).get(prop);
    }

 
    static unsubscribe(subscription: Subscription) {
        if (this.isDefined(subscription)) {
            subscription.unsubscribe();
        }
    }

    static unsubscribeAll(subscriptions: (Subscription | undefined)[]) {
        if (this.isDefined(subscriptions)) {
            subscriptions.forEach(
                subscription => {
                    if (subscription)
                        this.unsubscribe(subscription)
                }
            );
        }
    }
}
