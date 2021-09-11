import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SectionModel } from '../interfaces';

@Injectable()
export class SectionService {

    private sectionSelected$ = new Subject<SectionModel>();
    private section?: SectionModel;

    constructor() { }

    /**
     * 
     * @param section 
     */
    sendSection(section: SectionModel) {
        this.section = section;
        this.sectionSelected$.next(section);
    }

    /**
     * 
     * @param season 
     */
    sendSeason(season: number) {
        if (!this.section) this.section = {};
        this.section.season = season;
        this.sectionSelected$.next(this.section);
    }

    clearSection() {
        this.section = undefined;
        this.sectionSelected$.next();
    }

    getSection(): SectionModel | undefined {
        return this.section;
    }

    selectedSection(): Observable<SectionModel> {
        return this.sectionSelected$.asObservable();
    }

}