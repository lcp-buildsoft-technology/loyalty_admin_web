import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Buffer } from 'buffer';

import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  message:any;
  merchantArr = [];
  onmerchantArr:string[] =[]
  

  public merchant={
    _id:'',
    companyname:'',
    regno:'',
    email:'',
    contact:'',
    address:'',
    fb: '',
    ig: '',
    twitter: '',
    linkedin: '',
    tiktok: '',
    bankacc: '',
    swiftcode: '',
    createdate: '',
    merchanttype: '',
    thumbnail:'',
    thumbnailtype:'',
    };

    public onmerchant:any={
      _id:'',
      companyname:'',
      regno:'',
      email:'',
      contact:'',
      address:'',
      fb: '',
      ig: '',
      twitter: '',
      linkedin: '',
      tiktok: '',
      bankacc: '',
      swiftcode: '',
      createdate: '',
      merchanttype: '',
      thumbnail:'',
      thumbnailtype:'',
      };
    

  constructor( private modalService: NgbModal, private http: HttpClient, private router: Router, private route: ActivatedRoute) {

   }

  onFileSelected(event: any) {
    console.log(event);
  }

  ngOnInit(): void {
 
    var moutlet =JSON.parse(localStorage.getItem('Moutlet') !);
    moutlet.merchantid
    console.log(moutlet.merchantid)
    var mlogin =JSON.parse(localStorage.getItem('Mlogin') !);
    this.getMerchant(moutlet);
  }

  backnav()
  {
    this.router.navigate(['/home'])
  }

  getMerchant(moutlet:any){
    this.http.get('http://165.22.50.213:3001/getmerchant').subscribe((res:any) => {
      this.merchantArr = res['data'];
      console.log(this.merchantArr);

      for(var i=0; i<this.merchantArr.length; i++)
      {
        console.log("123")
        if(this.merchantArr[i]['_id'] == moutlet.merchantid)
        {
            this.onmerchant=
                    {
                      _id:'',
                      companyname:'',
                      regno:'',
                      email:'',
                      contact:'',
                      address:'',
                      fb: '',
                      ig: '',
                      twitter: '',
                      linkedin: '',
                      tiktok: '',
                      bankacc: '',
                      swiftcode: '',
                      createdate: '',
                      merchanttype: '',
                      thumbnail:'',
                    };
                    this.onmerchant._id = this.merchantArr[i]['_id']
                    this.onmerchant.companyname = this.merchantArr[i]['companyname']
                    this.onmerchant.regno = this.merchantArr[i]['regno']
                    this.onmerchant.email = this.merchantArr[i]['email']
                    this.onmerchant.contact = this.merchantArr[i]['contact']
                    this.onmerchant.address = this.merchantArr[i]['address']
                    this.onmerchant.fb = this.merchantArr[i]['fb']
                    this.onmerchant.ig = this.merchantArr[i]['ig']
                    this.onmerchant.twitter = this.merchantArr[i]['twitter']
                    this.onmerchant.linkedin = this.merchantArr[i]['linkedin']
                    this.onmerchant.tiktok = this.merchantArr[i]['tiktok']
                    this.onmerchant.bankacc = this.merchantArr[i]['bankacc']
                    this.onmerchant.swiftcode = this.merchantArr[i]['swiftcode']
                    this.onmerchant.createdate = this.merchantArr[i]['createdate']
                    this.onmerchant.merchanttype = this.merchantArr[i]['merchanttype']
                    this.onmerchant.thumbnail = new Buffer(this.merchantArr[i]['thumbnail']['data']).toString('base64');
                    this.onmerchant.thumbnailType = this.merchantArr[i]['thumbnail']['contentType']
                    this.onmerchantArr.push(this.onmerchant);
                    console.log(this.onmerchant)
        }
        
      }


    })
  }

  open(merchant: any){
    console.log(merchant);
    const myacc = "/myaccount?id=" + merchant._id;
    console.log(myacc)
    this.router.navigateByUrl(myacc)
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/signin'])
  }



}