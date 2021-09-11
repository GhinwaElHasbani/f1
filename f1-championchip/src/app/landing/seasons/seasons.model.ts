import { DriverStanding } from "src/app/shared/interfaces";

export class SeasonModel {
    constructor(
        public Season?: number,
        public Url?: number,
        public winner?: DriverStanding
    ) {
    }
}
