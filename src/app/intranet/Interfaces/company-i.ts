export interface PlaneI {
    type:string;
    passNumber:number;
    autonomy?:number;
    code:string | number;
    model:string;
}

export interface WorkerI {
    name:string;
    firstname:Array<string>;
    work:WorkE;
}
export interface FlightI {
    code:string | number;
    plane:PlaneI;
    date:Date;
    workers:Array<string>;
    DepartureAirport:string;
    ArrivalAirport:string;
    duration:number;
}

export interface AirportI {
    name:string;
    city:string;
    country:string;
    iata_code:string;
    _geoloc: CoordinatesI;
    links_count:number;
    objectID:string;
}

export interface CoordinatesI {
    lat:number;
    lng:number;
}

export enum WorkE{
    pilote = 'Pilote',
    copilote = 'Copilote',
    pnc = 'PNC'
}
