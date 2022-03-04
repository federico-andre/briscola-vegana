import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Chart, registerables } from 'chart.js';
import { AuthService } from 'src/app/services/auth.service';
import { PartitaService } from 'src/app/services/partita.service';
import { BaseController } from 'src/app/shared/BaseController';
import { Partita } from 'src/model/Partita';
import { Player } from 'src/model/Player';
import { Turno } from 'src/model/Turno';

@Component({
    selector: 'app-partita-edit',
    templateUrl: 'partita-edit.page.html',
    styleUrls: ['partita-edit.page.scss']
})
export class PartitaEditPage extends BaseController implements OnInit, AfterViewInit {

    @ViewChild('lineCanvas') private lineCanvas: ElementRef;

    partita: Partita = null;
    selectedTurno: Turno = null;

    lineChart: any;

    constructor(authService: AuthService, private route: ActivatedRoute,
        private partitaService: PartitaService,
        public alertController: AlertController,
        private router: Router) {
        super(authService);
    }

    ngAfterViewInit(): void {
        this.lineChartMethod();
    }

    ngOnInit(): void {
        Chart.register(...registerables);
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

        const mode = this.partita.gameMode;

        if (op == "add") {
            if(mode.point_selection && player.points == this.partita.possible_points) {
                this.createAlert('OCHO!', 'Massimo dei punti raggiunto!');
            } else {
                player.points += mode.pointValue;
            }
        };

        if (op == "rm") {
            if(mode.point_selection && player.points == 0) {
                this.createAlert('OCHO!', "Il giocatore ha già perso! UahUahUahUah (com'è che fate voi?!). Occhio che potreste non dovergli parlare più ;)");
            } else {
                player.points -= mode.pointValue;
            }
        };

        if (player.points == 90) {
            this.createAlert('LA MAMMA!!', 'La mamma, la zia, la nonna, la sorella, la cugina ... e la nonna cagona');
        }

    }

    async createAlert(header: string, message: string) {
        const alert = await this.alertController.create({
            cssClass: '',
            header: header,
            message: message,
            buttons: ['OK']
        });

        await alert.present();
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

    lineChartMethod() {
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
          type: 'line',
          data: {
              labels: ['fede', 'fab'],
              datasets: [
                  {data: [1,2,3,4,5]}
              ]
          },
          options: {
            scales: {
              xAxes: 
                {
                  type: 'linear',
                  position: 'bottom',
                },
              yAxes: 
                {
                  type: 'linear',
                },
              
            }
          }
        });
      }


}