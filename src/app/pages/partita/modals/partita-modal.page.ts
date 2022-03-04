import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { GiocatoriService } from 'src/app/services/giocatori.service';
import { PartitaService } from 'src/app/services/partita.service';
import { Giocatore } from 'src/model/Giocatore';
import { GameMode } from 'src/model/GameMode';
import { Partita } from 'src/model/Partita';
import { Player } from 'src/model/Player';
import { v4 as uuidv4 } from 'uuid';

@Component({
    selector: 'app-partita-modal',
    templateUrl: 'partita-modal.page.html',
    styleUrls: ['partita-modal.page.scss']
})
export class PartitaModalPage implements OnInit {

    nuovaPartitaForm: FormGroup;
    allPlayers: Giocatore[] = [];
    playMode: GameMode[] = [
        {
            code: 'bv',
            description: 'Briscola Vegana',
            point_selection: false,
            pointValue: 10
        },
        {
            code: '31',
            description: 'Trentuno',
            point_selection: true,
            possible_points: [3, 5],
            pointValue: 1
        }
    ]

    constructor(private fb: FormBuilder,
        private modalCtrl: ModalController,
        private giocatoreService: GiocatoriService,
        private partitaService: PartitaService) { }

    ngOnInit(): void {
        this.giocatoreService.getGiocatori().subscribe(res => {
            this.allPlayers = res;
        });

        this.nuovaPartitaForm = this.fb.group({
            giocatori: new FormControl([], [Validators.required, Validators.minLength(2)]),
            mode: new FormControl([], [Validators.required, Validators.maxLength(1)]),
            point_number: new FormControl('')
        });
    }

    creaPartita() {
        // console.log(this.nuovaPartitaForm.value);

        const players: Player[] = this.nuovaPartitaForm.get('giocatori').value.map(giocatore => {
            return {...giocatore, points: this.mode.value.point_selection ? this.point_number.value : 0}
        });

        const partita: Partita = {
            giocatori: players,
            start_date: new Date(),
            status: 1,
            id: uuidv4(),
            turni: [{numero: 0, giocatori: players}],
            gameMode: this.mode.value,
            possible_points: this.mode.value.point_selection ? this.point_number.value : 0
        };

        // console.log(partita);

        this.partitaService.createPartita(partita);
        this.modalCtrl.dismiss();

    }

    get mode() {
        return this.nuovaPartitaForm.get('mode');
    }

    get point_number() {
        return this.nuovaPartitaForm.get('point_number');
    }

}