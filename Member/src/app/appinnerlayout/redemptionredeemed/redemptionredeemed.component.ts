import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QRCodeModule } from 'angular2-qrcode';
declare var angular:any;
import { Buffer } from 'buffer';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-redemptionredeemed',
  templateUrl: './redemptionredeemed.component.html',
  styleUrls: ['./redemptionredeemed.component.scss']
})
export class RedemptionredeemedComponent implements OnInit {

  message: any; 
  public id:any;

  onlinestoreArr = [];
  userproductArr=[];
  image1arr:any;
  imagetypeArr:any;
  imagesArr :any; 
  thumbnail = "";

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
    thumbnail:''
  }

  constructor(private http: HttpClient, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {    
    this.getUserproduct();
    this.getOnlinestore();
    this.getRegister();

    var url = document.URL;
    const myArray = url.split('=');
    this.id = myArray[1];
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
            thumbnail:data[i]['thumbnail']
          }
          this.userproduct.thumbnail = this.thumbnail;
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
