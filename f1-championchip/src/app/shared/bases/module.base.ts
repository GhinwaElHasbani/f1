import { HttpResponse } from '@angular/common/http';
import { Directive, Injector, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { DataTableColumnDefinition } from 'src/app/shared/models/frontend';
import { SectionService } from 'src/app/shared/services/section.service';
import { BeObject, IModule, ModuleConfig, PageChangeEvent, SectionModel } from '../interfaces';
import { DataTableBaseClass } from './data-table.base';

@Directive()
/** The module base class can be extended by a component that needs to show the list related to the F1 module
* The passed type as RowModel is the model of each row in the set of data
* It extends the data table base class so the data can be mapped into a list that can be displayed in the data table
*/
export class ModuleBaseClass<RowModel> extends DataTableBaseClass<RowModel> implements OnInit, OnDestroy, IModule<RowModel> {

    moduleConfig?: ModuleConfig;
    dataTableColumnsDefinition?: DataTableColumnDefinition[];
    season?: number;
    series?: string;
    rowExpandable: boolean = false;
    moduleTitle: string = '';

    getSubscription?: Subscription;
    getSectionSubscription?: Subscription;

    // The injector to ing==ject the instances to the extended base class
    constructor(protected injector: Injector,
        protected sectionService: SectionService) {
        super(injector);
    }

    ngOnInit(): void {
        // Initialise the title based on the current module
        if(this.moduleConfig){
            this.moduleTitle = `modules.${this.moduleConfig.name}.title`;
        }

        // Initialise the columns definition based on the passed config by this module
        if (this.moduleConfig) {
            this.dataTableColumnsDefinition = this.moduleConfig.columnDef;
        }

        // Get the selected season and series from the service to fill it in current component
        if(this.sectionService && this.sectionService.getSection()){
            this.fillSection(<SectionModel>this.sectionService.getSection());
        }

        // Subscribe to section change to update the section in the current module
        this.subscribeToSectionChange();
    }

    /**
     * Fill the selected section, reset pagination and update the data
     * @param section 
     */
    private fillSection(section: SectionModel) {
        if (section) {
            this.season = section.season;
            this.series = section.series;
            if (this.moduleConfig) {
                this.resetPaginatorPageIndex();
                this.getListing(this.paginatorConfig, true);
            }
        }
    }

    /**
     * When the selected section change the current data should be reset
     */
    private subscribeToSectionChange(): void {
        this.getSectionSubscription = this.sectionService.selectedSection().subscribe(s => {
            if (s && s.season && s.season != this.season) {
                this.fillSection(s);
            }
        });
    }

    /**
     * When clicking on the load more in the table, the next page data will be called from backend
     * @param pageChangeEvent 
     */
    onPage(pageChangeEvent: PageChangeEvent) {
        if (this.isPaginatorEnabled()) {
            this.getListing(pageChangeEvent, false);
        }
    }

    /**
     * The main call api to get the list for the current module
     * In case the module has extended data, the get extra data call is called to fill it in the returned list
     * Then set the data to the table data
     * @param paginationObj 
     * @param start 
     */
    getListing(paginationObj: PageChangeEvent, start: boolean) {
        this.getSubscription = this.getModuleList(paginationObj).subscribe(data => {
            if (data) {
                let row = this.getBody<BeObject>(data);

                if (this.rowExpandable) {
                    this.getExtraData(row).subscribe(res => {
                        if (res) {
                            this.setDataTableData(res.MRData, this.moduleConfig?.propNameInApi, start);
                        }
                    });
                }
                else {
                    this.setDataTableData(this.getBody<BeObject>(data)?.MRData, this.moduleConfig?.propNameInApi, start);
                }
            }
        }, err => {

        });
    }

    /**
     * An implementation for this method is required when the data is extandable
     * if rowExpandable == true
     * It only fills the required rows with extra data mapped to card data model
     * @param data 
     * @returns observable of the same type
     */
    getExtraData(data: BeObject): Observable<BeObject> {
        return of(data);
    }

    /**
     * Required to implement the call to api to get the data list from backend
     * @param paginationObj 
     * @returns 
     */
    getModuleList(paginationObj: PageChangeEvent): Observable<HttpResponse<BeObject>> {
        return of();
    }

    ngOnDestroy() {
        this.unsubscribeAll([this.getSubscription, this.getSectionSubscription]);
    }

}
