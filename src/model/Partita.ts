import { GameMode } from "./GameMode";
import { Player } from "./Player";
import { Turno } from "./Turno";

export class Partita {
    id: string;
    idField?: string;
    start_date: Date | any;
    end_date?: Date;
    status: number;
    giocatori: Player[];
    turni: Turno[];
    gameMode: GameMode;
    possible_points?: number = 0;
}