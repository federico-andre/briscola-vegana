import { Giocatore } from "./Giocatore";

export class Player extends Giocatore {
    points: number;
}

export interface Partita {
    id?: string,
    idField?: string,
    start_date: Date,
    end_date?: Date,
    status: number
    giocatori: Player[]
}