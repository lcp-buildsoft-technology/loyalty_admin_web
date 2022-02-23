import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { Buffer } from 'buffer';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var angular: any;
import { Compiler } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AnySoaRecord } from 'dns';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-vredemp',
  templateUrl: './vredemp.component.html',
  styleUrls: ['./vredemp.component.scss'],
})
export class VredempComponent implements OnInit {
  searchInput: string = '';
  message: any;
  membername: any;
  monthvoucher: any;
  todayvoucher: any;
  vlength: any;
  plength: any;
  image: any;
  imagetype: any;
  productname: any;
  membernames: any;
  createddate: any;
  vouchername: any;
  public scanArr: string[] = [];
  monthArr: string[] = [];
  monthshowArr: string[] = [];
  todayshowArr: string[] = [];
  todayArr: string[] = [];
  todayvoucherArr: string[] = [];
  monthvoucherArr: string[] = [];
  memberArr = [];
  membernameArr: string[] = [];
  todaymemberArr = [];
  monthlymemberArr = [];
  vArr = [];
  pArr = [];
  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    private _compiler: Compiler,
    private form: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  public voucherscan = {
    id: '',
    type: '',
    title: '',
    detail: '',
    discount: 0,
    minspend: '',
    sdate: '',
    edate: '',
    termsandcondition: '',
    voucherid: '',
    status: '',
    quantity: '',
    createddate: '',
    membername: '',
  };
  public monthscan = {
    id: '',
    type: '',
    title: '',
    detail: '',
    discount: 0,
    minspend: '',
    sdate: '',
    edate: '',
    termsandcondition: '',
    voucherid: '',
    status: '',
    quantity: '',
    createddate: '',
    membername: '',
  };
  public todayscan = {
    id: '',
    type: '',
    title: '',
    detail: '',
    discount: 0,
    minspend: '',
    sdate: '',
    edate: '',
    termsandcondition: '',
    voucherid: '',
    status: '',
    quantity: '',
    createddate: '',
    membername: '',
  };
  public member: any = {
    username: '',
  };
  public month = {
    createddate: '',
    quantity: '',
    title: '',
    username: '',
  };
  public points = {
    outletid: '',
    membername: '',
    voucherid: '',
    pointsget: '',
  };
  public pointsandvoucher: any = {
    outletid: '',
    membername: '',
    voucherid: '',
    pointsget: '',
    thumbnail: '',
    thumbnailType: '',
    merchantid: '',
    productname: '',
    createddate: '',
    title: '',
  };
  public todayshowdata = {
    productname: '',
    membername: '',
    createddate: '',
    thumbnail: '',
    thumbnailType: '',
  };
  public monthshowdata: any = {
    productname: '',
    membername: '',
    createddate: '',
    thumbnail: '',
    thumbnailType: '',
    vouchername: '',
  };
  ngOnInit(): void {
    var moutlet = JSON.parse(localStorage.getItem('Moutlet')!);
    this.getScanner(moutlet);
  }

  backnav() {
    this.router.navigate(['/home'])
  }

  getScanner(moutlet: any) {
    var moutlet = JSON.parse(localStorage.getItem('Moutlet')!);
    this.pointsandvoucher.merchantid = moutlet.merchantid;
    this.pointsandvoucher.outletid = moutlet._id;
    this.points.outletid = moutlet._id;
    this.http.post('http://165.22.50.213:3001/getpointsandvoucher', this.pointsandvoucher)  .subscribe((res: any) => {
        this.vArr = res['data'];
        this.pArr = res['data1'];
        console.log(this.monthArr.length);
        this.vlength = res['data'].length;
        this.plength = res['data1'].length;
        console.log(res['data1']);
        console.log(res['data']);
        console.log(this.monthArr);
        var today = new Date();

        var date =
          today.getFullYear() +
          '-' +
          (today.getMonth() + 1) +
          '-' +
          today.getDate();
        var yesterday =
          today.getFullYear() +
          '-' +
          (today.getMonth() + 1) +
          '-' +
          (today.getDate() - 1);
        var monthly =
          today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();
        var year = today.getFullYear();
        var month = today.getMonth() + 1;
        for (var i = 0; i < this.plength; i++) {
          for (var m = 0; m < this.vlength; m++) {
            this.pointsandvoucher = {
              title: '',
              outletid: '',
              membername: '',
              voucherid: '',
              pointsget: '',
              thumbnail: '',
              thumbnailType: '',
              merchantid: '',
              productname: '',
              createddate: '',
            };
            this.pointsandvoucher.outletid = res['data1'][i]['outletid'];
            console.log(this.pointsandvoucher.outletid);
            this.pointsandvoucher.membername = res['data1'][i]['membername'];
            this.pointsandvoucher.createddate = res['data1'][i]['createddate'];
            this.pointsandvoucher.productname = res['data1'][i]['productname'];

            if (this.vArr[m]['_id'] == this.pArr[i]['voucherid']) {
              console.log(this.vArr[m]['_id']);
              console.log(this.pArr[i]['voucherid']);
              this.pointsandvoucher.thumbnail = new Buffer(
                res['data'][m]['thumbnail']['data']
              ).toString('base64');

              this.pointsandvoucher.thumbnailType =
                res['data'][m]['thumbnail']['contentType'];

              this.pointsandvoucher.title = res['data'][m]['title'];

              if (res['data1'][i]['createddate'] == date) {
                this.todayshowArr.push(this.pointsandvoucher);
              } 
              if (res['data1'][i]['createddate'] >= monthly) {
                console.log(monthly)
                this.monthshowArr.push(this.pointsandvoucher);
              }
            }
          }
        }
     
      });
  }
}
