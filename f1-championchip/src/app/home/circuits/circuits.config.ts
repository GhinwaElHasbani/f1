import { DATA_TABLE_COLUMN_FORMAT } from "src/app/shared/enums";
import { ModuleConfig } from "src/app/shared/interfaces";
import { DataTableColumnDefinition } from "src/app/shared/models/frontend";


export const CIRCUITS_MODULES_CONFIG: ModuleConfig = 
    {
        name: 'circuits',
        columnDef: [
            new DataTableColumnDefinition('circuitName', 'Name', '80%'),
            new DataTableColumnDefinition('url', '', '20%', DATA_TABLE_COLUMN_FORMAT.Link, undefined, 'link'),
        ],
        propNameInApi: 'CircuitTable.Circuits'
    }