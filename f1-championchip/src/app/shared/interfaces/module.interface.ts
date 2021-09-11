import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { BeObject } from "./backend/be-data.interface";
import { ModuleConfig } from "./frontend/modules.interface";
import { PageChangeEvent } from "./backend/page-change-event.interface";
import { IDataTable } from "./data-table.interface";

export interface IModule<T> extends IDataTable<T> {

    // The module config can be used to get configurations for the current module
    // It is required to define it in the component
    moduleConfig?: ModuleConfig;

    // Required values to show f1 modules
    season?: number;
    series?: string;

    // Some modules has specific extra data to display, It can be displayed in the expanded row
    // Based on this flag the code for expanded row is called, and dispalyed
    rowExpandable: boolean;

    // This is the title of this module to be displayed
    moduleTitle: string;

    /**
        * The main call api to get the list for the current module
        * @param paginationObj 
        * @param start 
        */
    getListing: (paginationObj: PageChangeEvent, start: boolean) => void;

    /**
     * required if rowExpandable == true
     * Called when getting data to fill the records with extra data
     * @param data 
     * @returns observable of the same type
     */
    getExtraData?: (data: BeObject) => Observable<BeObject>;

    /**
     * The call to api to get the data list from backend
     * @param paginationObj 
     * @returns 
     */
    getModuleList: (paginationObj: PageChangeEvent) => Observable<HttpResponse<BeObject>>
}