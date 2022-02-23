import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { Buffer } from 'buffer';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Pipe, PipeTransform } from '@angular/core';
import { WindowScrollController } from '@fullcalendar/common';
import { Compiler } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

declare var angular: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],

})


export class PaymentComponent implements OnInit {
  searchInput: string = '';
  message: any;
  imageid: any;
  image1arr: any;
  imagetypeArr: any;
  imagesArr = []
  imagesarrid: any;

  upvoucherArr: string[] = [];
  hisvoucherArr: string[] = [];
  onvoucherArr: string[] = [];
  voucherArr = [];
  textArr = [];

  public srch = [];
  public id: any;
  todayDate = "";
  modal: any;
  

  constructor(private modalService: NgbModal, private http: HttpClient, private _compiler: Compiler, private form: FormBuilder, private router: Router, private route: ActivatedRoute, private activatedroute: ActivatedRoute) {
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
    merchantid: ''
  };
  public onvoucher: any = {
    _id: '',
    title: '',
    sdate: '',
    edate: '',
    thumbnail: '',
    quantity: '',
    discount: '',
    thumbnailType: '',
    minspend: '',
    termsandcondition: '',
    status: ''
  };
  public upvoucher: any = {
    _id: '',
    title: '',
    sdate: '',
    edate: '',
    thumbnailType: '',
    thumbnail: '',
    quantity: '',
    discount: '',

    minspend: '',
    termsandcondition: '',
    status: ''
  };
  public hisvoucher: any = {
    _id: '',
    title: '',
    sdate: '',
    edate: '',
    thumbnail: '',
    quantity: '',
    discount: '',
    thumbnailType: '',
    minspend: '',
    termsandcondition: '',
    status: ''
  };

  public deletevoucher = {
    _id: '',
    title: '',
    sdate: '',
    edate: '',
    thumbnail: '',
    quantity: '',
    discount: '',

    minspend: '',
    termsandcondition: '',
    status: ''
  };


  ngOnInit() {

  console.log('hi')

    this.open(this.voucher);
    var mlogin = JSON.parse(localStorage.getItem('Mlogin')!);
    this.getVoucher(mlogin);
    this._compiler.clearCache();

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

  menuopen() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('menu-open');
  }

