import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Label, Colors } from 'ng2-charts';
import * as $ from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  public canvas : any;
  datasets : any;
  public data : any;
  bookingeventArr = [];
  payArr = [];
  total1: number =0;
  totalbooking: number =0;
  totalpay: number =0;
  outletid: any;
  totalArr = [];
  eventArr = [];
  barChartData =[] as any;
  public pointsgiven:any={
    
    memberid:'',
    pointsget: '',
    merchantid:'',
    createddate:'',
    productname:'',
    membername:'',
    type:'',
    price:'',
    subtotal:'',
    pointsused:'',
    outletid:'',
    voucherid:''
     };
     public pointsgivenArray:any = [];

     public bookingevent:any={
    
      firstname:'',
      lastname: '',
      merchantid:'',
      phonenumber:'',
      _value:'',
      eventid:'',
      eventname:'',
      sdate:'',
      edate:'',
      eventhost:'',
      outletid:'',
      stime:'',
      etime:'',
      status:'',
      total:'',
      createddate:'',
       };



       backnav() {
        this.router.navigate(['/home'])
       }
      


  max: number = 0;
  min: number = 0;


  payJan: number =0;
  payFeb: number =0;
  payMar: number =0;
  payApr: number =0;
  payMay: number =0;
  payJun: number =0;
  payJul: number =0;
  payAug: number =0;
  paySep: number =0;
  payOct: number =0;
  payNov: number =0;
  payDec: number =0;

  getpayspending(){

    var moutlet =JSON.parse(localStorage.getItem('Moutlet') !);
    this.pointsgiven.outletid = moutlet._id
    console.log(this.pointsgiven.outletid)

    this.http.post('http://165.22.50.213:3001/getpointsgivens', this.pointsgiven).subscribe((res:any) => {
      this.payArr = res['data'];
      console.log(this.payArr)
      for (let i = 0; i < this.payArr.length; i++) {
        var month = ''+this.payArr[i]['createddate']+'';
        var x = month.split('-');
        console.log(x[1])
        switch (x[1]) {
          case '01':
            this.payJan += parseInt(this.payArr[i]['subtotal']);
            break;
          case '02':
            this.payFeb += parseInt(this.payArr[i]['subtotal']);
            break;  
          case '03':
            this.payMar += parseInt(this.payArr[i]['subtotal']);
            break;
          case '04':
            this.payApr += parseInt(this.payArr[i]['subtotal']);
            break;
          case '05':
            this.payMay += parseInt(this.payArr[i]['subtotal']);
            break;
          case '06':
            this.payJun += parseInt(this.payArr[i]['subtotal']);
            break;
          case '07':
            this.payJul += parseInt(this.payArr[i]['subtotal']);
            break;
          case '08':
            this.payAug += parseInt(this.payArr[i]['subtotal']);
            break;
          case '09':
            this.paySep += parseInt(this.payArr[i]['subtotal']);
            break;
          case '10':
            this.payOct += parseInt(this.payArr[i]['subtotal']);
            break;
          case '11':
            this.payNov += parseInt(this.payArr[i]['subtotal']);
            break;
          default:
            this.payDec += parseInt(this.payArr[i]['subtotal']);
            break;
        }


        this.barChartData = [
          { data: [this.payJan+ this.eventJan, this.payFeb+ this.eventFeb, this.payMar+ this.eventMar, this.payApr+ this.eventApr, this.payMay+ this.eventMay, this.payJun+ this.eventJun, this.payJul+ this.eventJul, this.payAug+ this.eventAug, this.paySep+ this.eventSep, this.payOct+ this.eventOct, this.payNov+ this.eventNov, this.payDec+ this.eventDec], }
        ];

        console.log(999)
        console.log(this.barChartData)
        console.log(this.barChartData[0]['data'].length)

        for (let i = 0; i < this.barChartData[0]['data'].length; i++) {
          if (this.barChartData[0]['data'][i] > this.max) {
            this.max = this.barChartData[0]['data'][i];
          }

          if (this.barChartData[0]['data'][i] < this.min) {
            this.min = this.barChartData[0]['data'][i];
          }
        } 
        console.log("max here")
        console.log(this.max);
        console.log("min here")
        console.log(this.min);

  }
    });
  }

  eventJan: number =0;
  eventFeb: number =0;
  eventMar: number =0;
  eventApr: number =0;
  eventMay: number =0;
  eventJun: number =0;
  eventJul: number =0;
  eventAug: number =0;
  eventSep: number =0;
  eventOct: number =0;
  eventNov: number =0;
  eventDec: number =0;

  getbookingspending(){
    var moutlet =JSON.parse(localStorage.getItem('Moutlet') !);
    this.bookingevent.outletid = moutlet._id
    this.http.get('http://165.22.50.213:3001/getbookingevents').subscribe((res:any) => {
      this.bookingeventArr = res['data'];
      for (let i = 0; i < this.bookingeventArr.length; i++) {
        if(this.bookingeventArr[i]['outletid'] === moutlet._id){
        var month = ''+this.bookingeventArr[i]['createddate']+'';
        var x = month.split('-');
        console.log(x[1])
        switch (x[1]) {
          case '01':
            this.eventJan += parseInt(this.bookingeventArr[i]['total']);
            break;
          case '02':
            this.eventFeb += parseInt(this.bookingeventArr[i]['total']);
            break;  
          case '03':
            this.eventMar += parseInt(this.bookingeventArr[i]['total']);
            break;
          case '04':
            this.eventApr += parseInt(this.bookingeventArr[i]['total']);
            break;
          case '05':
            this.eventMay += parseInt(this.bookingeventArr[i]['total']);
            break;
          case '06':
            this.eventJun += parseInt(this.bookingeventArr[i]['total']);
            break;
          case '07':
            this.eventJul += parseInt(this.bookingeventArr[i]['total']);
            break;
          case '08':
            this.eventAug += parseInt(this.bookingeventArr[i]['total']);
            break;
          case '09':
            this.eventSep += parseInt(this.bookingeventArr[i]['total']);
            break;
          case '10':
            this.eventOct += parseInt(this.bookingeventArr[i]['total']);
            break;
          case '11':
            this.eventNov += parseInt(this.bookingeventArr[i]['total']);
            break;
          default:
            this.eventDec += parseInt(this.bookingeventArr[i]['total']);
            break;
        }

        
        this.barChartData = [
          { data: [this.payJan+ this.eventJan, this.payFeb+ this.eventFeb, this.payMar+ this.eventMar, this.payApr+ this.eventApr, this.payMay+ this.eventMay, this.payJun+ this.eventJun, this.payJul+ this.eventJul, this.payAug+ this.eventAug, this.paySep+ this.eventSep, this.payOct+ this.eventOct, this.payNov+ this.eventNov, this.payDec+ this.eventDec], }
        ];

        console.log(999)
        console.log(this.barChartData)
        console.log(this.barChartData[0]['data'].length)
        for (let i = 0; i < this.barChartData[0]['data'].length; i++) {
          if (this.barChartData[0]['data'][i] > this.max) {
            this.max = this.barChartData[0]['data'][i];
          }
          if (this.barChartData[0]['data'][i] < this.min) {
            this.min = this.barChartData[0]['data'][i];
          }
        } 
        console.log("max here")
        console.log(this.max);
        console.log("min here")
        console.log(this.min);

    }
  }
    });
  }

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
  
  barChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sept','Oct','Nov','Dec'];
  
  barChartColors: Colors[] = [
    { 
      backgroundColor: '#dec074'
    }, 
  ];
  barChartType: ChartType = 'bar';
  barChartLegend = false;
  barChartPlugins = [];

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const footerhide:any = document.getElementsByTagName('app-footerinfo')[0];
    footerhide.remove()
    this.gettotalbookingspending();
    this.gettotalpayspending();
    this.getpayspending();
    this.getbookingspending();
    
    var moutlet =JSON.parse(localStorage.getItem('Moutlet') !);
    moutlet._id
    var mlogin =JSON.parse(localStorage.getItem('Mlogin') !);
  }

  gettotalbookingspending(){
    var moutlet =JSON.parse(localStorage.getItem('Moutlet') !);
    this.bookingevent.outletid = moutlet._id
    this.http.get('http://165.22.50.213:3001/getbookingevents').subscribe((res:any) => {
      this.bookingeventArr = res['data'];
      for (let i = 0; i < this.bookingeventArr.length; i++) {
        if(this.bookingeventArr[i]['outletid']===moutlet._id){
        this.totalbooking += parseInt(this.bookingeventArr[i]['total']);
        }
      }
      console.log('RM',this.totalbooking)
    });
  }

  gettotalpayspending(){
    
    var moutlet =JSON.parse(localStorage.getItem('Moutlet') !);
    this.pointsgiven.outletid = moutlet._id
    this.http.post('http://165.22.50.213:3001/getpointsgivens', this.pointsgiven).subscribe((res:any) => {
      this.payArr = res['data'];
      for (let i = 0; i < this.payArr.length; i++) {
        if(this.payArr[i]['outletid'] === moutlet._id){
        this.totalpay += parseInt(this.payArr[i]['subtotal']);
      }
    }
      console.log('RM',this.totalpay)
    });
  }
  

}