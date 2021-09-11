import { Directive, Injector, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomDataTableComponent } from '../components/custom-data-table/custom-data-table.component';
import { defaultPaginatorConfig } from '../configs';
import { MRData } from '../interfaces/backend/be-data.interface';
import { PageChangeEvent } from '../interfaces/backend/page-change-event.interface';
import { IDataTable } from '../interfaces/data-table.interface';
import { DataTableRequestModel } from '../interfaces/frontend/data-table-request.inteface';
import { DataTable, DataTableColumnDefinition } from '../models/frontend';
import { HelpersBaseClass } from './helper.base';

@Directive()
export class DataTableBaseClass<RowModel> extends HelpersBaseClass implements IDataTable<RowModel> {
    @ViewChild(CustomDataTableComponent) dataTableComponent?: CustomDataTableComponent;
    dataTableData?: DataTable<RowModel>;
    dataTableColumnsDefinition?: DataTableColumnDefinition[];
    rowClickable = false;
    route: ActivatedRoute;
    router: Router;
    paginatorConfig = defaultPaginatorConfig;

    constructor(protected injector: Injector) {
        super();
        this.router = this.injector.get(Router);
        this.route = this.injector.get(ActivatedRoute);
    }

    onPage(pageChangeEvent: PageChangeEvent) { }

    /**
     * It fills the dataTableData with the visible rows and the total number
     * @param response 
     * @param property 
     * @param withReset 
     */
    setDataTableData(response: MRData, property?: string, withReset = true) {
        let dataTableData = new DataTable<any>();
        const rows = this.isNotDefined(property) ? (response || []) : (this.getPropValue(response, <string>property) || []);

        // If the get api is called on the page init or update, the data should be reset to the recieved rows
        if (withReset) {
            dataTableData.currentlyVisibleRows = rows;
        }
        // If it is a next page call, the data should be appended
        else {
            dataTableData = <DataTable<any>>this.dataTableData;
            dataTableData.currentlyVisibleRows = dataTableData.currentlyVisibleRows?.concat(rows);
        }

        // Set the total number of rows received from backend on any call
        dataTableData.totalNumberOfVisibleRows = response.total;

        // Change the reference of the data variable so it triggers the change
        this.dataTableData = this.languageHelper.objectAssign([dataTableData]);
    }

    /**
     * @param paginationObj 
     * @returns current params to get data list accordingly
     */
    getPaginationParam(paginationObj?: PageChangeEvent): DataTableRequestModel | undefined {
        let pagParam: DataTableRequestModel | undefined;
        if (paginationObj && this.isPaginatorEnabled()) {
            // The offset 
            pagParam = {
                offset: paginationObj.offset * paginationObj.limit,
                limit: paginationObj.limit

            }
        }
        return pagParam;
    }

    isDataTableComponentDefined() {
        return this.isDefined(this.dataTableComponent);
    }

    isDataTableDefined(dataTableComponent?: CustomDataTableComponent) {
        return this.isDefined(dataTableComponent);
    }

    clearDataTableData() {
        this.dataTableData = undefined;
    }

    resetDataTable() {
        if (this.isDataTableComponentDefined()) {
            this.clearDataTableData();
            this.dataTableComponent?.resetDataTable();
        }
    }

    isPaginatorEnabled() { return this.paginatorConfig.enabled; }

    /**
     * Called to reset the pagination params to default
     */
    resetPaginatorPageIndex(): void {
        if (
            this.isDataTableDefined(this.dataTableComponent) &&
            this.isPaginatorEnabled()
        ) {
            this.dataTableComponent?.resetPaginator();
        }
    }
}
