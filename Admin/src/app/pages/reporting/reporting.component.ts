import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
@Component({
  selector: 'app-reporting',
  templateUrl: 'reporting.component.html',
  styleUrls: ['reporting.component.css']
})
export class ReportingComponent implements OnInit {
  public canvas: any;
  public ctx;
  public datasets: any;
  public data: any;
  public myChartData;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public clicked2: boolean = false;
  public membercount: number = 0;
  public vouchercount: number = 0;
  voucherredeemArr = [];
  vouchercreateArr = [];
  bookingeventArr = [];
  payArr = [];
  redempArr = [];
  total1: number = 0;
  totalbooking: number = 0;
  totalpay: number = 0;
  constructor(private http: HttpClient, private sessionSt: SessionStorageService) { }

  ngOnInit() {
    $(window).scrollTop(0);
    this.getmembercount();
    this.getvouchercount();
    this.getRedemp();
    this.gettotalRedemp();
    this.getVoucherRedeem();
    this.getVchCreated();
    this.gettotalbookingspending();
    this.gettotalpayspending();
    // this.getpayspending();
    this.getbookingspending();
    this.getSession();
    $('#loader').show();
    $('body').css("overflow-y", "hidden");
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
    //         suggestedMin: 10,
    //         suggestedMax: 100,
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

    // var gradientChartOptionsConfigurationWithTooltipGreen: any = {
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
    //         fontColor: "#9e9e9e"
    //       }
    //     }],

    //     xAxes: [{
    //       barPercentage: 1.6,
    //       gridLines: {
    //         drawBorder: false,
    //         color: 'rgba(0,242,195,0.1)',
    //         zeroLineColor: "transparent",
    //       },
    //       ticks: {
    //         padding: 20,
    //         fontColor: "#9e9e9e"
    //       }
    //     }]
    //   }
    // };


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
    setTimeout(() => {


      //=======================================Voucher Redeemed================================================================
      // this.canvas = document.getElementById("chartLineRed1");
      // this.ctx = this.canvas.getContext("2d");

      // var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

      // gradientStroke.addColorStop(1, 'rgba(233,32,16,0.2)');
      // gradientStroke.addColorStop(0.4, 'rgba(233,32,16,0.0)');
      // gradientStroke.addColorStop(0, 'rgba(233,32,16,0)'); //red colors

      // var data = {
      //   labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
      //   datasets: [{
      //     label: "Data",
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
      //     data: [this.voucherJan, this.voucherFeb, this.voucherMar, this.voucherApr, this.voucherMay, this.voucherJun, this.voucherJul, this.voucherAug, this.voucherSep, this.voucherOct, this.voucherNov, this.voucherDec],
      //   }]
      // };
      // var myChart = new Chart(this.ctx, {
      //   type: 'line',
      //   data: data,
      //   options: gradientChartOptionsConfigurationWithTooltipOrange
      // });
      //==========================================Points Redeemed===============================================================

      // this.canvas = document.getElementById("chartLineGreen1");
      // this.ctx = this.canvas.getContext("2d");


      // var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

      // gradientStroke.addColorStop(1, 'rgba(66,134,121,0.15)');
      // gradientStroke.addColorStop(0.4, 'rgba(66,134,121,0.0)'); //green colors
      // gradientStroke.addColorStop(0, 'rgba(66,134,121,0)'); //green colors

      // var data = {
      //   labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
      //   datasets: [{
      //     label: "My First dataset",
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
      //     data: [this.redempJan, this.redempFeb, this.redempMar, this.redempApr, this.redempMay, this.redempJun, this.redempJul, this.redempAug, this.redempSep, this.redempOct, this.redempNov, this.redempDec],
      //   }]
      // };

      // var myChart = new Chart(this.ctx, {
      //   type: 'line',
      //   data: data,
      //   options: gradientChartOptionsConfigurationWithTooltipGreen

      // });


      //===========================================Total Spending===============================================================
      // var chart_labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      // this.datasets = [
      //   [this.payJan+ this.eventJan, this.payFeb+ this.eventFeb, this.payMar+ this.eventMar, this.payApr+ this.eventApr, this.payMay+ this.eventMay, this.payJun+ this.eventJun, this.payJul+ this.eventJul, this.payAug+ this.eventAug, this.paySep+ this.eventSep, this.payOct+ this.eventOct, this.payNov+ this.eventNov, this.payDec+ this.eventDec],
      //   [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
      //   [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130]
      // ];
      // this.data = this.datasets[0];



      // this.canvas = document.getElementById("chartBig2");
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
      //       label: "My First dataset",
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
      //=============================================Voucher Created=============================================================

      // this.canvas = document.getElementById("CountryChart1");
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
      //       label: "data",
      //       fill: true,
      //       backgroundColor: gradientStroke,
      //       hoverBackgroundColor: gradientStroke,
      //       borderColor: '#1f8ef1',
      //       borderWidth: 2,
      //       borderDash: [],
      //       borderDashOffset: 0.0,
      //       data: [this.voucherCJan, this.voucherCFeb, this.voucherCMar, this.voucherCApr, this.voucherCMay, this.voucherCJun, this.voucherCJul, this.voucherCAug, this.voucherCSep, this.voucherCOct, this.voucherCNov, this.voucherCDec],
      //     }]
      //   },
      //   options: gradientBarChartConfiguration
      // });
    }, 2000);
  }
  //====================================================================================================================
  public sessionid;
  getSession() {
    this.sessionid = this.sessionSt.retrieve("_UUID");
    this.adminid = this.sessionid;
    this.findrole();
  }