  getVoucher(mlogin: any) {

    this.voucher.merchantid = mlogin.merchantid
    this.http.post('http://165.22.50.213:3001/getvouchers', this.voucher).subscribe((res: any) => {

      this.voucherArr = res['data'];
      console.log(this.voucherArr);

      for (var i = 0; i < this.voucherArr.length; i++) {
        console.log(this.voucherArr[i]['thumbnail'])
        
          if ((this.voucherArr[i]['sdate'] <= this.todayDate) && (this.voucherArr[i]['edate'] < this.todayDate)) {
            this.hisvoucher = {
              _id: '',
              title: '',
              sdate: '',
              edate: '',
              thumbnail: '',
              quantity: '',
              discount: '',
              thumbnailType: '',
              minspend: '',
              termsandcondition: '',
              status: ''
            };

            this.hisvoucher._id = this.voucherArr[i]['_id']
            this.hisvoucher.title = this.voucherArr[i]['title']
            this.hisvoucher.sdate = this.voucherArr[i]['sdate']
            this.hisvoucher.edate = this.voucherArr[i]['edate']

            this.hisvoucher.quantity = this.voucherArr[i]['quantity']
            this.hisvoucher.discount = this.voucherArr[i]['discount']
            this.hisvoucher.minspend = this.voucherArr[i]['minspend']
            this.hisvoucher.termsandcondition = this.voucherArr[i]['termsandcondition']
            this.hisvoucher.status = this.voucherArr[i]['status']
            this.hisvoucher.thumbnail = new Buffer(this.voucherArr[i]['thumbnail']['data']).toString('base64');
            this.hisvoucher.thumbnailType = this.voucherArr[i]['thumbnail']['contentType']
            this.hisvoucherArr.push(this.hisvoucher);
          }

          else if ((this.voucherArr[i]['edate'] >= this.todayDate) && (this.voucherArr[i]['sdate'] <= this.todayDate)) {
            this.onvoucher = {
              _id: '',
              title: '',
              sdate: '',
              edate: '',
              thumbnail: '',
              quantity: '',
              discount: '',
              thumbnailType: '',
              minspend: '',
              termsandcondition: '',
              status: ''
            };

            this.onvoucher._id = this.voucherArr[i]['_id']
            this.onvoucher.title = this.voucherArr[i]['title']
            this.onvoucher.sdate = this.voucherArr[i]['sdate']
            this.onvoucher.edate = this.voucherArr[i]['edate']
            this.onvoucher.quantity = this.voucherArr[i]['quantity']
            this.onvoucher.discount = this.voucherArr[i]['discount']
            this.onvoucher.minspend = this.voucherArr[i]['minspend']
            this.onvoucher.termsandcondition = this.voucherArr[i]['termsandcondition']
            this.onvoucher.status = this.voucherArr[i]['status']
            this.onvoucher.thumbnail = new Buffer(this.voucherArr[i]['thumbnail']['data']).toString('base64');
            this.onvoucher.thumbnailType = this.voucherArr[i]['thumbnail']['contentType']
            this.onvoucherArr.push(this.onvoucher);
          }

          else if (this.voucherArr[i]['sdate'] > this.todayDate) {
            this.upvoucher = {
              _id: '',
              title: '',
              sdate: '',
              edate: '',
              thumbnailType: '',
              thumbnail: '',
              quantity: '',
              discount: '',

              minspend: '',
              termsandcondition: '',
              status: ''
            };
            this.upvoucher._id = this.voucherArr[i]['_id']
            this.upvoucher.title = this.voucherArr[i]['title']
            this.upvoucher.sdate = this.voucherArr[i]['sdate']
            this.upvoucher.edate = this.voucherArr[i]['edate']

            this.upvoucher.quantity = this.voucherArr[i]['quantity']
            this.upvoucher.discount = this.voucherArr[i]['discount']
            this.upvoucher.minspend = this.voucherArr[i]['minspend']
            this.upvoucher.termsandcondition = this.voucherArr[i]['termsandcondition']
            this.upvoucher.status = this.voucherArr[i]['status']

            this.upvoucher.thumbnail = new Buffer(this.voucherArr[i]['thumbnail']['data']).toString('base64');

            this.upvoucher.thumbnailType = this.voucherArr[i]['thumbnail']['contentType']
            this.upvoucherArr.push(this.upvoucher);
          }
        
      }
    });
  }

  Transfer(id: any) {
    var name = $("#deletebtn_" + id).attr('name') + "";
    console.log(name);
    console.log(id)
    $("#voucher_name").val(name);
  }


  DeleteVoucher(voucher: any) {
    var id = $('#voucher_name').val();
    this.voucher._id = '' + id + '';
    var data: any = {
      '_id': id
    };
    console.log(data)
    this.http.post("http://165.22.50.213:3001/deleteVoucher", data).subscribe((res: any) => {
      this.voucherArr = res['data'];
      console.log(res);
      this.message = res;
    });
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/payment']);
  }


  open(voucher: any) {
    this.deletevoucher = {
      _id: voucher._id,
      title: voucher.title,
      sdate: voucher.sdate,
      edate: voucher.edate,
      thumbnail: voucher.thumbnail,
      quantity: voucher.quantity,
      discount: voucher.discount,
      minspend: voucher.minspend,
      termsandcondition: voucher.termsandcondition,
      status: voucher.status
    }
  }

  edit(voucher: any) {
    console.log(voucher);
    const nots = "/notifications?id=" + voucher._id;
    console.log(nots)
    this.router.navigateByUrl(nots)
  }

  detail(voucher: any) {
    const vdet = "/vdetail?id=" + voucher._id;
    console.log(vdet)
    this.router.navigateByUrl(vdet)
  }

  backnav() {
    this.router.navigate(['/home'])
  }

}
