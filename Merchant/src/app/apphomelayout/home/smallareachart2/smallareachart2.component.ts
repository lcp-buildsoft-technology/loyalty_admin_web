import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Colors } from 'ng2-charts';

@Component({
  selector: 'app-smallareachart2',
  templateUrl: './smallareachart2.component.html',
  styleUrls: ['./smallareachart2.component.scss']
})
export class Smallareachart2Component implements OnInit {
  areaChartOptions: ChartOptions = {
    responsive: true,
    elements: {
      point: {
        radius: 1
      }
    },
    scales: {
      yAxes: [
        {
          display: false,
        }
      ],
      xAxes: [
        {
          display: false,
        }
      ]
    }
  };
  areaChartLabels: Label[] = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'];
  areaChartType: ChartType = 'line';
  areaChartLegend = false;
  areaChartPlugins = [];
  lineChartColors: Colors[] = [
    { // yellow
      backgroundColor: 'rgba(60, 187, 120, 0.4)',
      borderColor: '#65e5a1',
      pointBackgroundColor: '#3cbb78',
      pointBorderColor: '#3cbb78',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      borderWidth: 1,
    },
  ];
  areaChartData: ChartDataSets[] = [
    { data: [33, 45, 37,45, 37, 60, 70, 46], label: 'Quarterly Result' }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
