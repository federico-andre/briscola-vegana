import { Component } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Component({
    selector: 'app-base',
    template: `<div>base</div>`
})
export class BaseController {

    constructor(private authService: AuthService) { }

    logout() {
        this.authService.logout();
    }

}