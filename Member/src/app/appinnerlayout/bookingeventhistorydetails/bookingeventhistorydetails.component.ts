import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var angular:any;
import { Buffer } from 'buffer';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-bookingeventhistorydetails',
  templateUrl: './bookingeventhistorydetails.component.html',
  styleUrls: ['./bookingeventhistorydetails.component.scss']
})
export class BookingeventhistorydetailsComponent implements OnInit {
  message: any;
  eventArr =[];
  bookingeventArr = [];
  public id:any;
  image1arr:any;
  imagetypeArr:any;
  imagesArr :any;
  thumbnail ="";

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
    outletid:''
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
    total:'',
    thumbnail:''
  } 

  constructor(private http: HttpClient, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getBookingevent();
    this.getRegister();

    var url= document.URL;
    const myArray = url.split("=");
    this.id = myArray[1];
  }

  getBookingevent()
  {
    this.http.get('http://165.22.50.213:3001/getbookingevent').subscribe((res:any) => 
    {
      var data = res['data'];

      for(var i=0; i<data.length; i++){
             if(data[i]['_id'] == this.id ){
              this.bookingevent = {
                _id:data[i]['_id'],
                firstname:data[i]['firstname'],
                lastname:data[i]['lastname'],
                phonenumber:data[i]['phonenumber'],
                _value:data[i]['_value'],
                eventid:data[i]['eventid'],
                eventname:data[i]['eventname'],
                eventhost:data[i]['eventhost'],
                sdate:data[i]['sdate'],
                edate:data[i]['edate'],
                stime:data[i]['stime'],
                etime:data[i]['etime'],
                status:data[i]['status'],
                createddate:data[i]['createddate'],
                total:data[i]['total'],
                thumbnail:data[i]['thumbnail']
              }             
             }
             else{}
      }
    });
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

  backnav() {
    const bhurl = "/bookinghistory?id=" + this.registerArr[0]['_id'];
    console.log(bhurl)
    this.router.navigateByUrl(bhurl)
  }

  acc(){    
    const purl = "/profile?id=" + this.registerArr[0]['_id'];
    console.log(purl)
    this.router.navigateByUrl(purl)
  }
}
