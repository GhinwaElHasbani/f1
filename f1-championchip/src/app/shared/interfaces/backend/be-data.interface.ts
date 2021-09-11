
export interface Location {
    lat: string;
    long: string;
    locality: string;
    country: string;
}

export interface Circuit {
    circuitId: string;
    url: string;
    circuitName: string;
    Location: Location;
}

export interface Driver {
    driverId: string;
    permanentNumber: string;
    code: string;
    url: string;
    givenName: string;
    familyName: string;
    dateOfBirth: string;
    nationality: string;
    image: string;
}

export interface Constructor {
    constructorId: string;
    url: string;
    name: string;
    nationality: string;
}

export interface QualifyingResult {
    number: string;
    position: string;
    Driver: Driver;
    Constructor: Constructor;
    Q1: string;
    Q2: string;
    Q3: string;
}

export interface Result {
    status: string;
    positionText: string;
    position: number;
    points: string;
    number: string;
    laps: string;
    grid: string;
    Time: any;
    FastestLap: any;
    Driver: Driver;
    Constructor: Constructor;
}

export interface Race {
    season: number;
    round: number;
    url: string;
    raceName: string;
    Circuit: Circuit;
    date: string;
    time: string;
    QualifyingResults: QualifyingResult[];
    Results: Result[];
    Locality: any;
    Country: any;
    Information: any;
    // FE prop used
    isHighlighted?: boolean;
    resultsList?: any[];
}

export interface RaceTable {
    season: string;
    round: string;
    position: string;
    Races: Race[];
}

export interface MRData {
    xmlns: string;
    series: string;
    url: string;
    limit: number;
    offset: number;
    total: number;
    RaceTable?: RaceTable;
    StandingsTable?: StandingsTable;
}

export interface DriverStanding {
    position: string;
    positionText: string;
    points: string;
    wins: string;
    Driver: Driver;
    Constructors: Constructor[];
}

export interface StandingsList {
    season?: string;
    round?: string;
    DriverStandings?: DriverStanding[];
}

export interface StandingsTable {
    season: string;
    driverStandings: string;
    StandingsLists: StandingsList[];
}

export interface BeObject {
    MRData: MRData;
}