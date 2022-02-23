import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Buffer } from 'buffer';
import * as $ from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bookingeventhome',
  templateUrl: './bookingeventhome.component.html',
  styleUrls: ['./bookingeventhome.component.scss']
})
export class BookingeventhomeComponent implements OnInit {
  message: any;  
  searchEvent: string = ''; 
  todayDate = "";
  public srch =[];

  eventArr = [];
  oneventArr:any[] = [];  

  image1arr:any;
  imagetypeArr:any;
  imagesArr :any;
 
  public event = {
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
    termsandcondition:'',
    merchantid:'',
    outletid:'',
    thumbnailType:'',
    slot:''
  }

  public onevent:any = {
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
    termsandcondition:'',
    merchantid:'',
    outletid:'',
    thumbnailType:'',
    slot:''
  }

  constructor(private http: HttpClient, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getEvent();
    this.getRegister();

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

  getEvent()
  {
    this.http.get('http://165.22.50.213:3001/gethevent').subscribe((res:any) => 
    {
      this.eventArr = res['data'];

      for(var i=0; i<this.eventArr.length; i++)
      {

        if(this.eventArr[i]['sdate'] > this.todayDate)
        {
          if(this.eventArr[i]['slot'] > 0)
          {
            this.onevent =
            {
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
              thumbnailType:'',
              termsandcondition:'',
              merchantid:'',
              outletid:''
            };
            this.onevent._id = this.eventArr[i]['_id']
            this.onevent.eventname = this.eventArr[i]['eventname']
            this.onevent.eventhost = this.eventArr[i]['eventhost']
            this.onevent.sdate = this.eventArr[i]['sdate']
            this.onevent.edate = this.eventArr[i]['edate']
            this.onevent.stime = this.eventArr[i]['stime']
            this.onevent.etime = this.eventArr[i]['etime']
            this.onevent.amount = this.eventArr[i]['amount']
            this.onevent.location = this.eventArr[i]['location']
            this.onevent.description = this.eventArr[i]['description']
            this.onevent.contact = this.eventArr[i]['contact']
            this.onevent.email = this.eventArr[i]['email']
            this.onevent.whatsapp = this.eventArr[i]['whatsapp']
            this.onevent.termsandcondition = this.eventArr[i]['termsandcondition']
            this.onevent.merchantid = this.eventArr[i]['merchantid']
            this.onevent.outletid = this.eventArr[i]['outletid']
            this.onevent.thumbnail = new Buffer(this.eventArr[i]['thumbnail']['data']).toString('base64');
            this.onevent.thumbnailType = this.eventArr[i]['thumbnail']['contentType']
            this.oneventArr.push(this.onevent)
            $("#result").hide();
          }
          else{
          }
        }
        else{
          $("#result").html("No upcoming events");
        }
      }
    });
  } 
  open(eventArr:any)
  {
    const edurl = "/bookingeventdetails?id=" + eventArr['_id'];
    console.log(edurl)
    this.router.navigateByUrl(edurl)
  }

  registerArr = [];
    
  public register ={
    _id:'',
    phonenumber:'', 
    name:'',
    password:'',
    birthdate:'',
    tierlevel:'',
    pointscollect:'',
    pointsredeem:'',
    confirmpwd:'',
    email:'',
    username:'',
    thumbnail:'',
    address1:'',
    address2:'',
    address3:'',
    state:'',
    city:'',
    postcode:'',
    status:'',
    createdat:'',
    totalpoints:''
  }

  lol = [];
  public currentmemberid: any;

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
