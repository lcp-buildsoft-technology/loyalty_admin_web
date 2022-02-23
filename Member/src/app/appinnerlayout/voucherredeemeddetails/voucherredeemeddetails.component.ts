import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QRCodeModule } from 'angular2-qrcode';
import { Buffer } from 'buffer';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-voucherredeemeddetails',
  templateUrl: './voucherredeemeddetails.component.html',
  styleUrls: ['./voucherredeemeddetails.component.scss']
})
export class VoucherredeemeddetailsComponent implements OnInit {

  message: any;
  voucherArr = [];  
  uservoucherArr=[];
  public id:any;
  todayDate = ""; 
  image1arr:any;
  imagetypeArr:any;
  imagesArr :any;
  thumbnail ="";

  public voucher = {
    _id:'',
    title:'',
    thumbnail:'',
    detail:'',
    quantity:'',
    discount:'',
    minspend:'',
    sdate:'',
    edate:'',
    termsandcondition:'',
    status:'',
    type:'',
    merchantid:''
  }

 public uservoucher = {
    _id:'',
    type:'',
    title:'',
    detail:'',
    quantity:'',
    discount:'',
    minspend:'',
    sdate:'',
    edate:'',
    termsandcondition:'',
    voucherid:'',
    status:'',
    createddate:'',
    memberid:'',
    codetype:'',
    thumbnail:''
  }
  constructor(private http: HttpClient) { }

  ngOnInit(): void {      
    this.getUservoucher();  
    this.getVoucher();

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

  getUservoucher()
  {
    this.http.get('http://165.22.50.213:3001/getuservoucher').subscribe((res:any) => 
    {
      var data = res['data'];

      for(var i=0; i<data.length; i++){
        if(data[i]['voucherid'] == this.id ){
          this.uservoucher = {
            _id:data[i]['_id'],
            type:data[i]['type'],
            title:data[i]['title'],
            detail:data[i]['detail'],
            discount:data[i]['discount'],
            minspend:data[i]['minspend'],
            sdate:data[i]['sdate'],
            edate:data[i]['edate'],
            termsandcondition:data[i]['termsandcondition'],
            voucherid:data[i]['voucherid'],
            status:data[i]['status'],
            quantity:data[i]['quantity'],
            createddate:data[i]['createddate'],
            memberid:data[i]['memberid'],
            codetype:data[i]['codetype'],
            thumbnail:data[i]['thumbnail']
          } 
          this.uservoucher.thumbnail = this.thumbnail;
        }
        else{}
      }
    });
  }

  getthumbnail()
  {
    this.http.get('http://165.22.50.213:3001/getvoucher').subscribe((res:any)=>
    {
      var data = res['data'];
      for(var i=0; i<data.length; i++)
      {
        this.thumbnail = data[i]['thumbnail'];
      }
    })
  }

  getVoucher()
  {
    this.http.get('http://165.22.50.213:3001/getvoucher').subscribe((res:any) => 
    {
      var data = res['data'];
      
      for(var i=0; i<data.length; i++)
      {
        if(data[i]['_id'] == this.id )
        {
          this.voucher = 
          {
            _id:data[i]['_id'],
            type:data[i]['type'],
            title:data[i]['title'],
            thumbnail:data[i]['thumbnail'],
            detail:data[i]['detail'],
            quantity:data[i]['quantity'],
            discount:data[i]['discount'],
            minspend:data[i]['minspend'],
            sdate:data[i]['sdate'],
            edate:data[i]['edate'],
            termsandcondition:data[i]['termsandcondition'],
            status:data[i]['status'],
            merchantid:data[i]['merchantid']
          }
          
          this.image1arr = new Buffer(data[i]['thumbnail']['data']).toString('base64');
          this.imagetypeArr = data[i]['thumbnail']['contentType'];     
        }
        else{}
      }   
    });
  }

  isShows: boolean=true; 

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
    window.location.href ="/voucherlist";
  }

  acc(){    
    window.location.href="/profile?id=" + this.registerArr[0]['_id'];
  }
}
