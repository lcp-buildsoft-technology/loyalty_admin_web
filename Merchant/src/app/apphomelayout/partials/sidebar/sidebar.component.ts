import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Buffer } from 'buffer';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  message: any;
  merchantArr = [];
  onmerchantArr: string[] = []

  public merchant = {
    _id: '',
    companyname: '',
    regno: '',
    email: '',
    contact: '',
    address: '',
    fb: '',
    ig: '',
    twitter: '',
    linkedin: '',
    tiktok: '',
    bankacc: '',
    swiftcode: '',
    createdate: '',
    merchanttype: '',
    thumbnail: '',
    thumbnailtype: '',
  };

  public onmerchant: any = {
    _id: '',
    companyname: '',
    regno: '',
    email: '',
    contact: '',
    address: '',
    fb: '',
    ig: '',
    twitter: '',
    linkedin: '',
    tiktok: '',
    bankacc: '',
    swiftcode: '',
    createdate: '',
    merchanttype: '',
    thumbnail: '',
    thumbnailtype: '',
  };



  constructor(private modalService: NgbModal, private http: HttpClient, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    var moutlet = JSON.parse(localStorage.getItem('Moutlet')!);
    moutlet.merchantid
    console.log(moutlet.merchantid)

  

    var mlogin = JSON.parse(localStorage.getItem('Mlogin')!);
    this.getMerchant(moutlet);


  }

  getMerchant(moutlet: any) {
    this.http.get('http://165.22.50.213:3001/getmerchant').subscribe((res: any) => {
      this.merchantArr = res['data'];
      console.log(this.merchantArr);

      for (var i = 0; i < this.merchantArr.length; i++) {
        console.log("123")
        if (this.merchantArr[i]['_id'] == moutlet.merchantid) {
          this.onmerchant =
          {
            _id: '',
            thumbnail: '',
          };
          this.onmerchant._id = this.merchantArr[i]['_id']
          this.onmerchant.thumbnail = new Buffer(this.merchantArr[i]['thumbnail']['data']).toString('base64');
          this.onmerchant.thumbnailType = this.merchantArr[i]['thumbnail']['contentType']
          this.onmerchantArr.push(this.onmerchant);
          console.log(this.onmerchant)
        }

      }


    })
  }


  menuclose() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('menu-open');
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/signin')

  }

open(){
this.router.navigate(['/product'])
}


}