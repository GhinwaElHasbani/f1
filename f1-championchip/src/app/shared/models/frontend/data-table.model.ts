export class DataTable<T> {
    constructor(
        public currentlyVisibleRows?: T[],
        public totalNumberOfVisibleRows?: number,
    ) { }
}