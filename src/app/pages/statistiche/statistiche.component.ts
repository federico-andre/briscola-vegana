import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { GiocatoriService } from 'src/app/services/giocatori.service';
import { PartitaService } from 'src/app/services/partita.service';

@Component({
  selector: 'app-statistiche',
  templateUrl: './statistiche.component.html',
  styleUrls: ['./statistiche.component.scss'],
})
export class StatisticheComponent implements OnInit, AfterViewInit {

  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;
  @ViewChild('barCanvas') private barCanvas: ElementRef;

  doughnutChart: any;
  barChart: any;
  totalMatches: number = 0;

  constructor(private partitaService: PartitaService, private giocatoriService: GiocatoriService) { }

  ngAfterViewInit(): void {
    this.initStatistics();
  }

  ngOnInit() {
    Chart.register(...registerables);
  }

  initStatistics() {
    this.partitaService.getAll().subscribe(result => {

      this.totalMatches = result.length;
      
      const labels = new Set(result.map(match => match.gameMode.description));

      const data = [...labels].map(label => result.filter(match => match.gameMode.description == label).length);

      const stat = {
        total: result.length,
        labels: labels,
        data: data
      }

      this.doughnutChartMethod(stat);

    });

    this.giocatoriService.getGiocatori().subscribe(result => {
      const labels = new Set(result.map(giocatore => giocatore.nickname));
      const data = [...labels].map(label => result.filter(giocatore => giocatore.nickname == label)[0].totalPoints);

      const stat = {
        labels: labels,
        data: data
      }

      this.barChartMethod(stat);

    });

  }

  doughnutChartMethod(stat: any) {
    this.doughnutChart?.destroy();
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: [...stat.labels],
        datasets: [{
          label: '# di Partite',
          data: stat.data,
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          hoverBackgroundColor: [
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384'
          ],
          hoverOffset: 4,

        }]
      }
    });
  }

  barChartMethod(stat: any) {
    this.barChart?.destroy();
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: [...stat.labels],
        datasets: [{
          label: '# di Punti',
          data: stat.data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      }
    });
  }

}
