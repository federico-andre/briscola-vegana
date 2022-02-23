import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { GiocatoriService } from 'src/app/services/giocatori.service';
import { PartitaService } from 'src/app/services/partita.service';
import { Giocatore } from 'src/app/shared/Giocatore';
import { Partita, Player } from 'src/app/shared/Partita';
import { v4 as uuidv4 } from 'uuid';

@Component({
    selector: 'app-partita-modal',
    templateUrl: 'partita-modal.page.html',
    styleUrls: ['partita-modal.page.scss']
})
export class PartitaModalPage implements OnInit {

    nuovaPartitaForm: FormGroup;
    allPlayers: Giocatore[] = [];

    constructor(private fb: FormBuilder,
        private modalCtrl: ModalController,
        private giocatoreService: GiocatoriService,
        private partitaService: PartitaService) { }

    ngOnInit(): void {
        this.giocatoreService.getGiocatori().subscribe(res => {
            this.allPlayers = res;
        });

        this.nuovaPartitaForm = this.fb.group({
            giocatori: new FormControl([], Validators.required)
        });
    }

    creaPartita() {
        console.log(this.nuovaPartitaForm.value);

        const players: Player[] = this.nuovaPartitaForm.get('giocatori').value.map(gicoatore => {
            return {...gicoatore, points: 0}
        });

        const partita: Partita = {
            giocatori: players,
            start_date: new Date(),
            status: 1,
            id: uuidv4()
        };

        this.partitaService.createPartita(partita);
        this.modalCtrl.dismiss();

    }

}