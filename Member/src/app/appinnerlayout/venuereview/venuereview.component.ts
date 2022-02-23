import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Buffer } from 'buffer';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-venuereview',
  templateUrl: './venuereview.component.html',
  styleUrls: ['./venuereview.component.scss']
})
export class VenuereviewComponent implements OnInit {

  message: any;
  outletArr = [];
  shopArr = [];
  image1arr: any;
  imagetypeArr: any;
  imagesArr: any;
  public srch = [];
  public id:any;
  todayDate = "";
  currentTime = "";
  storereviewArr =[];
  review: number =0
  reviews: number= 0

  public storereview = {
    _id:'',
    ratings:'',
    storereview:'',
    outletid:'',
    memberid:'',
    membername:'',
    createdAt:'',
    createdTime:''
  }

  public storeObj = {
    ratings:'',
    storereview:'',
    outletid: '',
    memberid:'',
    membername:'',
    createdAt:'',
    createdTime:''
  }

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

  constructor(private http: HttpClient, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getOutlet();
    this.getStorereview();
    this.getmemberid()
    var url= document.URL;
    const myArray = url.split("=");
    this.id = myArray[1];
    
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1
    var hr = today.getHours();
    var min = today.getMinutes();

    var day = "";
    var month = "";
    var hour = "";
    var minute = "";

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

    if (hr < 10) {
      hour = '0' + hr.toString();
    } else {
      hour = hr.toString();
    }
    if (min < 10) {
      minute = '0' + min.toString();
    } else {
      minute = min.toString();
    }
    this.todayDate = yyyy + '-' + month + '-' + day;
    this.currentTime = hour + ':' + minute;
  }

  lol = [];
  public currentmemberid: any;
  membername=""
  registerArr = [];

  getmemberid(){
    this.http.get('http://165.22.50.213:3001/getregister').subscribe((res:any)=>
    {
      this.lol = res['data'];
      var memberid = JSON.parse(localStorage.getItem('Memberlogin')!);
      this.currentmemberid = memberid[0]._id;
      for (let i = 0; i < this.lol.length; i++) {
        if (this.currentmemberid == this.lol[i]['_id']) {
          this.registerArr[0] = this.lol[i];
          this.membername = this.lol[i]['name'];
        }
      }
    });    
  }

  storeReview(storeObj: any) {
    this.storeObj.outletid = this.id;
    this.storeObj.createdAt = this.todayDate;
    this.storeObj.createdTime = this.currentTime;
    this.storeObj.memberid = this.currentmemberid;
    this.storeObj.membername = this.membername;
    this.http.post('http://165.22.50.213:3001/storereview', storeObj).subscribe(res =>{
          console.log(res);
          this.message = res;
          this.open(this.outlet)
      });
    console.log(this.storeObj);
  }

  getStorereview()
  {
    this.http.get('http://165.22.50.213:3001/getstorereview').subscribe((res:any)=>
    {
      this.storereviewArr = res['data'];
      for(var i=0; i<this.storereviewArr.length; i++)
      {
        if(this.storereviewArr[i]['outletid'] == this.id)
        {
          this.shopArr.push(this.storereviewArr[i])
        }               
      }
    })
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
              this.image1arr= new Buffer(data[i]['thumbnail']['data']).toString('base64');
              this.imagetypeArr= data[i]['thumbnail']['contentType'];
             }
             else{}
      }  
    });
  }

  open(outlet:any)
  {
    const vcurl = "/venuecomment?id=" + outlet._id;
    console.log(vcurl)
    this.router.navigateByUrl(vcurl)
  }

  backnav() {
    const vcurl = "/venuecomment?id=" + this.outlet._id;
    console.log(vcurl)
    this.router.navigateByUrl(vcurl)
  }

  acc(){    
    const purl = "/profile?id=" + this.registerArr[0]['_id'];
    console.log(purl)
    this.router.navigateByUrl(purl)
  }

}