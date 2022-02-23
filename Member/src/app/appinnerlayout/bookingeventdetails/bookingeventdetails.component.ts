import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var angular:any;
import { Buffer } from 'buffer';
import {MatDialog} from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { EventcontactdialogComponent } from '../eventcontactdialog/eventcontactdialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bookingeventdetails',
  templateUrl: './bookingeventdetails.component.html',
  styleUrls: ['./bookingeventdetails.component.scss']
})
export class BookingeventdetailsComponent implements OnInit {

  message: any;
  eventArr = []; 
  public id:any;
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
    latlong:'',
    description:'',
    contact:'',
    email:'',
    whatsapp:'',
    thumbnail:'',
    termsandcondition:'',
    merchantid:'',
    outletid:'',
    slot:'',
  }

  constructor(private http: HttpClient, public dialog: MatDialog, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getRegister();
    this.getEvent();
    var url= document.URL;
    const myArray = url.split("=");
    this.id = myArray[1];
    
  }

  getEvent()
  {
    this.http.get('http://165.22.50.213:3001/getevent').subscribe((res:any) => 
    {
      var data = res['data'];
      
      for(var i=0; i<data.length; i++){
             if(data[i]['_id'] == this.id ){
              this.event = {
                _id:data[i]['_id'],
                eventname:data[i]['eventname'],
                eventhost:data[i]['eventhost'],
                sdate:data[i]['sdate'],
                edate:data[i]['edate'],
                stime:data[i]['stime'],
                etime:data[i]['etime'],
                amount:data[i]['amount'],
                location:data[i]['location'],
                latlong:data[i]['latlong'],
                description:data[i]['description'],
                contact:data[i]['contact'],
                email:data[i]['email'],
                whatsapp:data[i]['whatsapp'],
                thumbnail:data[i]['thumbnail'],
                termsandcondition:data[i]['termsandcondition'],
                merchantid:data[i]['merchantid'],
                outletid:data[i]['outletid'],
                slot:data[i]['slot']
              }   
              this.image1arr = new Buffer(data[i]['thumbnail']['data']).toString('base64');
              this.imagetypeArr = data[i]['thumbnail']['contentType'];                        
             }
             else{}
      }        
    });
  }

 open(event:any)
  {    
    const epurl = "/bookingeventpayment?id=" + this.event._id;
    console.log(epurl)
    this.router.navigateByUrl(epurl)
  }

  openDialog()
  {
    this.dialog.open(EventcontactdialogComponent)
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
    const purl ="/profile?id=" + this.registerArr[0]['_id'];
    console.log(purl)
    this.router.navigateByUrl(purl)
  }

  location()
  {
    const mapurl = "http://www.google.com/maps/place/" + this.event.latlong;     
    window.open(mapurl)
  }

  whatsapp()
  {
    const wsurl = "https://api.whatsapp.com/send?phone=" + this.event.whatsapp;
    window.open(wsurl)
  }

  email()
  {
    const emurl = "mailto:" + this.event.email;
    window.location.assign(emurl)
  }

  call()
  {
    const phurl = "tel:" + this.event.contact;
    window.location.assign(phurl)
  }

}