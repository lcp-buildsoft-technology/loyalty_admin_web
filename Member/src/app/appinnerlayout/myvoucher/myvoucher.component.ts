import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Buffer } from 'buffer';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-myvoucher',
  templateUrl: './myvoucher.component.html',
  styleUrls: ['./myvoucher.component.scss']
})
export class MyvoucherComponent implements OnInit {
  message: any;   
  searchVoucher : string ='';  
  todayDate = "";
  public id:any;
  public srch = [];

  image1arr:any;
  imagetypeArr:any;
  imagesArr :any;
  thumbnail = "";
  status = "";

  voucherArr = []; 
  uservoucherArr = [];
  onuservoucherArr:string[] =[];
  activevoucherArr = [];

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

  public onuservoucher:any = {
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

  constructor(private http: HttpClient, private router:Router, private route:ActivatedRoute) { 
    this.srch =[...this.uservoucherArr];
  }

  ngOnInit(): void {
    this.getUservoucher();
    this.getRegister();
    this.getthumbnail();

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
      this.uservoucherArr = res['data'];

      for(var i=0; i<this.uservoucherArr.length; i++){
        this.getthumbnail()
        if(this.uservoucherArr[i]['memberid'] == this.id ){
          if((this.uservoucherArr[i]['edate'] >= this.todayDate) && (this.uservoucherArr[i]['sdate'] <= this.todayDate))
          {
            this.onuservoucher = {
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
            };
            this.onuservoucher._id = this.uservoucherArr[i]['_id']
            this.onuservoucher.type = this.uservoucherArr[i]['type']
            this.onuservoucher.title = this.uservoucherArr[i]['title']
            this.onuservoucher.detail = this.uservoucherArr[i]['detail']
            this.onuservoucher.quantity = this.uservoucherArr[i]['quantity']
            this.onuservoucher.discount = this.uservoucherArr[i]['discount']
            this.onuservoucher.minspend = this.uservoucherArr[i]['minspend']
            this.onuservoucher.sdate = this.uservoucherArr[i]['sdate']
            this.onuservoucher.edate = this.uservoucherArr[i]['edate']
            this.onuservoucher.termsandcondition = this.uservoucherArr[i]['termsandcondition']
            this.onuservoucher.voucherid = this.uservoucherArr[i]['voucherid']
            this.onuservoucher.status = this.uservoucherArr[i]['status']
            this.onuservoucher.createddate = this.uservoucherArr[i]['createddate']
            this.onuservoucher.memberid = this.uservoucherArr[i]['memberid']
            this.onuservoucher.codetype = this.uservoucherArr[i]['codetype']
            this.onuservoucherArr.push(this.onuservoucher);
          }          
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
        this.status = data[i]['status'];
      }
    })
  } 

  goto(uservoucher:any)
  {
    if(uservoucher.status==="Pending")
        {
            const vpurl = "/voucherpendingdetails?id=" + uservoucher.voucherid;
            console.log(vpurl)
            this.router.navigateByUrl(vpurl)                  
        }
      
    else {
    }   
  }

  lol = [];
  public currentmemberid: any;
  registerArr =[];

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