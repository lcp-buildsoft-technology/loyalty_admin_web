import { Component, OnInit, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { Buffer } from 'buffer';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})

export class MyaccountComponent implements OnInit {
  message:any;
  merchantArr=[];
  onmerchantArr:string[]=[];
  public id: any;
  image1arr:any;
  imagetypeArr:any;
  imagesArr:any;
  url=('../../../assets/img/blankimg.png');
  todayDate ="";
 
  public merchant = {
    _id:'',
    thumbnail:'',
    createdate:'',
    merchanttype:'',
    companyname:'',
    regno:'',
    email:'',
    contact:'',
    address:'',
    status:'',
    fb:'',
    ig:'',
    twitter:'',
    linkedin:'',
    tiktok:'',
    bankacc:'',
    bankname:'',
    swiftcode:'',
    thumbnailType:''
  }

  public onmerchant:any = {
    _id:'',
    thumbnail:'',
    createdate:'',
    merchanttype:'',
    companyname:'',
    regno:'',
    email:'',
    contact:'',
    address:'',
    status:'',
    fb:'',
    ig:'',
    twitter:'',
    linkedin:'',
    tiktok:'',
    bankacc:'',
    bankname:'',
    swiftcode:'',
    thumbnailType:''
  }

  public merchantObj ={
    thumbnail:'',
    createdate:'',
    merchanttype:'',
    companyname:'',
    regno:'',
    email:'',
    contact:'',
    address:'',
    status:'',
    fb:'',
    ig:'',
    twitter:'',
    linkedin:'',
    tiktok:'',
    bankacc:'',
    bankname:'',
    swiftcode:'',
  };

  constructor(private http: HttpClient, private router:Router, private route:ActivatedRoute) {}

  ngOnInit(): void {
    var moutlet =JSON.parse(localStorage.getItem('Moutlet') !);
    var mlogin =JSON.parse(localStorage.getItem('Mlogin') !);
    moutlet.merchantid
    console.log(moutlet.merchantid)

    this.getMerchant();

    var url = document.URL;
    console.log(url)
    const myArray = url.split('=');
    this.id = myArray[1];
    console.log(this.id);

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

  lol =[];
  public currentmerchantid:any;

  backnav() {
    this.router.navigate(['/profile'])
  }

  getMerchant()
  {
    this.http.get('http://165.22.50.213:3001/getmerchant').subscribe((res:any)=>
    {
      this.lol = res['data'];
      var moutlet =JSON.parse(localStorage.getItem('Moutlet') !);
      this.currentmerchantid = moutlet.merchantid

      for (let i=0; i<this.lol.length;i++){
        if(this.currentmerchantid==this.lol[i]['_id']){
          this.merchantArr[0]=this.lol[i];
        }
      }

      for(var i=0; i<this.merchantArr.length;i++){
        this.onmerchant={
          _id:'',
          thumbnail:'',
          createdate:'',
          merchanttype:'',
          companyname:'',
          regno:'',
          email:'',
          contact:'',
          address:'',
          status:'',
          fb:'',
          ig:'',
          twitter:'',
          linkedin:'',
          tiktok:'',
          bankacc:'',
          bankname:'',
          swiftcode:'',
          thumbnailType:''
        }
        this.onmerchant._id = this.merchantArr[i]['_id'];
        this.onmerchant.createdate = this.merchantArr[i]['createdate'];
        this.onmerchant.merchanttype = this.merchantArr[i]['merchanttype'];
        this.onmerchant.companyname = this.merchantArr[i]['companyname'];
        this.onmerchant.regno = this.merchantArr[i]['regno'];
        this.onmerchant.email = this.merchantArr[i]['email'];
        this.onmerchant.contact = this.merchantArr[i]['contact'];
        this.onmerchant.address = this.merchantArr[i]['address'];
        this.onmerchant.status = this.merchantArr[i]['status'];
        this.onmerchant.fb = this.merchantArr[i]['fb'];
        this.onmerchant.ig = this.merchantArr[i]['ig'];
        this.onmerchant.twitter = this.merchantArr[i]['twitter'];
        this.onmerchant.linkedin = this.merchantArr[i]['linkedin'];
        this.onmerchant.tiktok = this.merchantArr[i]['tiktok'];
        this.onmerchant.bankacc = this.merchantArr[i]['bankacc'];
        this.onmerchant.bankname = this.merchantArr[i]['bankname'];
        this.onmerchant.swiftcode = this.merchantArr[i]['swiftcode'];
        this.onmerchant.thumbnail = new Buffer(this.merchantArr[i]['thumbnail']['data']).toString('base64');
        this.onmerchant.thumbnailType = this.merchantArr[i]['thumbnail']['contentType']
        this.onmerchantArr.push(this.onmerchant);

        console.log(this.onmerchantArr)
      }

    });
  }

  go()
  {
    const ema = "/editmyaccount?id=" +  this.merchantArr[0]['_id'];
    console.log(ema)
    this.router.navigateByUrl(ema)
  }

}
  



