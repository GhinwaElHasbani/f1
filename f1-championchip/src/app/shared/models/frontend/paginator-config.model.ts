export class PaginatorConfig {
    constructor(
        public enabled = true,
        public offset = 0,
        public limit = 10,
        public length = 0,
        public displayLoadMore = false,
    ) { }
}
