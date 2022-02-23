import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Buffer } from 'buffer';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-voucherdetails',
  templateUrl: './voucherdetails.component.html',
  styleUrls: ['./voucherdetails.component.scss']
})
export class VoucherdetailsComponent implements OnInit {
  
  message: any;
  public id:any;
  dataToString:any;
  todayDate = ""; 
  image1arr:any;
  imagetypeArr:any;
  imagesArr :any;

  voucherArr = [];
  registerArr = [];
  memberid = "";

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
    createdat:''
  }

  public voucher = {
    _id:'',
    title:'',
    thumbnail:'',
    detail:'',
    quantity:'',
    type:'',
    discount:'',
    minspend:'',
    sdate:'',
    edate:'',
    termsandcondition:'',
    status:'',
    merchantid:'',
  }

  //save data in uservoucher table
  public uservoucher = {
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
    merchantid:'',
    oristatus:''
  }
  
  constructor(private http: HttpClient, private _formBuilder: FormBuilder,private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void { 
    this.getVoucher(); 
    this.getmemberid(); 

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
  
  clicked = false;
  public Uservoucher(uservoucher:any): void {    
    this.uservoucher.voucherid=this.id;
    this.uservoucher.detail = this.voucher.detail;
    this.uservoucher.termsandcondition = this.voucher.termsandcondition;
    this.uservoucher.minspend = this.voucher.minspend;
    this.uservoucher.sdate = this.voucher.sdate;
    this.uservoucher.edate = this.voucher.edate;
    this.uservoucher.type = this.voucher.type;
    this.uservoucher.title = this.voucher.title;
    this.uservoucher.status = 'Pending';
    this.uservoucher.codetype = 'voucher';
    this.uservoucher.quantity = this.voucher.quantity;
    this.uservoucher.discount = this.voucher.discount;
    this.uservoucher.memberid = this.currentmemberid;
    this.uservoucher.createddate = this.todayDate;
    this.uservoucher.merchantid = this.voucher.merchantid;
    this.uservoucher.oristatus = this.voucher.status;
    console.log(this.uservoucher);
    this.http.post('http://165.22.50.213:3001/uservoucher', uservoucher).subscribe((res:any) => {
      console.log(res);
      this.message = res;
      // const vpurl = "/voucherpendingdetails?id=" + this.voucher._id;
      // console.log(vpurl)
      // this.router.navigateByUrl(vpurl)
    });
    console.log("ok")
  }

  lol = [];
  public currentmemberid: any;

  getmemberid(){
    this.http.get('http://165.22.50.213:3001/getregister').subscribe((res:any)=>
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
            merchantid:data[i]['merchantid'],
          }
          
          this.image1arr = new Buffer(data[i]['thumbnail']['data']).toString('base64');
          this.imagetypeArr = data[i]['thumbnail']['contentType'];     
        }
        else{}
      }   
    });
  }  

  acc(){    
    const purl = "/profile?id=" + this.registerArr[0]['_id'];
    console.log(purl)
    this.router.navigateByUrl(purl)
  }
}
