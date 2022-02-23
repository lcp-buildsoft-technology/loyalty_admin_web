import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Thumbs } from 'swiper';
import * as $ from 'jquery';
import { MatCalendarCellClassFunction, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { CalendarOptions } from '@fullcalendar/angular';
import { ActivatedRoute, Router } from '@angular/router';
declare var angular:any;

@Component({
  selector: 'app-bookinghistory',
  templateUrl: './bookinghistory.component.html',
  styleUrls: ['./bookinghistory.component.scss']
})
export class BookinghistoryComponent implements OnInit {
  selected!: Date | null;
  message: any;
  todayDate = ""; 
  public id:any

  onbookingvenueArr = [];
  upbookingvenueArr = [];
  hisbookingvenueArr = [];
  bookingvenueArr = [];

  onbookingeventArr = [];  
  upbookingeventArr = [];  
  hisbookingeventArr = [];  
  bookingeventArr = [];

  public srch = [];
  public booking:any =[];

  public bookingvenue = {
    _id:'',
    firstname: '',
    lastname: '',
    phonenumber:'',
    _value: '',
    date:'',
    time:'',
    outletid:'',
    status:'',
    shopname:'',
    createddate:'',
    merchantid:'',
  }

  public onbookingvenue = {
    _id:'',
    firstname: '',
    lastname: '',
    phonenumber:'',
    _value: '',
    date:'',
    time:'',
    outletid:'',
    status:'',
    shopname:'',
    createddate:'',
    merchantid:''
  }

  public upbookingvenue = {
    _id:'',
    firstname: '',
    lastname: '',
    phonenumber:'',
    _value: '',
    date:'',
    time:'',
    outletid:'',
    status:'',
    shopname:'',
    createddate:'',
    merchantid:''
  }

  public hisbookingvenue = {
    _id:'',
    firstname: '',
    lastname: '',
    phonenumber:'',
    _value: '',
    date:'',
    time:'',
    outletid:'',
    status:'',
    shopname:'',
    createddate:'',
    merchantid:''
  }

  public bookingevent = {
    _id:'',
    firstname: '',
    lastname: '',
    phonenumber:'',
    _value:'',
    eventid:'',
    eventname:'',
    eventhost:'',
    sdate:'',
    edate:'',
    stime:'',
    etime:'',
    status:'',
    createddate:'',
    merchantid:'',
    total:'',
    outletid:''
  }  

  public onbookingevent = {
    _id:'',
    firstname: '',
    lastname: '',
    phonenumber:'',
    _value:'',
    eventid:'',
    eventname:'',
    eventhost:'',
    sdate:'',
    edate:'',
    stime:'',
    etime:'',
    status:'',
    createddate:'',
    total:'',
    outletid:''
  }

  public upbookingevent = {
    _id:'',
    firstname: '',
    lastname: '',
    phonenumber:'',
    _value:'',
    eventid:'',
    eventname:'',
    eventhost:'',
    sdate:'',
    edate:'',
    stime:'',
    etime:'',
    status:'',
    createddate:'',
    total:'',
    outletid:''
  }

  public hisbookingevent = {
    _id:'',
    firstname: '',
    lastname: '',
    phonenumber:'',
    _value:'',
    eventid:'',
    eventname:'',
    eventhost:'',
    sdate:'',
    edate:'',
    stime:'',
    etime:'',
    status:'',
    createddate:'',
    total:'',
    outletid:''
  }
  selectedDate: any;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    editable: true,
    selectable: true,
    businessHours: true,
    dayMaxEvents: true, 
    events: []// allow "more" link when too many events    
  };

  constructor(private http: HttpClient, private router:Router, private route:ActivatedRoute) {
    this.srch = [...this.bookingvenueArr];
    this.srch = [...this.bookingeventArr];
   }

  ngOnInit(): void {
    this.getBookingvenue();
    this.getBookingevent();
        
    this.getRegister();
    
    var url= document.URL;
    const myArray = url.split("=");
    this.id = myArray[1];

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
    this.todayDate = yyyy + '-' + month + '-' + day;
  }

  getBookingvenue() {
    this.http.get('http://165.22.50.213:3001/getbookingvenue').subscribe((res:any)=> {
      this.bookingvenueArr = res['data'];

      var today = new Date();
      var booked = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

      for(var i=0; i < this.bookingvenueArr.length; i++){
        if(this.bookingvenueArr[i]['memberid'] == this.id){
          if(this.bookingvenueArr[i]['date'] === this.todayDate) {
          this.onbookingvenueArr.push(this.bookingvenueArr[i]);
          
          }
          else if(this.bookingvenueArr[i]['date'] > this.todayDate){
            this.upbookingvenueArr.push(this.bookingvenueArr[i]);
          }
          else{
            this.hisbookingvenueArr.push(this.bookingvenueArr[i]);
          }
          var json = {
            title: this.bookingvenueArr[i]['shopname'],
            start: this.bookingvenueArr[i]['date']
          }
          if((this.bookingvenueArr[i]['date'] >= this.todayDate))
          {
            if(this.bookingvenueArr[i]['status'] === 'Booked')
            {
              if(this.bookingvenueArr[i]['date'] >= this.todayDate)
              {
              this.booking.push(json)
              }              
            }    
          } 
          
        }              
      }
    });
  }

  getBookingevent() {
    this.http.get('http://165.22.50.213:3001/getbookingevent').subscribe((res:any)=> {
      this.bookingeventArr = res['data'];

      var today = new Date();
      var booked = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

      for(var i=0; i < this.bookingeventArr.length; i++){
        if(this.bookingeventArr[i]['memberid'] == this.id)
        {
          if((this.bookingeventArr[i]['sdate'] <= this.todayDate) && (this.bookingeventArr[i]['edate'] < this.todayDate)) {
          this.hisbookingeventArr.push(this.bookingeventArr[i]);
          }
          else if((this.bookingeventArr[i]['edate'] >= this.todayDate) && (this.bookingeventArr[i]['sdate'] <= this.todayDate)) {
            this.onbookingeventArr.push(this.bookingeventArr[i]);
          }
          else if(this.bookingeventArr[i]['sdate'] > this.todayDate) {
            this.upbookingeventArr.push(this.bookingeventArr[i]);
          }
          var json = {
            title: this.bookingeventArr[i]['eventname'],
            start: this.bookingeventArr[i]['sdate'],
            end: this.bookingeventArr[i]['edate']            
          }
          if((this.bookingeventArr[i]['sdate'] >= this.todayDate) || (this.bookingeventArr[i]['edate'] >= this.todayDate))
          {
            this.booking.push(json) 
          }                    
        }                     
      }
      this.calendar(this.booking)
    });
  }

  calendar(booking:any){
    this.calendarOptions['events'] = this.booking;
  }

  detail(bookingvenue:any){
    if(bookingvenue.status == "Booked") {
      const vhurl = "/bookinghistorydetails?id=" + bookingvenue._id;
      console.log(vhurl)
      this.router.navigateByUrl(vhurl)
    } 
    else {
      const vcdurl = "/venuecanceldetails?id=" + bookingvenue._id;
      console.log(vcdurl)
      this.router.navigateByUrl(vcdurl)  
    }    
  }
  
  info(bookingevent:any){
    const ehurl = "/bookingeventhistorydetails?id=" + bookingevent._id;
    console.log(ehurl)
    this.router.navigateByUrl(ehurl)
  }  

  onSelect(event:any){
    this.selectedDate= event;
  }

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      if (date.getDate() === 1) {
        return 'special-date';
      } else {
        return '';
      }
    };
  }

  lol = [];
  public currentmemberid: any;
  registerArr = [];

  getRegister()
  {
    this.http.get('http://165.22.50.213:3001/getregister').subscribe((res:any) => 
    {
      this.lol = res['data'];
      var memberid = JSON.parse(localStorage.getItem('Memberlogin')!);
      this.currentmemberid = memberid[0]._id
      for (let i = 0; i < this.lol.length; i++) {
        if (this.currentmemberid == this.lol[i]['_id']) {
          this.registerArr[0] = this.lol[i];
        }
      }
    });
  }

  acc(){    
    const purl = "/profile?id=" + this.registerArr[0]['_id'];
    console.log(purl)
    this.router.navigateByUrl(purl)
  }
}
