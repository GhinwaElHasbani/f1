import { HttpResponse } from '@angular/common/http';
import { Directive } from '@angular/core';
import { Subscription } from 'rxjs';
import { FrameworkHelper, LanguageHelper } from '../helpers';
import { PropVal } from '../interfaces';

@Directive()
export class HelpersBaseClass {
    languageHelper = LanguageHelper;
    frameworkHelper = FrameworkHelper;

    // get body from api response
    getBody<BodyModel>(res: HttpResponse<BodyModel>) {
        return this.frameworkHelper.getBody<BodyModel>(res);
    }

    getPropValue<T = any>(obj: PropVal, dotSeparatedProps: string): T {
        return this.languageHelper.getPropValue(obj, dotSeparatedProps);
    }

    isDefined(entity: any) {
        return this.languageHelper.isDefined(entity);
    }

    isNotDefined(entity: any) {
        return this.languageHelper.isNotDefined(entity);
    }

    arrayCount(array: any[]) {
        return this.languageHelper.arrayCount(array);
    }

    unsubscribeAll(subscriptions: (Subscription | undefined)[]) {
        this.frameworkHelper.unsubscribeAll(subscriptions);
    }
}
