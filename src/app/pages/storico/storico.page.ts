import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BaseController } from 'src/app/shared/BaseController';

@Component({
  selector: 'app-storico',
  templateUrl: 'storico.page.html',
  styleUrls: ['storico.page.scss']
})
export class StoricoPage extends BaseController {

  constructor(authService: AuthService) {
    super(authService);
  }

}
