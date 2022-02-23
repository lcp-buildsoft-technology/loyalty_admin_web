import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Buffer } from 'buffer';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-voucherlist',
  templateUrl: './voucherlist.component.html',
  styleUrls: ['./voucherlist.component.scss']
})
export class VoucherlistComponent implements OnInit {
  message:any;
  searchVoucher: string ='';
  todayDate = "";
  public srch = [];

  voucherArr = [];
  onvoucherArr:string[] = [];
  upvoucherArr:string[] = [];

  image1arr:any;
  imagetypeArr:any;
  imagesArr :any;

  public voucher =
  {
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
    thumbnailType:''
  }

  public onvoucher:any =
  {
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
    thumbnailType:''
  }

  public upvoucher:any =
  {
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
    thumbnailType:''
  }

  constructor(private http: HttpClient, private router:Router, private route:ActivatedRoute) { 
    this.srch = [...this.voucherArr];
  }

  ngOnInit(): void {
    this.getVoucher();
    this.getRegister();

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

  getVoucher()
  {
    this.http.get('http://165.22.50.213:3001/getvoucher').subscribe((res:any)=>
    {
      this.voucherArr = res['data'];

      for(var i=0; i<this.voucherArr.length; i++)
      {
        if((this.voucherArr[i]['edate'] >= this.todayDate) && (this.voucherArr[i]['sdate'] <= this.todayDate))
        {
          if(this.voucherArr[i]['quantity'] > 0){
            this.onvoucher ={
              _id:'',
              title:'',            
              detail:'',
              quantity:'',
              type:'',
              discount:'',
              minspend:'',
              sdate:'',
              edate:'',
              termsandcondition:'',
              status:'',
              thumbnail:'',
              thumbnailType:''
            };
            this.onvoucher._id = this.voucherArr[i]['_id']
            this.onvoucher.title = this.voucherArr[i]['title']
            this.onvoucher.detail = this.voucherArr[i]['detail']
            this.onvoucher.quantity = this.voucherArr[i]['quantity']
            this.onvoucher.type = this.voucherArr[i]['type']
            this.onvoucher.discount = this.voucherArr[i]['discount']
            this.onvoucher.minspend = this.voucherArr[i]['minspend']
            this.onvoucher.sdate = this.voucherArr[i]['sdate']
            this.onvoucher.edate = this.voucherArr[i]['edate']
            this.onvoucher.termsandcondition = this.voucherArr[i]['termsandcondition']
            this.onvoucher.status = this.voucherArr[i]['status']
            this.onvoucher.thumbnail = new Buffer(this.voucherArr[i]['thumbnail']['data']).toString('base64');
            this.onvoucher.thumbnailType = this.voucherArr[i]['thumbnail']['contentType']
            this.onvoucherArr.push(this.onvoucher);
          }   
          else{}      
        }          
        else if(this.voucherArr[i]['sdate'] > this.todayDate){
          this.upvoucher ={
            _id:'',
            title:'',            
            detail:'',
            quantity:'',
            type:'',
            discount:'',
            minspend:'',
            sdate:'',
            edate:'',
            termsandcondition:'',
            status:'',
            thumbnail:'',
            thumbnailType:''
          };
          this.upvoucher._id = this.voucherArr[i]['_id']
          this.upvoucher.title = this.voucherArr[i]['title']
          this.upvoucher.detail = this.voucherArr[i]['detail']
          this.upvoucher.quantity = this.voucherArr[i]['quantity']
          this.upvoucher.type = this.voucherArr[i]['type']
          this.upvoucher.discount = this.voucherArr[i]['discount']
          this.upvoucher.minspend = this.voucherArr[i]['minspend']
          this.upvoucher.sdate = this.voucherArr[i]['sdate']
          this.upvoucher.edate = this.voucherArr[i]['edate']
          this.upvoucher.termsandcondition = this.voucherArr[i]['termsandcondition']
          this.upvoucher.status = this.voucherArr[i]['status']
          this.upvoucher.thumbnail = new Buffer(this.voucherArr[i]['thumbnail']['data']).toString('base64');
          this.upvoucher.thumbnailType = this.voucherArr[i]['thumbnail']['contentType']
          this.upvoucherArr.push(this.upvoucher);
        }        
      }
    });
  }

  open(voucherArr:any)
  {
    const voucurl = "/voucherdetails?id=" + voucherArr['_id'];
    console.log(voucurl)
    this.router.navigateByUrl(voucurl)
  }

  go(voucherArr:any)
  {
    const upvurl = "/upvoucherdetails?id=" + voucherArr['_id'];
    console.log(upvurl)
    this.router.navigateByUrl(upvurl)
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
    const purl = "/profile?id=" + this.registerArr[0]['_id'];
    console.log(purl)
    this.router.navigateByUrl(purl)
  }

}
