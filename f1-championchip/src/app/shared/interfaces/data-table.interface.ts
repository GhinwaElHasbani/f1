import { CustomDataTableComponent } from "../components/custom-data-table/custom-data-table.component";
import { MRData } from "./backend/be-data.interface";
import { DataTable, DataTableColumnDefinition, PaginatorConfig } from "../models/frontend";
import { DataTableRequestModel } from "./frontend/data-table-request.inteface";
import { PageChangeEvent } from "./backend/page-change-event.interface";

export interface IDataTable<T> {

    dataTableComponent?: CustomDataTableComponent;

    dataTableData?: DataTable<T>;

    // The columns definition helps define configuration using the set of data to show as columns in the table
    dataTableColumnsDefinition?: DataTableColumnDefinition[];

    rowClickable: boolean;

    paginatorConfig: PaginatorConfig;

    /** 
    * Called when clicking on the load more in the table to get new page data
    * @param pageChangeEvent 
    */
    onPage: (pageChangeEvent: PageChangeEvent) => void;

    /**
    * Fills the data recived from API to the data table dataTableData
    * @param response 
    * @param property 
    * @param withReset 
    */
    setDataTableData: (response: MRData, property: string, withReset: boolean) => void;

    /**
   * Called to get the current params to get data list
   * @param paginationObj 
   * @returns 
   */
    getPaginationParam: (paginationObj?: PageChangeEvent) => DataTableRequestModel | undefined;

    resetDataTable: () => void;
    resetPaginatorPageIndex: () => void;
}