import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartitaService } from 'src/app/services/partita.service';
import { Partita, Player } from 'src/app/shared/Partita';

@Component({
    selector: 'app-partita-edit',
    templateUrl: 'partita-edit.page.html',
    styleUrls: ['partita-edit.page.scss']
})
export class PartitaEditPage implements OnInit {

    partita: Partita = null;

    constructor(private route: ActivatedRoute, private partitaService: PartitaService) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            // console.log(params);
            const id = params['id'];
            // console.log(id);
            this.partitaService.getPartitaById(id).subscribe(res => this.partita = res[0]);
        });
    }

    points(op: string, player: Player) {
        if(op == "add") player.points += 10;
        if(op == "rm") player.points -= 10;

        this.partitaService.updatePartita(this.partita);
    }

    getPointsColor(points: number) {
        if(points == 0) return "secondary";
        if(points < 0) return "danger";
    
        return "success";
    }

}