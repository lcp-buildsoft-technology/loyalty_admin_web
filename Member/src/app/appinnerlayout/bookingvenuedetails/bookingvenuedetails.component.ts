import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var angular:any;
import {MatDialog} from '@angular/material/dialog';
import { Buffer } from 'buffer';
import { FormBuilder } from '@angular/forms';
import { VenuecontactdialogComponent } from '../venuecontactdialog/venuecontactdialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bookingvenuedetails',
  templateUrl: './bookingvenuedetails.component.html',
  styleUrls: ['./bookingvenuedetails.component.scss']
})
export class BookingvenuedetailsComponent implements OnInit {

  message: any;
  shopArr = [];
  outletArr = [];
  storereviewArr = [];
  public id:any;
  image1arr:any;
  imagetypeArr:any;
  imagesArr :any;

  public storereview = {
    _id:'',
    ratings:'',
    storereview:'',
    outletid:'',
    createdAt:''
  }
  
  review: number =0
  reviews: number= 0
  
 
  public outlet = {
    _id:'',
    merchantid:'',
    shopname:'',
    address:'',
    phone:'',
    whatsapp:'',
    email:'',
    operatehrsstart:'',
    operatehrsend:'',
    operateday1:'',
    operateday2:'',
    description:'',
    slot:'',
    latlong:'',
    avgrating:''
  }

  constructor(public dialog: MatDialog, private http: HttpClient, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getOutlet();
    this.getStorereview();
    this.getRegister();
    var url= document.URL;
    const myArray = url.split("=");
    this.id = myArray[1];
  }

  getStorereview(){
    this.http.get('http://165.22.50.213:3001/getstorereview').subscribe((res:any) => {

    this.storereviewArr = res['data'];

      for(var i=0 ; i <this.storereviewArr.length ; i++){        
        if(this.storereviewArr[i]['outletid'] == this.id){
          this.shopArr.push(this.storereviewArr[i])
          this.reviews += parseInt(this.storereviewArr[i]['ratings']);          
        }
        else{}
      }
      this.storereview['length'] = this.shopArr.length;
    });    
  }

  getOutlet()
  {
    this.http.get('http://165.22.50.213:3001/getoutlet').subscribe((res:any) =>
    {
      var data = res['data'];
      for(var i=0; i<data.length; i++){
             if(data[i]['_id'] == this.id ){
              this.outlet = {
                _id:data[i]['_id'],
                merchantid:data[i]['merchantid'],
                shopname:data[i]['shopname'],
                address:data[i]['address'],
                phone:data[i]['phone'],
                whatsapp:data[i]['whatsapp'],
                email:data[i]['email'],
                operatehrsstart:data[i]['operatehrsstart'],
                operatehrsend:data[i]['operatehrsend'],
                operateday1:data[i]['operateday1'],
                operateday2:data[i]['operateday2'],
                description:data[i]['description'],
                slot:data[i]['slot'],
                latlong:data[i]['latlong'],
                avgrating:data[i]['avgrating']
              }
              this.image1arr = new Buffer(data[i]['thumbnail']['data']).toString('base64');
              this.imagetypeArr = data[i]['thumbnail']['contentType'];  
             }
             else{}
      }  
    });
  }

  open(outlet:any)
  {    
    alert("Please book according to operation hours! Thanks.");
    const vfurl = "/bookingvenueform?id=" + this.outlet._id;
    console.log(vfurl)
    this.router.navigateByUrl(vfurl)
  }

  go()
  {
    const vcurl = "/venuecomment?id=" + this.outlet._id;
    console.log(vcurl)
    this.router.navigateByUrl(vcurl)
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

  openDialog() {
    this.dialog.open(VenuecontactdialogComponent)  
  }

  acc(){    
    const purl = "/profile?id=" + this.registerArr[0]['_id'];
    console.log(purl)
    this.router.navigateByUrl(purl)
  }

  location()
  {
    const mapurl = "http://www.google.com/maps/place/" + this.outlet.latlong;     
    window.open(mapurl)
  }

  whatsapp()
  {
    const wsurl = "https://api.whatsapp.com/send?phone=" + this.outlet.whatsapp;
    window.open(wsurl)
  }
  
}

