import { DataTableColumnDefinition } from "../../models/frontend/data-table-column-definition.model";

export interface ModuleConfig {
    // name of the table, used for the api route, and for the title label key
    name: string,
    // column definitions for the table of races
    columnDef: DataTableColumnDefinition[],
    // The property name in the returned object from backend to access the desired list
    propNameInApi: string
}
