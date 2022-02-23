import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Buffer } from 'buffer';
import { FormBuilder } from '@angular/forms';
import tinymce from 'tinymce';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditorModule } from '@tinymce/tinymce-angular';
import * as $ from 'jquery';
import { AnyRecordWithTtl } from 'dns';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

declare var angular: any;

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})

export class InvoiceComponent implements OnInit {
  message: any;
  content: any;
  imagesArr = [];
  voucherArr = [];
  lastvoucherArr = []
  new: Object | undefined;

  public srch = [];
  public lastvoucherid: any;
  image: any
  images: any
  imagetype: any
  valid: string[] = [];
  todayDate: any

  discountPattern ="^[0-9]{1,4}$";
  spendPattern ="^[0-9]{1,5}$";

  error: number = 0;
  constructor(private modalService: NgbModal, private http: HttpClient, private form: FormBuilder, private router: Router,private route: ActivatedRoute) {
    this.srch = [...this.voucherArr];
  }

  public voucher = {
    title: '',
    sdate: '',
    edate: '',
    thumbnail: '',
    quantity: '',
    discount: '',
    merchantid: '',
    minspend: '',
    termsandcondition: '',
    type: '',
    status: 'Active',
    detail: ''
  };

  ngOnInit() {
    var mlogin = JSON.parse(localStorage.getItem('Mlogin')!);
    console.log(mlogin.merchantid)

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

  backnav() {
    this.router.navigate(['/payment'])
  }

  url = ("../../../../assets/img/blankimage.png");
  onselectFile(e: any) {
    if (e.target.files) {
      const file = e.target.files[0];
      this.images = file;
      var reader = new FileReader()
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
    }
  }
  sendData() {
    this.error = 0;
    this.valid = this.validation();
    console.log(this.error)
    if (this.error < 1) {
      this.addimage()
    }
  }

  registerVoucher(voucher: any) {
    var mlogin = JSON.parse(localStorage.getItem('Mlogin')!);
    const formData = new FormData();

    formData.append('file', this.images)
    formData.forEach(file => console.log("File: ", file));
    voucher.img = formData;
    this.voucher.merchantid = mlogin.merchantid
    this.http.post('http://165.22.50.213:3001/addvoucher', voucher).subscribe(res => {
      console.log(res);
      this.message = res;
    });
    this.getlastvoucher();
  }
  
  addimage() {
    const formData = new FormData();
    var mlogin = JSON.parse(localStorage.getItem('Mlogin')!);
    formData.append('title', this.voucher.title)
    formData.append('sdate', this.voucher.sdate)
    formData.append('edate', this.voucher.edate)
    formData.append('file', this.images)
    formData.append('quantity', this.voucher.quantity)
    formData.append('discount', this.voucher.discount)
    formData.append('merchantid', mlogin.merchantid)
    formData.append('minspend', this.voucher.minspend)
    formData.append('termsandcondition', this.voucher.termsandcondition)
    formData.append('type', this.voucher.type)
    formData.append('status', "Active")
    formData.append('detail', this.voucher.detail)
    formData.forEach(file => console.log("File: ", file));
    console.log(formData)
    this.http.post('http://165.22.50.213:3001/upvoucherandimage', formData).subscribe(res => {
      console.log(res);
      this.message = res;
      this.router.navigate(['/payment'])
    });
  }

  getlastvoucher() {
    this.http.get('http://165.22.50.213:3001/getlastvoucher').subscribe((res: any) => {
      this.lastvoucherArr = res['data'];
      console.log(this.lastvoucherArr)
      console.log(this.lastvoucherArr[0]['title'])

      this.lastvoucherid = this.lastvoucherArr[0]['_id']
      this.addimage()
    });
  }

  getVoucher() {
    this.http.get('http://165.22.50.213:3001/getvouchers').subscribe(res => {
      console.log(res);
      this.new = res;
      console.log(this.new);
    });
  }

  openToPayment() {
    this.router.navigate(['/payment'])

  }

  validation() {
    //title
    if (this.voucher.title === '') {
      this.valid['title'] = "*Please enter the title!";
      this.error++;
    }
    else {
      this.valid['title'] = ""
    }

    //detail
    if (this.voucher.detail === '') {
      this.valid['detail'] = "*Please enter the detail!";
      this.error++;
    }
    else {
      this.valid['detail'] = ""
    }

    //type
    if (this.voucher.type === '') {
      this.valid['type'] = "*Please select a type!";
      this.error++;
    }
    else {
      this.valid['type'] = ""
    }

    //quantity
    if (this.voucher.quantity === '') {
      this.valid['quantity'] = "*Please enter the voucher quantity!";
      this.error++;
    }
    else {
      this.valid['quantity'] = ""
    }

    //tnc
    if (this.voucher.termsandcondition === '') {
      this.valid['termsandcondition'] = "*Please enter the Terms and Condition!";
      this.error++;
    }
    else {
      this.valid['termsandcondition'] = ""
    }

    //start date
    if (this.voucher.sdate === '') {
      this.valid['sdate'] = "*Please select a start date!";
      this.error++;
    }
    else if (this.voucher.sdate < this.todayDate) {
      this.valid['sdate'] = "*Invalid Start Date!";
      this.error++;
    }
    else {
      this.valid['sdate'] = ""
    }

    //end date
    if (this.voucher.edate === '') {
      this.valid['edate'] = "*End date is required!";
      this.error++;
    }
    else if (this.voucher.edate < this.voucher.sdate) {
      this.valid['edate'] = "*Invalid End Date!";
      this.error++;
    }
    else {
      this.valid['edate'] = ""
    }

    //status
    if (this.voucher.status === '') {
      this.valid['status'] = "*Please select the status!";
      this.error++;
    }
    else {
      this.valid['status'] = ""
    }

    //discount
    if (this.voucher.discount === '') {
      this.valid['discount'] = "*Please enter the discount!";
      this.error++;
    }
    else if (!this.voucher.discount.match(this.discountPattern) ) {
      this.error++;
    }
    else {
      this.valid['discount'] = ""
    }

    //minimum spend
    if (this.voucher.minspend === '') {
      this.valid['minspend'] = "*Please enter the minimum spend!";
      this.error++;
    }
    else if (!this.voucher.minspend.match(this.spendPattern) ) {
      this.error++;
    }
    else {
      this.valid['minspend'] = ""
    }

    return this.valid;
  }


}
