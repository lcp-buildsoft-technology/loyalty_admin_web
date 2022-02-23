import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import tinymce from 'tinymce';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from 'express';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Chart from 'chart.js';
import { CookieService } from 'ngx-cookie';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
  styleUrls: ["dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();


  public canvas: any;
  public ctx;
  public datasets: any;
  public data: any;
  public myChartData;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public clicked2: boolean = false;
  public membercount: number = 0;
  public merchantcount: number = 0;
  redempArr = [];
  memberArr = [];
  merchantArr = [];
  bookingeventArr = [];
  bookingvenueArr = [];
  todaybookingvenueArr = [];
  total1: number = 0;
  constructor(private http: HttpClient, private cookieService: CookieService, private sessionSt: SessionStorageService) { }
  ngOnDestroy(): void {

    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  ngOnInit() {
    this.getCookies();
    this.getSession();
    this.getmembercount();
    this.getmerchantcount();
    this.getcountBookingVenue();
    this.getcountBookingEvent();
    this.getRedemp();
    this.gettotalRedemp();
    this.getmember();
    this.getbookingevent();
    // this.getbookingvenue();
    this.getmerchant();

    $('#loader').show();
    $('body').css("overflow-y", "hidden");

    setTimeout(() => {

      var gradientChartOptionsConfigurationWithTooltipBlue: any = {
        maintainAspectRatio: false,
        legend: {
          display: false
        },

        tooltips: {
          backgroundColor: '#f5f5f5',
          titleFontColor: '#333',
          bodyFontColor: '#666',
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        responsive: true,
        scales: {
          yAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(29,140,248,0.0)',
              zeroLineColor: "transparent",
            },
            ticks: {
              suggestedMin: 60,
              suggestedMax: 125,
              padding: 20,
              fontColor: "#2380f7"
            }
          }],

          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(29,140,248,0.1)',
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#2380f7"
            }
          }]
        }
      };

      var gradientChartOptionsConfigurationWithTooltipPurple: any = {
        maintainAspectRatio: false,
        legend: {
          display: false
        },

        tooltips: {
          backgroundColor: '#f5f5f5',
          titleFontColor: '#333',
          bodyFontColor: '#666',
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        responsive: true,
        scales: {
          yAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(29,140,248,0.0)',
              zeroLineColor: "transparent",
            },
            ticks: {
              suggestedMin: 60,
              suggestedMax: 125,
              padding: 20,
              fontColor: "#9a9a9a"
            }
          }],

          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(225,78,202,0.1)',
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#9a9a9a"
            }
          }]
        }
      };

      // var gradientChartOptionsConfigurationWithTooltipRed: any = {
      //   maintainAspectRatio: false,
      //   legend: {
      //     display: false
      //   },

      //   tooltips: {
      //     backgroundColor: '#f5f5f5',
      //     titleFontColor: '#333',
      //     bodyFontColor: '#666',
      //     bodySpacing: 4,
      //     xPadding: 12,
      //     mode: "nearest",
      //     intersect: 0,
      //     position: "nearest"
      //   },
      //   responsive: true,
      //   scales: {
      //     yAxes: [{
      //       barPercentage: 1.6,
      //       gridLines: {
      //         drawBorder: false,
      //         color: 'rgba(29,140,248,0.0)',
      //         zeroLineColor: "transparent",
      //       },
      //       ticks: {
      //         suggestedMin: 100,
      //         suggestedMax: 1000,
      //         padding: 20,
      //         fontColor: "#9a9a9a"
      //       }
      //     }],

      //     xAxes: [{
      //       barPercentage: 1.6,
      //       gridLines: {
      //         drawBorder: false,
      //         color: 'rgba(233,32,16,0.1)',
      //         zeroLineColor: "transparent",
      //       },
      //       ticks: {
      //         padding: 20,
      //         fontColor: "#9a9a9a"
      //       }
      //     }]
      //   }
      // };

      // var gradientChartOptionsConfigurationWithTooltipOrange: any = {
      //   maintainAspectRatio: false,
      //   legend: {
      //     display: false
      //   },

      //   tooltips: {
      //     backgroundColor: '#f5f5f5',
      //     titleFontColor: '#333',
      //     bodyFontColor: '#666',
      //     bodySpacing: 4,
      //     xPadding: 12,
      //     mode: "nearest",
      //     intersect: 0,
      //     position: "nearest"
      //   },
      //   responsive: true,
      //   scales: {
      //     yAxes: [{
      //       barPercentage: 1.6,
      //       gridLines: {
      //         drawBorder: false,
      //         color: 'rgba(29,140,248,0.0)',
      //         zeroLineColor: "transparent",
      //       },
      //       ticks: {
      //         suggestedMin: 50,
      //         suggestedMax: 110,
      //         padding: 20,
      //         fontColor: "#ff8a76"
      //       }
      //     }],

      //     xAxes: [{
      //       barPercentage: 1.6,
      //       gridLines: {
      //         drawBorder: false,
      //         color: 'rgba(220,53,69,0.1)',
      //         zeroLineColor: "transparent",
      //       },
      //       ticks: {
      //         padding: 20,
      //         fontColor: "#ff8a76"
      //       }
      //     }]
      //   }
      // };

      var gradientChartOptionsConfigurationWithTooltipGreen: any = {
        maintainAspectRatio: false,
        legend: {
          display: false
        },

        tooltips: {
          backgroundColor: '#f5f5f5',
          titleFontColor: '#333',
          bodyFontColor: '#666',
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        responsive: true,
        scales: {
          yAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(29,140,248,0.0)',
              zeroLineColor: "transparent",
            },
            ticks: {
              suggestedMin: 50,
              suggestedMax: 125,
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }],

          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(0,242,195,0.1)',
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }]
        }
      };


      // var gradientBarChartConfiguration: any = {
      //   maintainAspectRatio: false,
      //   legend: {
      //     display: false
      //   },

      //   tooltips: {
      //     backgroundColor: '#f5f5f5',
      //     titleFontColor: '#333',
      //     bodyFontColor: '#666',
      //     bodySpacing: 4,
      //     xPadding: 12,
      //     mode: "nearest",
      //     intersect: 0,
      //     position: "nearest"
      //   },
      //   responsive: true,
      //   scales: {
      //     yAxes: [{

      //       gridLines: {
      //         drawBorder: false,
      //         color: 'rgba(29,140,248,0.1)',
      //         zeroLineColor: "transparent",
      //       },
      //       ticks: {
      //         suggestedMin: 60,
      //         suggestedMax: 120,
      //         padding: 20,
      //         fontColor: "#9e9e9e"
      //       }
      //     }],

      //     xAxes: [{

      //       gridLines: {
      //         drawBorder: false,
      //         color: 'rgba(29,140,248,0.1)',
      //         zeroLineColor: "transparent",
      //       },
      //       ticks: {
      //         padding: 20,
      //         fontColor: "#9e9e9e"
      //       }
      //     }]
      //   }
      // };
      //===============================================Total Merchant=================================================
      // this.canvas = document.getElementById("chartLineRed");
      // this.ctx = this.canvas.getContext("2d");

      // var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

      // gradientStroke.addColorStop(1, 'rgba(233,32,16,0.2)');
      // gradientStroke.addColorStop(0.4, 'rgba(233,32,16,0.0)');
      // gradientStroke.addColorStop(0, 'rgba(233,32,16,0)'); //red colors

      // var data = {
      //   labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
      //   datasets: [{
      //     label: "Total merchant joined",
      //     fill: true,
      //     backgroundColor: gradientStroke,
      //     borderColor: '#ec250d',
      //     borderWidth: 2,
      //     borderDash: [],
      //     borderDashOffset: 0.0,
      //     pointBackgroundColor: '#ec250d',
      //     pointBorderColor: 'rgba(255,255,255,0)',
      //     pointHoverBackgroundColor: '#ec250d',
      //     pointBorderWidth: 20,
      //     pointHoverRadius: 4,
      //     pointHoverBorderWidth: 15,
      //     pointRadius: 4,
      //     data: [this.merJan, this.merFeb, this.merMar, this.merApr, this.merMay, this.merJun, this.merJul, this.merAug, this.merSep, this.merOct, this.merNov, this.merDec],
      //   }]
      // };

      // var myChart = new Chart(this.ctx, {
      //   type: 'line',
      //   data: data,
      //   options: gradientChartOptionsConfigurationWithTooltipOrange
      // });
      //=============================================Total Member=======================================================

      // this.canvas = document.getElementById("chartLineGreen");
      // this.ctx = this.canvas.getContext("2d");


      // var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

      // gradientStroke.addColorStop(1, 'rgba(66,134,121,0.15)');
      // gradientStroke.addColorStop(0.4, 'rgba(66,134,121,0.0)'); //green colors
      // gradientStroke.addColorStop(0, 'rgba(66,134,121,0)'); //green colors

      // var data = {
      //   labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
      //   datasets: [{
      //     label: "Total member joined",
      //     fill: true,
      //     backgroundColor: gradientStroke,
      //     borderColor: '#00d6b4',
      //     borderWidth: 2,
      //     borderDash: [],
      //     borderDashOffset: 0.0,
      //     pointBackgroundColor: '#00d6b4',
      //     pointBorderColor: 'rgba(255,255,255,0)',
      //     pointHoverBackgroundColor: '#00d6b4',
      //     pointBorderWidth: 20,
      //     pointHoverRadius: 4,
      //     pointHoverBorderWidth: 15,
      //     pointRadius: 4,
      //     data: [this.memJan, this.memFeb, this.memMar, this.memApr, this.memMay, this.memJun, this.memJul, this.memAug, this.memSep, this.memOct, this.memNov, this.memDec],
      //   }]
      // };

      // var myChart = new Chart(this.ctx, {
      //   type: 'line',
      //   data: data,
      //   options: gradientChartOptionsConfigurationWithTooltipGreen

      // });


      //=============================================Points Redeemed===========================================================
      // var chart_labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      // this.datasets = [
      //   [this.redempJan, this.redempFeb, this.redempMar, this.redempApr, this.redempMay, this.redempJun, this.redempJul, this.redempAug, this.redempSep, this.redempOct, this.redempNov, this.redempDec],
      //   [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
      //   [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130]
      // ];
      // this.data = this.datasets[0];



      // this.canvas = document.getElementById("chartBig1");
      // this.ctx = this.canvas.getContext("2d");

      // var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

      // gradientStroke.addColorStop(1, 'rgba(233,32,16,0.2)');
      // gradientStroke.addColorStop(0.4, 'rgba(233,32,16,0.0)');
      // gradientStroke.addColorStop(0, 'rgba(233,32,16,0)'); //red colors

      // var config = {
      //   type: 'line',
      //   data: {
      //     labels: chart_labels,
      //     datasets: [{
      //       label: "Total points redeemed",
      //       fill: true,
      //       backgroundColor: gradientStroke,
      //       borderColor: '#ec250d',
      //       borderWidth: 2,
      //       borderDash: [],
      //       borderDashOffset: 0.0,
      //       pointBackgroundColor: '#ec250d',
      //       pointBorderColor: 'rgba(255,255,255,0)',
      //       pointHoverBackgroundColor: '#ec250d',
      //       pointBorderWidth: 20,
      //       pointHoverRadius: 4,
      //       pointHoverBorderWidth: 15,
      //       pointRadius: 4,
      //       data: this.data,
      //     }]
      //   },
      //   options: gradientChartOptionsConfigurationWithTooltipRed
      // };
      // this.myChartData = new Chart(this.ctx, config);
      //===========================================Booking Summary====================================================

      // this.canvas = document.getElementById("CountryChart");
      // this.ctx  = this.canvas.getContext("2d");
      // var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

      // gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
      // gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
      // gradientStroke.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors


      // var myChart = new Chart(this.ctx, {
      //   type: 'bar',
      //   responsive: true,
      //   legend: {
      //     display: false
      //   },
      //   data: {
      //     labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
      //     datasets: [{
      //       label: "Total booking",
      //       fill: true,
      //       backgroundColor: gradientStroke,
      //       hoverBackgroundColor: gradientStroke,
      //       borderColor: '#1f8ef1',
      //       borderWidth: 2,
      //       borderDash: [],
      //       borderDashOffset: 0.0,
      //       data: [this.eventJan + this. venueJan, this.eventFeb + this. venueFeb, this.eventMar + this. venueMar, this.eventApr + this. venueApr, this.eventMay + this. venueMay, this.eventJun + this. venueJun, this.eventJul + this. venueJul, this.eventAug + this. venueAug, this.eventSep + this. venueSep, this.eventOct + this. venueOct, this.eventNov + this. venueNov, this.eventDec + this. venueDec],
      //     }]
      //   },
      //   options: gradientBarChartConfiguration
      // });
    }, 1);

    this.gettodaybookingvenue();
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      lengthMenu: [5, 10, 20]
    };
    //========================================================================================================================
  }
  getmembercount() {
    this.http.get('http://165.22.50.213:3000/getmembercount').subscribe(res => {
      this.membercount = res['data'];
    });
  }
  getmerchantcount() {
    this.http.get('http://165.22.50.213:3000/getmerchantcount').subscribe(res => {
      this.merchantcount = res['data'];
    });
  }
  memJan: number = 0;
  memFeb: number = 0;
  memMar: number = 0;
  memApr: number = 0;
  memMay: number = 0;
  memJun: number = 0;
  memJul: number = 0;
  memAug: number = 0;
  memSep: number = 0;
  memOct: number = 0;
  memNov: number = 0;
  memDec: number = 0;
  getmember() {
    this.http.get('http://165.22.50.213:3000/getmember').subscribe(res => {
      this.memberArr = res['data'];
      for (let i = 0; i < this.memberArr.length; i++) {
        var x = this.memberArr[i].createdat.split('-');
        switch (x[1]) {
          case '01':
            this.memJan++;
            break;
          case '02':
            this.memFeb++;
            break;
          case '03':
            this.memMar++;
            break;
          case '04':
            this.memApr++;
            break;
          case '05':
            this.memMay++;
            break;
          case '06':
            this.memJun++;
            break;
          case '07':
            this.memJul++;
            break;
          case '08':
            this.memAug++;
            break;
          case '09':
            this.memSep++;
            break;
          case '10':
            this.memOct++;
            break;
          case '11':
            this.memNov++;
            break;
          default:
            this.memDec++;
            break;
        }
      }
      var gradientChartOptionsConfigurationWithTooltipGreen: any = {
        maintainAspectRatio: false,
        legend: {
          display: false
        },

        tooltips: {
          backgroundColor: '#f5f5f5',
          titleFontColor: '#333',
          bodyFontColor: '#666',
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        responsive: true,
        scales: {
          yAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(29,140,248,0.0)',
              zeroLineColor: "transparent",
            },
            ticks: {
              suggestedMin: 50,
              suggestedMax: 125,
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }],

          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(0,242,195,0.1)',
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }]
        }
      };
      this.canvas = document.getElementById("chartLineGreen");
      this.ctx = this.canvas.getContext("2d");


      var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, 'rgba(66,134,121,0.15)');
      gradientStroke.addColorStop(0.4, 'rgba(66,134,121,0.0)'); //green colors
      gradientStroke.addColorStop(0, 'rgba(66,134,121,0)'); //green colors

      var data = {
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        datasets: [{
          label: "Total member joined",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: '#00d6b4',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#00d6b4',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#00d6b4',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: [this.memJan, this.memFeb, this.memMar, this.memApr, this.memMay, this.memJun, this.memJul, this.memAug, this.memSep, this.memOct, this.memNov, this.memDec],
        }]
      };

      var myChart = new Chart(this.ctx, {
        type: 'line',
        data: data,
        options: gradientChartOptionsConfigurationWithTooltipGreen

      });
    });
  }
  merJan: number = 0;
  merFeb: number = 0;
  merMar: number = 0;
  merApr: number = 0;
  merMay: number = 0;
  merJun: number = 0;
  merJul: number = 0;
  merAug: number = 0;
  merSep: number = 0;
  merOct: number = 0;
  merNov: number = 0;
  merDec: number = 0;
  getmerchant() {
    this.http.get('http://165.22.50.213:3000/getmerchantandimage').subscribe(res => {
      this.merchantArr = res['data'];

      for (let i = 0; i < this.merchantArr.length; i++) {
        var x = this.merchantArr[i].createdate.split('-');

        switch (x[1]) {
          case '01':
            this.merJan++;
            break;
          case '02':
            this.merFeb++;
            break;
          case '03':
            this.merMar++;
            break;
          case '04':
            this.merApr++;
            break;
          case '05':
            this.merMay++;
            break;
          case '06':
            this.merJun++;
            break;
          case '07':
            this.merJul++;
            break;
          case '08':
            this.merAug++;
            break;
          case '09':
            this.merSep++;
            break;
          case '10':
            this.merOct++;
            break;
          case '11':
            this.merNov++;
            break;
          default:
            this.merDec++;
            break;
        }
      }
      var gradientChartOptionsConfigurationWithTooltipOrange: any = {
        maintainAspectRatio: false,
        legend: {
          display: false
        },

        tooltips: {
          backgroundColor: '#f5f5f5',
          titleFontColor: '#333',
          bodyFontColor: '#666',
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        responsive: true,
        scales: {
          yAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(29,140,248,0.0)',
              zeroLineColor: "transparent",
            },
            ticks: {
              suggestedMin: 50,
              suggestedMax: 110,
              padding: 20,
              fontColor: "#ff8a76"
            }
          }],

          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(220,53,69,0.1)',
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#ff8a76"
            }
          }]
        }
      };
      this.canvas = document.getElementById("chartLineRed");
      this.ctx = this.canvas.getContext("2d");

      var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, 'rgba(233,32,16,0.2)');
      gradientStroke.addColorStop(0.4, 'rgba(233,32,16,0.0)');
      gradientStroke.addColorStop(0, 'rgba(233,32,16,0)'); //red colors

      var data = {
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        datasets: [{
          label: "Total merchant joined",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: '#ec250d',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#ec250d',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#ec250d',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: [this.merJan, this.merFeb, this.merMar, this.merApr, this.merMay, this.merJun, this.merJul, this.merAug, this.merSep, this.merOct, this.merNov, this.merDec],
        }]
      };

      var myChart = new Chart(this.ctx, {
        type: 'line',
        data: data,
        options: gradientChartOptionsConfigurationWithTooltipOrange
      });
      $('#loader').hide();
      $('#loader-wrapper').hide();
      $('#loader-inner').hide();
      $('body').css("overflow-y", "visible");
    });
  }
  totalbooking: number = 0;
  getcountBookingVenue() {
    this.http.get('http://165.22.50.213:3000/getcountbookingvenue').subscribe(res => {
      this.totalbooking += res['data'];

    });
  }

  getcountBookingEvent() {
    this.http.get('http://165.22.50.213:3000/getcountbookingevent').subscribe(res => {
      this.totalbooking += res['data'];

    });
  }
  redempJan: number = 0;
  redempFeb: number = 0;
  redempMar: number = 0;
  redempApr: number = 0;
  redempMay: number = 0;
  redempJun: number = 0;
  redempJul: number = 0;
  redempAug: number = 0;
  redempSep: number = 0;
  redempOct: number = 0;
  redempNov: number = 0;
  redempDec: number = 0;
  gettotalRedemp() {
    this.http.get('http://165.22.50.213:3000/getpointsredeem').subscribe(res => {
      this.redempArr = res['data'];

      for (let i = 0; i < this.redempArr.length; i++) {
        var x = this.redempArr[i].createddate.split('-');

        switch (x[1]) {
          case '01':
            this.redempJan += parseFloat(this.redempArr[i].points);
            break;
          case '02':
            this.redempFeb += parseFloat(this.redempArr[i].points);
            break;
          case '03':
            this.redempMar += parseFloat(this.redempArr[i].points);
            break;
          case '04':
            this.redempApr += parseFloat(this.redempArr[i].points);
            break;
          case '05':
            this.redempMay += parseFloat(this.redempArr[i].points);
            break;
          case '06':
            this.redempJun += parseFloat(this.redempArr[i].points);
            break;
          case '07':
            this.redempJul += parseFloat(this.redempArr[i].points);
            break;
          case '08':
            this.redempAug += parseFloat(this.redempArr[i].points);
            break;
          case '09':
            this.redempSep += parseFloat(this.redempArr[i].points);
            break;
          case '10':
            this.redempOct += parseFloat(this.redempArr[i].points);
            break;
          case '11':
            this.redempNov += parseFloat(this.redempArr[i].points);
            break;
          default:
            this.redempDec += parseFloat(this.redempArr[i].points);
            break;
        }

      }
      var gradientChartOptionsConfigurationWithTooltipRed: any = {
        maintainAspectRatio: false,
        legend: {
          display: false
        },

        tooltips: {
          backgroundColor: '#f5f5f5',
          titleFontColor: '#333',
          bodyFontColor: '#666',
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        responsive: true,
        scales: {
          yAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(29,140,248,0.0)',
              zeroLineColor: "transparent",
            },
            ticks: {
              suggestedMin: 100,
              suggestedMax: 1000,
              padding: 20,
              fontColor: "#9a9a9a"
            }
          }],

          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(233,32,16,0.1)',
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#9a9a9a"
            }
          }]
        }
      };
      var chart_labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      this.datasets = [
        [this.redempJan, this.redempFeb, this.redempMar, this.redempApr, this.redempMay, this.redempJun, this.redempJul, this.redempAug, this.redempSep, this.redempOct, this.redempNov, this.redempDec],
        [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
        [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130]
      ];
      this.data = this.datasets[0];



      this.canvas = document.getElementById("chartBig1");
      this.ctx = this.canvas.getContext("2d");

      var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, 'rgba(233,32,16,0.2)');
      gradientStroke.addColorStop(0.4, 'rgba(233,32,16,0.0)');
      gradientStroke.addColorStop(0, 'rgba(233,32,16,0)'); //red colors

      var config = {
        type: 'line',
        data: {
          labels: chart_labels,
          datasets: [{
            label: "Total points redeemed",
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: '#ec250d',
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: '#ec250d',
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: '#ec250d',
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.data,
          }]
        },
        options: gradientChartOptionsConfigurationWithTooltipRed
      };
      this.myChartData = new Chart(this.ctx, config);
    });
  }
  eventJan: number = 0;
  eventFeb: number = 0;
  eventMar: number = 0;
  eventApr: number = 0;
  eventMay: number = 0;
  eventJun: number = 0;
  eventJul: number = 0;
  eventAug: number = 0;
  eventSep: number = 0;
  eventOct: number = 0;
  eventNov: number = 0;
  eventDec: number = 0;
  getbookingevent() {
    this.http.get('http://165.22.50.213:3000/getbookingevent').subscribe(res => {
      this.bookingeventArr = res['data'];
      for (let i = 0; i < this.bookingeventArr.length; i++) {
        var x = this.bookingeventArr[i].createddate.split('-');

        switch (x[1]) {
          case '01':
            this.eventJan++;
            break;
          case '02':
            this.eventFeb++;
            break;
          case '03':
            this.eventMar++;
            break;
          case '04':
            this.eventApr++;
            break;
          case '05':
            this.eventMay++;
            break;
          case '06':
            this.eventJun++;
            break;
          case '07':
            this.eventJul++;
            break;
          case '08':
            this.eventAug++;
            break;
          case '09':
            this.eventSep++;
            break;
          case '10':
            this.eventOct++;
            break;
          case '11':
            this.eventNov++;
            break;
          default:
            this.eventDec++;
            break;
        }

      }
      this.http.get('http://165.22.50.213:3000/getbookingvenue').subscribe(res => {
        this.bookingvenueArr = res['data'];
        for (let i = 0; i < this.bookingvenueArr.length; i++) {
          var x = this.bookingvenueArr[i].createddate.split('-');
          switch (x[1]) {
            case '01':
              this.venueJan++;
              break;
            case '02':
              this.venueFeb++;
              break;
            case '03':
              this.venueMar++;
              break;
            case '04':
              this.venueApr++;
              break;
            case '05':
              this.venueMay++;
              break;
            case '06':
              this.venueJun++;
              break;
            case '07':
              this.venueJul++;
              break;
            case '08':
              this.venueAug++;
              break;
            case '09':
              this.venueSep++;
              break;
            case '10':
              this.venueOct++;
              break;
            case '11':
              this.venueNov++;
              break;
            default:
              this.venueDec++;
              break;
          }

        }
        var gradientBarChartConfiguration: any = {
          maintainAspectRatio: false,
          legend: {
            display: false
          },

          tooltips: {
            backgroundColor: '#f5f5f5',
            titleFontColor: '#333',
            bodyFontColor: '#666',
            bodySpacing: 4,
            xPadding: 12,
            mode: "nearest",
            intersect: 0,
            position: "nearest"
          },
          responsive: true,
          scales: {
            yAxes: [{

              gridLines: {
                drawBorder: false,
                color: 'rgba(29,140,248,0.1)',
                zeroLineColor: "transparent",
              },
              ticks: {
                suggestedMin: 60,
                suggestedMax: 120,
                padding: 20,
                fontColor: "#9e9e9e"
              }
            }],

            xAxes: [{

              gridLines: {
                drawBorder: false,
                color: 'rgba(29,140,248,0.1)',
                zeroLineColor: "transparent",
              },
              ticks: {
                padding: 20,
                fontColor: "#9e9e9e"
              }
            }]
          }
        };
        this.canvas = document.getElementById("CountryChart");
        this.ctx = this.canvas.getContext("2d");
        var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
        gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
        gradientStroke.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors


        var myChart = new Chart(this.ctx, {
          type: 'bar',
          responsive: true,
          legend: {
            display: false
          },
          data: {
            labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
            datasets: [{
              label: "Total booking",
              fill: true,
              backgroundColor: gradientStroke,
              hoverBackgroundColor: gradientStroke,
              borderColor: '#1f8ef1',
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: [this.eventJan + this.venueJan, this.eventFeb + this.venueFeb, this.eventMar + this.venueMar, this.eventApr + this.venueApr, this.eventMay + this.venueMay, this.eventJun + this.venueJun, this.eventJul + this.venueJul, this.eventAug + this.venueAug, this.eventSep + this.venueSep, this.eventOct + this.venueOct, this.eventNov + this.venueNov, this.eventDec + this.venueDec],
            }]
          },
          options: gradientBarChartConfiguration

        });
      });
    });
  }
  public sessionid;
  getCookies() {
    this.sessionid = this.cookieService.get("_gf");
  }
  getSession() {
    this.sessionid = this.sessionSt.retrieve("_UUID");
  }
  venueJan: number = 0;
  venueFeb: number = 0;
  venueMar: number = 0;
  venueApr: number = 0;
  venueMay: number = 0;
  venueJun: number = 0;
  venueJul: number = 0;
  venueAug: number = 0;
  venueSep: number = 0;
  venueOct: number = 0;
  venueNov: number = 0;
  venueDec: number = 0;
  // getbookingvenue(){
  //   this.http.get('http://165.22.50.213:3000/getbookingvenue').subscribe(res => {
  //     this.bookingvenueArr = res['data'];
  //     for (let i = 0; i < this.bookingvenueArr.length; i++) {
  //       var x = this.bookingvenueArr[i].createddate.split('-');
  //       switch (x[1]) {
  //         case '01':
  //           this.venueJan++;
  //           break;
  //         case '02':
  //           this.venueFeb ++;
  //           break;  
  //         case '03':
  //           this.venueMar++;
  //           break;
  //         case '04':
  //           this.venueApr++;
  //           break;
  //         case '05':
  //           this.venueMay++;
  //           break;
  //         case '06':
  //           this.venueJun++;
  //           break;
  //         case '07':
  //           this.venueJul++;
  //           break;
  //         case '08':
  //           this.venueAug++;
  //           break;
  //         case '09':
  //           this.venueSep++;
  //           break;
  //         case '10':
  //           this.venueOct++;
  //           break;
  //         case '11':
  //           this.venueNov++;
  //           break;
  //         default:
  //           this.venueDec++;
  //           break;
  //       }

  //   }
  //   });
  // }
  todaybooking = [];
  todayshopname = [];
  todayDate = "";
  gettodaybookingvenue() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1
    var day = "";
    var month = "";
    var yyyy = today.getFullYear();
    if (dd < 10) {
      day = '0' + dd.toString();
    } else {
      day = dd.toString();
    }
    if (mm < 10) {
      month = '0' + mm.toString();
    } else {
      month = mm.toString();
    }
    var b = 0;
    this.todayDate = yyyy + '-' + month + '-' + day;
    this.http.get('http://165.22.50.213:3000/getbookingvenue').subscribe(res => {
      this.bookingvenueArr = res['data'];
      for (let i = 0; i < this.bookingvenueArr.length; i++) {
        if (this.bookingvenueArr[i].date == this.todayDate) {
          // if(this.bookingvenueArr[i].createddate == '2021-11-28'){
          this.todaybooking[b] = this.bookingvenueArr[i];
          this.todayshopname[b] = this.bookingvenueArr[i].name
          // this.http.get('http://165.22.50.213:3000/gettodayoutlet/'+this.bookingvenueArr[i].outletid).subscribe(res => {
          //   this.todayshopname[b] = res['data'][0].shopname;
          // });
          // console.log('out',this.todayshopname)
          b++;
        }

      }
      this.dtTrigger.next(void 0);
    });
  }
  counter(i: number) {
    return new Array(i);
  }
  getRedemp() {
    this.http.get('http://165.22.50.213:3000/getpointsredeem').subscribe(res => {
      this.redempArr = res['data'];
      for (var i = 0; i < this.redempArr.length; i++) {
        this.total1 += parseFloat(this.redempArr[i].points);
      }
    });
  }
  checkcancel(status) {
    if (status == 'Cancelled') {
      return true;
    } else {
      return false
    }
  }
  checksuccess(status) {
    if (status == 'Booked') {
      return true;
    } else {
      return false
    }
  }
  public updateOptions() {
    this.myChartData.data.datasets[0].data = this.data;
    this.myChartData.update();
  }
}
