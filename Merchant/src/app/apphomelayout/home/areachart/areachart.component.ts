import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Colors } from 'ng2-charts';

@Component({
  selector: 'app-areachart',
  templateUrl: './areachart.component.html',
  styleUrls: ['./areachart.component.scss']
})
export class AreachartComponent implements OnInit {
  areaChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          display: false,
        }
      ],
      xAxes: [
        {
          ticks: {
            fontColor: '#999999',
          }
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
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      borderWidth: 1,
    },
  ];
  areaChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 70, 46, 33, 45, 37], label: 'Quarterly Result' }
  ];

  constructor() { }

  ngOnInit(): void {
  
  }

}
