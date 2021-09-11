import { DATA_TABLE_COLUMN_FORMAT } from "src/app/shared/enums";
import { ModuleConfig } from "src/app/shared/interfaces";
import { DataTableColumnDefinition } from "src/app/shared/models/frontend";

export const DRIVERS_MODULES_CONFIG: ModuleConfig =
{
    name: 'drivers',
    columnDef: [
        new DataTableColumnDefinition('givenName+familyName', 'Name', '29%', DATA_TABLE_COLUMN_FORMAT.Combination),
        new DataTableColumnDefinition('nationality', 'Nationality', '19%'),
        new DataTableColumnDefinition('dateOfBirth', 'DateOfBirth', '19%', DATA_TABLE_COLUMN_FORMAT.Date),
        new DataTableColumnDefinition('permanentNumber', 'Permanent Number', '14%'),
        new DataTableColumnDefinition('code', 'Code', '14%'),
        new DataTableColumnDefinition('url', '', '5%', DATA_TABLE_COLUMN_FORMAT.Link, undefined, 'link'),
    ],
    propNameInApi: 'DriverTable.Drivers'
};