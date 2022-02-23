import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Label, Colors } from 'ng2-charts';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss']
})
export class BarchartComponent implements OnInit {

  barChartOptions: ChartOptions = {
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
  barChartLabels: Label[] = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'];
  barChartColors: Colors[] = [
    { // yellow
      backgroundColor: '#7297F8'
    }, {
      backgroundColor: '#E3EAFE'
    }
  ];
  barChartType: ChartType = 'bar';
  barChartLegend = false;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [2500, 5900, 6000, 8100, 8600, 8050, 4500, 1400], label: 'Company A' },
    { data: [2800, 4800, 4000, 7900, 9600, 8870, 3700, 1800], label: 'Company B' }
  ];



  constructor() { }

  ngOnInit(): void {
  }

}
