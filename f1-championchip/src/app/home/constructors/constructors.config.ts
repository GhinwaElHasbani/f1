import { DATA_TABLE_COLUMN_FORMAT } from "src/app/shared/enums";
import { ModuleConfig } from "src/app/shared/interfaces";
import { DataTableColumnDefinition } from "src/app/shared/models/frontend";


export const CONSTRUCTORS_MODULES_CONFIG: ModuleConfig =
{
    name: 'constructors',
    columnDef: [
        new DataTableColumnDefinition('name', 'Name', '40%'),
        new DataTableColumnDefinition('nationality', 'Nationality', '40%'),
        new DataTableColumnDefinition('url', '', '20%', DATA_TABLE_COLUMN_FORMAT.Link, undefined, 'link'),
    ],
    propNameInApi: 'ConstructorTable.Constructors'
};