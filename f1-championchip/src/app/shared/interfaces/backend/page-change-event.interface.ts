export interface PageChangeEvent {
    // Offset is the index where to start the rows that needs to be returned
    offset: number;

    // Limit is the number of rows in the current page or list
    limit: number;
}
