import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BaseController } from 'src/app/shared/BaseController';

@Component({
  selector: 'app-dati',
  templateUrl: './dati.page.html',
  styleUrls: ['./dati.page.scss'],
})
export class DatiPage extends BaseController implements OnInit {

  segment: string = "statistiche";

  constructor(authService: AuthService) { super(authService) }

  ngOnInit() {
  }

  segmentChanged(event: any) {
    console.log(event);
    this.segment = event.detail.value;
  }

}
