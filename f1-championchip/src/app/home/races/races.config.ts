import { DATA_TABLE_COLUMN_FORMAT } from "src/app/shared/enums";
import { ModuleConfig } from "src/app/shared/interfaces";
import { DataTableColumnDefinition } from "src/app/shared/models/frontend";

export const RACES_MODULES_CONFIG: ModuleConfig =
{
    name: 'races',
    columnDef: [
        new DataTableColumnDefinition('round', 'Round', '10%'),
        new DataTableColumnDefinition('raceName', 'Races Name', '16%'),
        new DataTableColumnDefinition('date', 'Date', '16%', DATA_TABLE_COLUMN_FORMAT.Date),
        new DataTableColumnDefinition('Circuit.circuitName', 'Circuit', '16%'),
        new DataTableColumnDefinition('Circuit.Location.locality', 'Locality', '16%'),
        new DataTableColumnDefinition('Circuit.Location.country', 'Country', '16%'),
        new DataTableColumnDefinition('url', '', '10%', DATA_TABLE_COLUMN_FORMAT.Link, undefined, 'link'),
    ],
    propNameInApi: 'RaceTable.Races'
};