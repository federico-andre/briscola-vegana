import { Giocatore } from "./Giocatore";

export interface Turno {
    numero: number,
    giocatori: Player[]
}

export class Player extends Giocatore {
    points: number;
}

export interface Partita {
    id?: string,
    idField?: string,
    start_date: Date | any,
    end_date?: Date,
    status: number
    giocatori: Player[],
    turni: Turno[]
}