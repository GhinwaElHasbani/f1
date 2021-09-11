import { DATA_TABLE_COLUMN_FORMAT } from "../../enums";

export class DataTableColumnDefinition {
    constructor(
        /** The propety name on the item list, 
         * it can be dot seperated to access nested value
         * it can includes + icon to concatinate 2 properties values */
        public property: string,

        // Label name of the column to show in the header
        public label: string,

        // The width percentage of the column in the table
        public width = '10%',

        // Formats are added in case of customization in the table component
        // for example the Link should be clickable
        public format?: DATA_TABLE_COLUMN_FORMAT,

        // list of strings to add as class to the selected column cells in case it needs styling customization
        public customClasses?: string[],

        // In case of a link, this is the mat icon name to show as clickable to navigate to the link
        public icon?: string,

        // Indicate if this column is to be displayed or hidden, by default all are shown
        public visible = true
    ) { }
}
