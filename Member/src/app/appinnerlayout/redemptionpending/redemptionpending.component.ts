import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { QRCodeModule } from 'angular2-qrcode';
import { Buffer } from 'buffer';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
declare var angular:any;

@Component({
  selector: 'app-redemptionpending',
  templateUrl: './redemptionpending.component.html',
  styleUrls: ['./redemptionpending.component.scss']
})
export class RedemptionpendingComponent implements OnInit {

  message:any;
  onlinestoreArr = [];
  public id:any;
  dataToString:any
  userproductArr=[];
  todayDate = "";
  image1arr:any;
  imagetypeArr:any;
  imagesArr :any; 
  thumbnail = "";
  totalpoints ="";
  redeempoints:number=0;
  points:number=0;
  remainingtotalpoints:number=0;

  public onlinestore = {
    _id:'',
    name:'',
    description:'',
    price:'',
    thumbnail:'',
    merchantid:'',
    outletid:'',
    redemp:'',
    tnc:''
  }

  public userproduct = {
    _id:'',
    name:'',
    description:'',
    price:'',
    onlinestoreid:'',
    status:'',
    memberid:'',
    merchantid:'',
    redemp:'',
    tnc:'',
    outletid:'',
    thumbnail:'',
    codetype:''
  }

  public userpointsredeemed = {
    name:'',
    createddate:'',
    points:'',
    userredeemedid:'',
    memberid:'',
    merchantid:'',
    outletid:''
  }

  registerArr=[];

  public register = {
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

  constructor(private http: HttpClient, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {    
    this.getUserproduct();
    this.getOnlinestore();
    this.getRegister();

    var url = document.URL;
    const myArray = url.split('=');
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

  editproductstatus(userproduct:any){
  }

  goto(userproduct:any){
    const rrurl = "/redemptionredeemed?id=" + this.userproduct.onlinestoreid;
    console.log(rrurl)
    this.router.navigateByUrl(rrurl)
  }

  getUserproduct() {
    this.http.get('http://165.22.50.213:3001/getuserproduct').subscribe((res:any) => {
      var data = res['data'];

      for(var i=0; i<data.length; i++)
      {
        if(data[i]['onlinestoreid'] == this.id )
        {
          this.userproduct = 
          {
            _id:data[i]['_id'],
            name:data[i]['name'],
            description:data[i]['description'],
            price:data[i]['price'],
            onlinestoreid:data[i]['onlinestoreid'],
            status:data[i]['status'],
            memberid:data[i]['memberid'],
            merchantid:data[i]['merchantid'],
            redemp:data[i]['redemp'],
            tnc:data[i]['tnc'],
            outletid:data[i]['outletid'],
            thumbnail:data[i]['thumbnail'],
            codetype:data[i]['codetype']
          }
          this.userproduct.thumbnail = this.thumbnail;
          this.dataToString = JSON.stringify(this.userproduct);
        }
        else{}
      }
    });
  }

  getthumbnail()
  {
    this.http.get('http://165.22.50.213:3001/getonlinestore').subscribe((res:any)=>
    {
      var data = res['data'];
      for(var i=0; i<data.length; i++){
         this.thumbnail = data[i]['thumbnail'];
      }    
    })
  }

  getOnlinestore(){
    this.http.get('http://165.22.50.213:3001/getonlinestore').subscribe((res:any)=> 
    {
      var data = res['data'];
      
      for(var i=0; i<data.length; i++)
      {
        if(data[i]['_id'] == this.id )
        {
          this.onlinestore = 
          {
            _id:data[i]['_id'],
            name:data[i]['name'],
            description:data[i]['description'],
            price:data[i]['price'],
            thumbnail:data[i]['thumbnail'],
            merchantid:data[i]['merchantid'],
            redemp:data[i]['redemp'],
            tnc:data[i]['tnc'],
            outletid:data[i]['outletid']
          }   
          this.image1arr = new Buffer(data[i]['thumbnail']['data']).toString('base64');
          this.imagetypeArr = data[i]['thumbnail']['contentType'];
        }
        else{}
      }
    });
  }

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
  lol = [];
  public currentmemberid: any;

  backnav() {
    const rhurl = "/pointredemptionhome?id=" + this.registerArr[0]['_id'];
    console.log(rhurl)
    this.router.navigateByUrl(rhurl)
  }

  acc(){    
    const purl = "/profile?id=" + this.registerArr[0]['_id'];
    console.log(purl)
    this.router.navigateByUrl(purl)
  }

}
