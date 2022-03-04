import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { GiocatoriService } from 'src/app/services/giocatori.service';
import { BaseController } from 'src/app/shared/BaseController';
import { Giocatore } from 'src/model/Giocatore';
import { GiocatoreModalPage } from './giocatore-modal/giocatore-modal.page';

@Component({
  selector: 'app-giocatori',
  templateUrl: 'giocatori.page.html',
  styleUrls: ['giocatori.page.scss']
})
export class GiocatoriPage extends BaseController implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoHeight: true
  };

  giocatori: Giocatore[] = [];

  constructor(authService: AuthService, private giocatoriService: GiocatoriService, private modalCtrl: ModalController) {
    super(authService)
  }

  ngOnInit(): void {
    this.giocatoriService.getGiocatori()
    .subscribe(res => this.giocatori = res);
  }

  async nuovoGiocatore() {
    const modal = await this.modalCtrl.create({
      component: GiocatoreModalPage,
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.8
    });
    await modal.present();
  }

}
