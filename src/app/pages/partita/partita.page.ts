import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { GiocatoriService } from 'src/app/services/giocatori.service';
import { PartitaService } from 'src/app/services/partita.service';
import { BaseController } from 'src/app/shared/BaseController';
import { Partita } from 'src/app/shared/Partita';
import { PartitaModalPage } from './modals/partita-modal.page';

@Component({
  selector: 'app-partita',
  templateUrl: 'partita.page.html',
  styleUrls: ['partita.page.scss']
})
export class PartitaPage extends BaseController implements OnInit {

  partita: Partita = null;
  createNewGame: boolean = false;

  constructor(authService: AuthService, 
              private partitaService: PartitaService, 
              private modalCtrl: ModalController, 
              private alertController: AlertController, 
              private giocatoriService: GiocatoriService) {
    super(authService);
  }

  ngOnInit(): void {
    this.getPartitaInCorso();
  }

  getPartitaInCorso() {
    this.partitaService.getPartitaInCorso().subscribe(res => {
      // console.log(res);

      if(res.length == 0) {
        this.partita = null;
        this.createNewGame = false;
      }

      if(res.length == 1) {
        this.partita = res[0];
        this.createNewGame = true;
      }

      if(res.length > 1) {
        this.partita = null;
        this.createNewGame = true;
        alert("Ci sono troppe partite aperte!");
      }

    });
  }

  async creaNuovaPartita() {
    const modal = await this.modalCtrl.create({
      component: PartitaModalPage,
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.8
    });

    await modal.present();
  }

  getPointsColor(points: number) {
    if(points == 0) return "secondary";
    if(points < 0) return "danger";

    return "success";
  }


  async chiudiPartita() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Chiudere la partita?',
      message: 'Si è sicuri di voler <strong>chiudere</strong> la partita?',
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: () => { }
        }, {
          text: 'Chiudi',
          id: 'confirm-button',
          handler: () => {
            // per ogni giocatore aggiornare il tot punti
            const giocatori = this.partita.giocatori;
            giocatori.forEach(giocatore => {
              giocatore.totalPoints += giocatore.points;

              this.giocatoriService.updateGiocatore(giocatore);
            });

            // impostare lo stato della partita a 0
            this.partita.status = 0;
            this.partita.end_date = new Date();
            this.partitaService.updatePartita(this.partita);

            // this.getPartitaInCorso();
          }
        }
      ]
    });

    await alert.present();
  }

}
