import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QRCodeModule } from 'angular2-qrcode';
declare var angular:any;
import { Buffer } from 'buffer';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-rewardsvoucherdetails',
  templateUrl: './rewardsvoucherdetails.component.html',
  styleUrls: ['./rewardsvoucherdetails.component.scss']
})
export class RewardsvoucherdetailsComponent implements OnInit {
  message: any;
  public id:any;
  dataToString:any;
  todayDate = "";
  image1arr:any;
  imagetypeArr:any;
  imagesArr :any; 
  publishedrewardvoucherArr =[];

  public publishedrewardvoucher = {
    _id:'',
    title:'',
    detail:'',
    type:'',
    discount:'',
    minspend:'',
    codetype:'',
    termsandcondition:'',
    expireddate:'',
    available:'',
    memberid:'',
    id:'',
    merchantid:''
  }

  constructor(private http: HttpClient, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.getPublishedrewardvoucher();
    this.getRegister();

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

  getPublishedrewardvoucher()
  {
    this.http.get('http://165.22.50.213:3001/getpublishedrewardvoucher').subscribe((res:any)=>
    {
      var data = res['data'];

      for(var i=0; i<data.length; i++)
      {
        if(data[i]['_id'] == this.id)
        {
          this.publishedrewardvoucher =
          {
            _id: data[i]['_id'],
            title: data[i]['title'],
            detail: data[i]['detail'],
            codetype: "Voucher",
            type: data[i]['vtype'],
            discount:data[i]['discount'],
            minspend:data[i]['minspend'],
            termsandcondition: data[i]['termsandcondition'],
            expireddate: data[i]['expireddate'],
            available: data[i]['available'],
            memberid: data[i]['memberid'],
            id: data[i]['rewardid'],
            merchantid:data[i]['merchantid']
          }
          this.image1arr = new Buffer(data[i]['thumbnail']['data']).toString('base64');
          this.imagetypeArr = data[i]['thumbnail']['contentType'];
          this.dataToString = JSON.stringify(this.publishedrewardvoucher);
        }
        else{}
      }
    });
  }

  editrewardvoucher(publishedrewardvoucher:any){
  }

  lol = [];
  public currentmemberid: any;
  registerArr = [];

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
    const empurl = "/earnmorepoints?id=" + this.registerArr[0]['_id'];
    console.log(empurl)
    this.router.navigateByUrl(empurl)
  }

  acc(){    
    const purl = "/profile?id=" + this.registerArr[0]['_id'];
    console.log(purl)
    this.router.navigateByUrl(purl)
  }
}
