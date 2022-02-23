import { Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { MapsdialogComponent } from '../mapsdialog/mapsdialog.component';
import { HttpClient } from '@angular/common/http';
import { MapsAPILoader } from '@agm/core';
import { Buffer } from 'buffer';
import * as $ from 'jquery';

import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper/core';
import { ActivatedRoute, Router } from '@angular/router';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-locatestoredetails',
  templateUrl: './locatestoredetails.component.html',
  styleUrls: ['./locatestoredetails.component.scss'],  
})
export class LocatestoredetailsComponent implements OnInit {

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
    var html5Slider = document.getElementById('rangeslider');
    this.getOutlet();
    this.getStorereview();
    this.getRegister();
    var url= document.URL;
    const myArray = url.split("=");
    this.id = myArray[1];
  }
  openDialog() {
    const mapurl = "http://www.google.com/maps/place/" + this.outlet.latlong;
    window.open(mapurl)
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

  open(outlet:any)
  {
    const curl = "/storecomment?id=" + outlet._id;
    console.log(curl)
    this.router.navigateByUrl(curl)
  }

  go(outlet:any)
  {
    const onurl = "/onlinestorehome?id=" + outlet._id
    console.log(onurl)
    this.router.navigateByUrl(onurl)
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
  
  backnav() {
    this.router.navigate(['/locatestorehome']);
  }

  acc(){    
    const purl = "/profile?id=" + this.registerArr[0]['_id'];
    console.log(purl)
    this.router.navigateByUrl(purl)
  }

}