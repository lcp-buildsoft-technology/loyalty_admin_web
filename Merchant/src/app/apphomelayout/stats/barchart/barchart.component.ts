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
  barChartLabels: Label[] = ['O1', 'O2', 'O3', 'O4', 'O5', 'O6', 'O7', 'O8'];
  barChartColors: Colors[] = [
    { // yellow
      backgroundColor: '#dec074'
    }, 
  ];
  barChartType: ChartType = 'bar';
  barChartLegend = false;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [2500, 5900, 6000, 8100, 8600, 8050, 4500, 1400], label: 'Total Sales' },
  ];



  constructor() { }

  ngOnInit(): void {
  }

}