import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PartitaService } from 'src/app/services/partita.service';
import { BaseController } from 'src/app/shared/BaseController';
import { Partita } from 'src/app/shared/Partita';

@Component({
  selector: 'app-storico',
  templateUrl: 'storico.page.html',
  styleUrls: ['storico.page.scss']
})
export class StoricoPage extends BaseController implements OnInit {

  storicoPartite: Partita[] = [];

  constructor(authService: AuthService, private partitaService: PartitaService) {
    super(authService);
  }

  ngOnInit(): void {
    this.partitaService.getStoricoPartite().subscribe(res => this.storicoPartite = res);
  }

}
