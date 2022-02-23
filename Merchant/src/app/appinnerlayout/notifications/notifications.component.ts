import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { WindowScrollController } from '@fullcalendar/common';
import { Buffer } from 'buffer';
import { Router } from '@angular/router';

declare var angular: any;
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  message: any;
  title: any;
  sdate: any;
  edate: any;
  quantity: any;
  discount: any;
  detail: any;
  termsandcondition: any;
  minspend: any;
  status: any;
  type: any;

  voucherArr = [];
  selectedArr = [];
  new?: Object;
  public srch = [];
  routeSub: any;
  data_id = '';
  error: number = 0;
  valid: string[] = [];
  todayDate: any
  constructor(private modalService: NgbModal, private http: HttpClient, private route: ActivatedRoute, private router: Router, private form: FormBuilder) {
    this.srch = [...this.voucherArr];

  }
  public voucher = {
    _id: '',
    title: '',
    sdate: '',
    edate: '',
    thumbnail: '',
    quantity: '',
    discount: '',

    minspend: '',
    termsandcondition: '',
    status: '',
    type: '',
    detail: ''
  };

  public editVoucher = {
    _id: '',
    title: '',
    sdate: '',
    edate: '',
    thumbnail: '',
    quantity: '',
    discount: '',

    minspend: '',
    termsandcondition: '',
    type: '',
    detail: ''
  };

  public id: any;

  ngOnInit(): void {
    this.open(this.voucher);
    var url = document.URL;
    console.log(url)
    const myArray = url.split("=");
    this.id = myArray[1];
    this.data_id = this.id;
    console.log(this.data_id)
    this.getVoucher(this.id);

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

  public images: any;
  public ogthumb:any;
  url: any;
  onselectFile(event:any){
    if(event.target.files){
      if(event.target.files.length != 0){
        var maxFileSize = 1024 * 1024; 
    
        const file = event.target.files[0];
        
        if(this.images.size > maxFileSize){
          alert('Image too large. Maximum file size is 1MB');
          this.editVoucher.thumbnail = this.ogthumb;
          console.log(this.ogthumb)
          console.log(this.editVoucher.thumbnail)
        }
        else{
          this.images=file;
          $('#newimg').show();
          $('#ogimg').hide();
          var reader = new FileReader()
          reader.readAsDataURL(event.target.files[0]);
          reader.onload=(event:any)=>{
          this.url=event.target.result;
          this.ogthumb =this.editVoucher.thumbnail;
        }
      }
  
      }
    }
  }

  imagesArr =[];
  public image:any;
  public imagetype:any;

  getVoucher(id: any) {
    this.voucher._id = this.id
    this.http.post('http://165.22.50.213:3001/getonevoucher', this.voucher).subscribe((res: any) => {

      console.log(res['data']['title']);
      this.voucherArr = res['data'];
      console.log(this.voucherArr);

      this.editVoucher.title = res['data'][0]['title']
      this.editVoucher.sdate = res['data'][0]['sdate']
      this.editVoucher.edate = res['data'][0]['edate']
      this.editVoucher.quantity = res['data'][0]['quantity']
      this.editVoucher.discount = res['data'][0]['discount']
      this.editVoucher.detail = res['data'][0]['detail']
      this.editVoucher.termsandcondition = res['data'][0]['termsandcondition']
      this.editVoucher.minspend = res['data'][0]['minspend']
      this.editVoucher.type = res['data'][0]['type']
      this.type = res['data'][0]['type']

      console.log(this.selectedArr);

      $('#newimg').hide();
      this.image = new Buffer(this.voucherArr[0]['thumbnail']['data']).toString('base64');
      this.imagetype = this.voucherArr[0]['thumbnail']['contentType'];
      this.images = this.voucherArr[0]['thumbnail'];
      this.ogthumb = this.voucherArr[0]['thumbnail'];
    });
  }


  uploadVoucher(voucher: any) {
    this.error = 0;
    this.validation();
    console.log(this.error)
    if (this.error < 1) {
      console.log(voucher)
      console.log(this.id)
      const formData = new FormData();
      var mlogin = JSON.parse(localStorage.getItem('Mlogin')!);
      formData.append('_id', this.id)
      formData.append('title', voucher.title)
      formData.append('sdate', voucher.sdate)
      formData.append('edate', voucher.edate)
      formData.append('file', this.images)
      formData.append('quantity', voucher.quantity)
      formData.append('discount', voucher.discount)
      formData.append('merchantid', mlogin.merchantid)
      formData.append('minspend', voucher.minspend)
      formData.append('termsandcondition', voucher.termsandcondition)
      formData.append('type', voucher.type)
      formData.append('status', "Active")
      formData.append('detail', voucher.detail)
      formData.forEach(file => console.log("File: ", file));

      console.log(formData)
      this.http.post('http://165.22.50.213:3001/editvoucherandimage', formData).subscribe(res => {
        console.log(res);
        this.message = res;
        this.router.navigate[('/payment')]
      });
    
    }
  }

  open(voucher: any) {


    this.editVoucher = {
      _id: voucher._id,
      title: voucher.title,
      sdate: voucher.sdate,
      edate: voucher.edate,
      thumbnail: voucher.thumbnail,
      quantity: voucher.quantity,
      discount: voucher.discount,
      minspend: voucher.minspend,
      termsandcondition: voucher.termsandcondition,
      type: voucher.type,
      detail: voucher.detail

    }
  }
  backnav() {
    this.router.navigate[('/payment')]
  }
  
  validation() {
    //title
    if (this.editVoucher.title === '') {
      this.valid['title'] = "*Title is required!";
      this.error++;
    }
    else {
      this.valid['title'] = ""
    }

    //detail
    if (this.editVoucher.detail === '') {
      this.valid['detail'] = "*Detail is required!";
      this.error++;
    }
    else {
      this.valid['detail'] = ""
    }

    //type
    if (this.editVoucher.type === '') {
      this.valid['type'] = "*Type is required!";
      this.error++;
    }
    else {
      this.valid['type'] = ""
    }

    //quantity
    if (this.editVoucher.quantity === '') {
      this.valid['quantity'] = "*Voucher quantity is required!";
      this.error++;
    }
    else {
      this.valid['quantity'] = ""
    }

    //tnc
    if (this.editVoucher.termsandcondition === '') {
      this.valid['termsandcondition'] = "*Terms and Conditions is required!";
      this.error++;
    }
    else {
      this.valid['termsandcondition'] = ""
    }

    //start date
    if (this.editVoucher.sdate === '') {
      this.valid['sdate'] = "*Start date is required!";
      this.error++;
    }
    else {
      this.valid['sdate'] = ""
    }

    //end date
    if (this.editVoucher.edate === '') {
      this.valid['edate'] = "*End date is required!";
      this.error++;
    }
    else if (this.editVoucher.edate <= this.voucher.sdate) {
      this.valid['edate'] = "*Invalid end date!";
      this.error++;
    }
    else {
      this.valid['edate'] = ""
    }

    //discount
    if (this.editVoucher.discount === '') {
      this.valid['discount'] = "*Amount of Discount is required!";
      this.error++;
    }
    else {
      this.valid['discount'] = ""
    }

    //minimum spend
    if (this.editVoucher.minspend === '') {
      this.valid['minspend'] = "*Minimum Spend Amount is required!";
      this.error++;
    }
    else {
      this.valid['minspend'] = ""
    }
  }
}









