import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Buffer } from 'buffer';
import { Compiler } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

declare var angular:any;

@Component({
  selector: 'app-eventmanagement',
  templateUrl: './eventmanagement.component.html',
  styleUrls: ['./eventmanagement.component.scss']
})

export class EventmanagementComponent implements OnInit {
  searchInput : string ='';
  eventArr=[];
  eventpicArr=[];
  eventlistArr=[]
  eventpicpushArr: string[] = [];
  allvenueArr=[];
  secvenueArr=[];
  hiseventArr: string[] = [];
  upeventArr: string[] = [];
  todayeventArr: string[] = [];
  upvenueArr=[];
  elength: any;
  eimagelength: any;

  backnav() {
    this.router.navigate[('/home')]
  }

  public srch =[];
  todayDate="";
  constructor(private modalService: NgbModal, private http: HttpClient,private _compiler: Compiler, private form: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.srch = [...this.eventArr];
  }

  public event:any={
    firstname:'',
    lastname:'',
    phonenumber:'',
    _value:'',
    eventid:'',
    eventname:'',
    sdate:'',
    edate:'',
    eventhost:'',
    stime:'',
    etime:'',
    status:'',
    createddate:'',
    total:'',
    merchantid:'',
    receipt:'',
    memberid:'',
    arrv:'',
    outletid:''
  };

  public eventlist:any={
    _id:'',
    eventname:'',
    eventhost:'',
    sdate:'',
    edate:'',
    stime:'',
    etime:'',
    amount:'',
    location:'',
    description:'',
    contact:'',
    email:'',
    whatsapp:'',
    thumbnail:'',
    thumbnailType:''
  };

  public eventval:any={
    _id:''
  };
       
  public showevent:any={
    firstname:'',
    lastname:'',
    phonenumber:'',
    _value:'',
    eventid:'',
    eventname:'',
    sdate:'',
    edate:'',
    eventhost:'',
    stime:'',
    etime:'',
    status:'',
    createddate:'',
    total:'',
    merchantid:'',
    receipt:'',
    memberid:'',
    arrv:'',
    outletid:'',
    thumbnail: '',
    thumbnailType: '',   
  };

  public onevent:any={
    firstname:'',
    lastname:'',
    phonenumber:'',
    _value:'',
    eventid:'',
    eventname:'',
    sdate:'',
    edate:'',
    eventhost:'',
    stime:'',
    etime:'',
    status:'',
    createddate:'',
    total:'',
    merchantid:'',
    receipt:'',
    memberid:'',
    arrv:'',
  };

  public hisevent:any={
    firstname:'',
    lastname:'',
    phonenumber:'',
    _value:'',
    eventid:'',
    eventname:'',
    sdate:'',
    edate:'',
    eventhost:'',
    stime:'',
    etime:'',
    status:'',
    createddate:'',
    total:'',
    merchantid:'',
    receipt:'',
    memberid:'',
    arrv:'', 
  };

  public upevent:any={
    firstname:'',
    lastname:'',
    phonenumber:'',
    _value:'',
    eventid:'',
    eventname:'',
    sdate:'',
    edate:'',
    eventhost:'',
    stime:'',
    etime:'',
    status:'',
    createddate:'',
    total:'',
    merchantid:'',
    receipt:'',
    memberid:'',
    arrv:'',        
  };

  public  id:any; 
  public cal:any

  ngOnInit(): void {
   var moutlet =JSON.parse(localStorage.getItem('Moutlet') !);
   this.getVenue(moutlet);       
  }

  ShowHideDiv(){ 
  }

  Check(id : any){
  }

  getVenue(moutlet:any) {
    this.event.outletid = moutlet._id
    console.log(moutlet._id)

    this.http.post('http://165.22.50.213:3001/geteventbooking',this.event).subscribe((res:any) => {   
      console.log(res['data'])
      console.log(res['data1'])
      this.eventArr = res['data'] ;
      this.eventlistArr = res['data1']
      this.elength =res['data'].length
      this.eimagelength = res['data1'].length

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

      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      for(var i=0;i<this.elength; i++){
        for(var m=0;m<this.eimagelength; m++){
          this.showevent ={
            firstname:'',
            lastname:'',
            phonenumber:'',
            _value:'',
            eventid:'',
            eventname:'',
            sdate:'',
            edate:'',
            eventhost:'',
            stime:'',
            etime:'',
            status:'',
            createddate:'',
            total:'',
            merchantid:'',
            receipt:'',
            memberid:'',
            arrv:'',
            outletid:'',
            thumbnail: '',
            thumbnailType: '',
            _id:''
          };
          this.showevent._id = this.eventArr[i]['_id']
          this.showevent.firstname = this.eventArr[i]['firstname']
          this.showevent.lastname = this.eventArr[i]['lastname']
          this.showevent.createddate = this.eventArr[i]['createddate']
          this.showevent.eventname = this.eventArr[i]['eventname']
          this.showevent.phonenumber = this.eventArr[i]['phonenumber']
          this.showevent._value = this.eventArr[i]['_value']
          console.log(this.showevent)

          if (this.eventArr[i]['eventid'] == this.eventlistArr[m]['_id']) {
            console.log(this.eventlistArr[m]['_id']);
            console.log(this.eventArr[i]['eventid']);

            this.showevent.thumbnail = new Buffer(
              res['data1'][m]['thumbnail']['data']
            ).toString('base64');
            
            this.showevent.thumbnailType =
              res['data1'][m]['thumbnail']['contentType'];
              if (res['data'][i]['createddate'] < this.todayDate) {
                console.log(date)
                this.hiseventArr.push(this.showevent);
              } 
              if (res['data'][i]['createddate'] > this.todayDate) {
                console.log(res['data'][i]['createddate'])
                this.upeventArr.push(this.showevent);
              }
              if (res['data'][i]['createddate'] == this.todayDate) {
                console.log(res['data'][i]['createddate'])
                this.todayeventArr.push(this.showevent);
              }
          }
        }
      }
      console.log(this.upeventArr)
      console.log(this.hiseventArr)
      console.log(this.todayeventArr)
      $(".show").prop('checked')
              
    });
  }
         
  Detail(id:any){
   console.log(id)
   const ebd = "/eventbookingdetail?id=" + id;
   console.log(ebd)
   this.router.navigateByUrl(ebd)
  }

  clickcancel(){
  }
   
        
}
        
