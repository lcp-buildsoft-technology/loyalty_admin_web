import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Colors } from 'ng2-charts';

@Component({
  selector: 'app-smallareachart1',
  templateUrl: './smallareachart1.component.html',
  styleUrls: ['./smallareachart1.component.scss']
})
export class Smallareachart1Component implements OnInit {
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
          display: false
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
      backgroundColor: 'rgba(255, 193, 7, 0.4)',
      borderColor: '#ffc107',
      pointBackgroundColor: '#ff9800',
      pointBorderColor: '#ff9800',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      borderWidth: 1,
    },
  ];
  areaChartData: ChartDataSets[] = [
    { data: [35, 37, 60, 45, 50, 33, 50, 40], label: 'Quarterly Result' }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
