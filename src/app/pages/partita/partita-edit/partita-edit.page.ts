import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { PartitaService } from 'src/app/services/partita.service';
import { BaseController } from 'src/app/shared/BaseController';
import { Partita, Player, Turno } from 'src/app/shared/Partita';

@Component({
    selector: 'app-partita-edit',
    templateUrl: 'partita-edit.page.html',
    styleUrls: ['partita-edit.page.scss']
})
export class PartitaEditPage extends BaseController implements OnInit {

    partita: Partita = null;
    selectedTurno: Turno = null;

    constructor(authService: AuthService, private route: ActivatedRoute,
        private partitaService: PartitaService,
        public alertController: AlertController,
        private router: Router) {
        super(authService);
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            // console.log(params);
            const id = params['id'];
            // console.log(id);
            this.partitaService.getPartitaById(id).subscribe(res => {
                this.partita = res[0];
                this.selectedTurno = this.partita.turni[this.partita.turni.length - 1];
            });
        });
    }

    async points(op: string, player: Player) {
        if (op == "add") player.points += 10;
        if (op == "rm") player.points -= 10;

        if (player.points == 90) {
            const alert = await this.alertController.create({
                cssClass: 'my-custom-class',
                header: 'LA MAMMA!!',
                message: 'La mamma, la zia, la nonna, la sorella, la cugina ... e la nonna cagona',
                buttons: ['OK']
            });

            await alert.present();
        }

    }

    async updareResultsAndGoBack() {
        this.partita.giocatori = this.selectedTurno.giocatori;
        await this.partitaService.updatePartita(this.partita);
        this.router.navigate(['/tabs/partita']);
    }

    nextTurno() {
        this.partita.giocatori = this.selectedTurno.giocatori;
        this.partita.turni[this.selectedTurno.numero] = this.selectedTurno;

        const newTurno: Turno = {
            numero: this.selectedTurno.numero + 1,
            giocatori: this.partita.giocatori
        };

        this.partita.turni.push(newTurno);
        this.selectedTurno = newTurno;

        this.partitaService.updatePartita(this.partita);
    }

    turnoChanged(event: any) {
        const turno = event.detail.value;
        this.selectedTurno = this.partita.turni[turno];
    }


}