  getmembercount() {
    this.http.get('http://165.22.50.213:3000/getmembercount').subscribe(res => {
      this.membercount = res['data'];
    });
  }
  getvouchercount() {
    this.http.get('http://165.22.50.213:3000/getcountuservoucher').subscribe(res => {
      this.vouchercount = res['data'];
    });
  }
  gettotalbookingspending() {
    this.http.get('http://165.22.50.213:3000/getbookingevent').subscribe(res => {
      this.bookingeventArr = res['data'];
      for (let i = 0; i < this.bookingeventArr.length; i++) {
        this.totalbooking += parseFloat(this.bookingeventArr[i].total);

      }
    });
  }
  gettotalpayspending() {
    this.http.get('http://165.22.50.213:3000/getpointsgiven').subscribe(res => {
      this.payArr = res['data'];
      for (let i = 0; i < this.payArr.length; i++) {
        this.totalpay += parseFloat(this.payArr[i].subtotal);
      }
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
  getbookingspending() {
    this.http.get('http://165.22.50.213:3000/getbookingevent').subscribe(res => {
      this.bookingeventArr = res['data'];
      for (let i = 0; i < this.bookingeventArr.length; i++) {
        var x = this.bookingeventArr[i].createddate.split('-');
        switch (x[1]) {
          case '01':
            this.eventJan += parseInt(this.bookingeventArr[i].total);
            break;
          case '02':
            this.eventFeb += parseInt(this.bookingeventArr[i].total);
            break;
          case '03':
            this.eventMar += parseInt(this.bookingeventArr[i].total);
            break;
          case '04':
            this.eventApr += parseInt(this.bookingeventArr[i].total);
            break;
          case '05':
            this.eventMay += parseInt(this.bookingeventArr[i].total);
            break;
          case '06':
            this.eventJun += parseInt(this.bookingeventArr[i].total);
            break;
          case '07':
            this.eventJul += parseInt(this.bookingeventArr[i].total);
            break;
          case '08':
            this.eventAug += parseInt(this.bookingeventArr[i].total);
            break;
          case '09':
            this.eventSep += parseInt(this.bookingeventArr[i].total);
            break;
          case '10':
            this.eventOct += parseInt(this.bookingeventArr[i].total);
            break;
          case '11':
            this.eventNov += parseInt(this.bookingeventArr[i].total);
            break;
          default:
            this.eventDec += parseInt(this.bookingeventArr[i].total);
            break;
        }

      }
      this.http.get('http://165.22.50.213:3000/getpointsgiven').subscribe(res => {
        this.payArr = res['data'];
        for (let i = 0; i < this.payArr.length; i++) {
          var x = this.payArr[i].createddate.split('-');
          switch (x[1]) {
            case '01':
              this.payJan += parseFloat(this.payArr[i].subtotal);
              break;
            case '02':
              this.payFeb += parseFloat(this.payArr[i].subtotal);
              break;
            case '03':
              this.payMar += parseFloat(this.payArr[i].subtotal);
              break;
            case '04':
              this.payApr += parseFloat(this.payArr[i].subtotal);
              break;
            case '05':
              this.payMay += parseFloat(this.payArr[i].subtotal);
              break;
            case '06':
              this.payJun += parseFloat(this.payArr[i].subtotal);
              break;
            case '07':
              this.payJul += parseFloat(this.payArr[i].subtotal);
              break;
            case '08':
              this.payAug += parseFloat(this.payArr[i].subtotal);
              break;
            case '09':
              this.paySep += parseFloat(this.payArr[i].subtotal);
              break;
            case '10':
              this.payOct += parseFloat(this.payArr[i].subtotal);
              break;
            case '11':
              this.payNov += parseFloat(this.payArr[i].subtotal);
              break;
            default:
              this.payDec += parseFloat(this.payArr[i].subtotal);
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
          [this.payJan + this.eventJan, this.payFeb + this.eventFeb, this.payMar + this.eventMar, this.payApr + this.eventApr, this.payMay + this.eventMay, this.payJun + this.eventJun, this.payJul + this.eventJul, this.payAug + this.eventAug, this.paySep + this.eventSep, this.payOct + this.eventOct, this.payNov + this.eventNov, this.payDec + this.eventDec],
          [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
          [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130]
        ];
        this.data = this.datasets[0];



        this.canvas = document.getElementById("chartBig2");
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
              label: "Total Spending",
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
    });
  }
  payJan: number = 0;
  payFeb: number = 0;
  payMar: number = 0;
  payApr: number = 0;
  payMay: number = 0;
  payJun: number = 0;
  payJul: number = 0;
  payAug: number = 0;
  paySep: number = 0;
  payOct: number = 0;
  payNov: number = 0;
  payDec: number = 0;
  // getpayspending(){
  //   this.http.get('http://165.22.50.213:3000/getpointsgiven').subscribe(res => {
  //     this.payArr = res['data'];
  //     for (let i = 0; i < this.payArr.length; i++) {
  //       var x = this.payArr[i].createddate.split('-');
  //       switch (x[1]) {
  //         case '01':
  //           this.payJan += parseInt(this.payArr[i].subtotal);
  //           break;
  //         case '02':
  //           this.payFeb += parseInt(this.payArr[i].subtotal);
  //           break;  
  //         case '03':
  //           this.payMar += parseInt(this.payArr[i].subtotal);
  //           break;
  //         case '04':
  //           this.payApr += parseInt(this.payArr[i].subtotal);
  //           break;
  //         case '05':
  //           this.payMay += parseInt(this.payArr[i].subtotal);
  //           break;
  //         case '06':
  //           this.payJun += parseInt(this.payArr[i].subtotal);
  //           break;
  //         case '07':
  //           this.payJul += parseInt(this.payArr[i].subtotal);
  //           break;
  //         case '08':
  //           this.payAug += parseInt(this.payArr[i].subtotal);
  //           break;
  //         case '09':
  //           this.paySep += parseInt(this.payArr[i].subtotal);
  //           break;
  //         case '10':
  //           this.payOct += parseInt(this.payArr[i].subtotal);
  //           break;
  //         case '11':
  //           this.payNov += parseInt(this.payArr[i].subtotal);
  //           break;
  //         default:
  //           this.payDec += parseInt(this.payArr[i].subtotal);
  //           break;
  //       }

  //   }
  //   });
  // }

  getRedemp() {
    this.http.get('http://165.22.50.213:3000/getpointsredeem').subscribe(res => {
      this.redempArr = res['data'];
      for (var i = 0; i < this.redempArr.length; i++) {
        this.total1 += parseInt(this.redempArr[i].points);
      }
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
              suggestedMin: 100,
              suggestedMax: 1000,
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
      this.canvas = document.getElementById("chartLineGreen1");
      this.ctx = this.canvas.getContext("2d");


      var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, 'rgba(66,134,121,0.15)');
      gradientStroke.addColorStop(0.4, 'rgba(66,134,121,0.0)'); //green colors
      gradientStroke.addColorStop(0, 'rgba(66,134,121,0)'); //green colors

      var data = {
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        datasets: [{
          label: "Points Redeemed",
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
          data: [this.redempJan, this.redempFeb, this.redempMar, this.redempApr, this.redempMay, this.redempJun, this.redempJul, this.redempAug, this.redempSep, this.redempOct, this.redempNov, this.redempDec],
        }]
      };

      var myChart = new Chart(this.ctx, {
        type: 'line',
        data: data,
        options: gradientChartOptionsConfigurationWithTooltipGreen

      });
    });
  }
  voucherJan: number = 0;
  voucherFeb: number = 0;
  voucherMar: number = 0;
  voucherApr: number = 0;
  voucherMay: number = 0;
  voucherJun: number = 0;
  voucherJul: number = 0;
  voucherAug: number = 0;
  voucherSep: number = 0;
  voucherOct: number = 0;
  voucherNov: number = 0;
  voucherDec: number = 0;

  voucherCJan: number = 0;
  voucherCFeb: number = 0;
  voucherCMar: number = 0;
  voucherCApr: number = 0;
  voucherCMay: number = 0;
  voucherCJun: number = 0;
  voucherCJul: number = 0;
  voucherCAug: number = 0;
  voucherCSep: number = 0;
  voucherCOct: number = 0;
  voucherCNov: number = 0;
  voucherCDec: number = 0;
  getVoucherRedeem() {
    this.http.get('http://165.22.50.213:3000/getvoucherscan').subscribe(res => {
      this.voucherredeemArr = res['data'];
      for (let i = 0; i < this.voucherredeemArr.length; i++) {
        var x = this.voucherredeemArr[i].createddate.split('-');
        switch (x[1]) {
          case '01':
            this.voucherJan++;
            break;
          case '02':
            this.voucherFeb++;
            break;
          case '03':
            this.voucherMar++;
            break;
          case '04':
            this.voucherApr++;
            break;
          case '05':
            this.voucherMay++;
            break;
          case '06':
            this.voucherJun++;
            break;
          case '07':
            this.voucherJul++;
            break;
          case '08':
            this.voucherAug++;
            break;
          case '09':
            this.voucherSep++;
            break;
          case '10':
            this.voucherOct++;
            break;
          case '11':
            this.voucherNov++;
            break;
          default:
            this.voucherDec++;
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
              suggestedMin: 10,
              suggestedMax: 100,
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
      this.canvas = document.getElementById("chartLineRed1");
      this.ctx = this.canvas.getContext("2d");

      var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, 'rgba(233,32,16,0.2)');
      gradientStroke.addColorStop(0.4, 'rgba(233,32,16,0.0)');
      gradientStroke.addColorStop(0, 'rgba(233,32,16,0)'); //red colors

      var data = {
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        datasets: [{
          label: "Voucher Redeemed",
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
          data: [this.voucherJan, this.voucherFeb, this.voucherMar, this.voucherApr, this.voucherMay, this.voucherJun, this.voucherJul, this.voucherAug, this.voucherSep, this.voucherOct, this.voucherNov, this.voucherDec],
        }]
      };
      var myChart = new Chart(this.ctx, {
        type: 'line',
        data: data,
        options: gradientChartOptionsConfigurationWithTooltipOrange
      });
    });
  }
  getVchCreated() {
    this.http.get('http://165.22.50.213:3000/getVch').subscribe(res => {
      this.vouchercreateArr = res['data'];
      for (let i = 0; i < this.vouchercreateArr.length; i++) {
        var x = this.vouchercreateArr[i].sdate.split('-');
        switch (x[1]) {
          case '01':
            this.voucherCJan++;
            break;
          case '02':
            this.voucherCFeb++;
            break;
          case '03':
            this.voucherCMar++;
            break;
          case '04':
            this.voucherCApr++;
            break;
          case '05':
            this.voucherCMay++;
            break;
          case '06':
            this.voucherCJun++;
            break;
          case '07':
            this.voucherCJul++;
            break;
          case '08':
            this.voucherCAug++;
            break;
          case '09':
            this.voucherCSep++;
            break;
          case '10':
            this.voucherCOct++;
            break;
          case '11':
            this.voucherCNov++;
            break;
          default:
            this.voucherCDec++;
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
      this.canvas = document.getElementById("CountryChart1");
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
            label: "Voucher Created",
            fill: true,
            backgroundColor: gradientStroke,
            hoverBackgroundColor: gradientStroke,
            borderColor: '#1f8ef1',
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: [this.voucherCJan, this.voucherCFeb, this.voucherCMar, this.voucherCApr, this.voucherCMay, this.voucherCJun, this.voucherCJul, this.voucherCAug, this.voucherCSep, this.voucherCOct, this.voucherCNov, this.voucherCDec],
          }]
        },
        options: gradientBarChartConfiguration
      });
      $('#loader').hide();
      $('#loader-wrapper').hide();
      $('#loader-inner').hide();
      $('body').css("overflow-y", "visible");
    });
  }

  public updateOptions() {
    this.myChartData.data.datasets[0].data = this.data;
    this.myChartData.update();
  }
  public adminid;
  public adminrole;
  findrole() {
    this.http.get('http://165.22.50.213:3000/getaadminuser/' + this.adminid).subscribe(res => {
      this.adminrole = res['data'][0].reporting;
      var x = this.adminrole.split('-');
      if (x[0] == '1') {//view
        $("[name='viewclass']").show();
      }
      if (x[1] == '1') {//edit
        $("[name='editclass']").show();
      }
      if (x[2] == '1') {//add
        $("[name='addclass']").show();
      }
      if (x[3] == '1') {//delete
        $("[name='deletclass']").show();
      }
      if (x[4] == '1') {//export
        $("[name='exportclass']").show();
      }

    });

  }
}
