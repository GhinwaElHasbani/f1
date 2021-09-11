import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpBaseClass } from '../bases/http.base';

@Injectable()
export class WikiService extends HttpBaseClass {

    constructor(httpClient: HttpClient, injector: Injector) {
        super(httpClient, injector);
    }

    /**
     * 
     * @param obj 
     * @param wikiUrlprop 
     * @returns 
     */
    getImageFromWiki(obj: any, wikiUrlprop: string) {
        const wikiUrl = this.langHelper.getPropValue(obj, wikiUrlprop);
        if (wikiUrl) {
            const nameOnWiki = wikiUrl?.slice(wikiUrl?.lastIndexOf('/') + 1);
            return this.getPhotoFromWiki(nameOnWiki).pipe(map(im => {
                const pageId = Object.keys(im['body'].query.pages);
                return im['body'].query?.pages[pageId[0]]?.thumbnail?.source;
            }, (err: any) => {
                return of(null);
            }));
        }
        else {
            return of(null);
        }
    }

    /**
     * 
     * @param wikiName 
     * @returns 
     */
    private getPhotoFromWiki(wikiName: string): Observable<HttpResponse<any>> {
        return this.get(`api.php?action=query&titles=${wikiName}&prop=pageimages&format=json&pithumbsize=100&origin=*`, undefined, undefined, 'https://en.wikipedia.org/w/', true)
    }

}
