import { Component, OnInit } from '@angular/core';
import { EditorModule } from '@tinymce/tinymce-angular';
import { BrowserModule } from '@angular/platform-browser';
import tinymce from 'tinymce';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { Buffer } from 'buffer';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addMerchant',
  templateUrl: './addMerchant.component.html',
  styleUrls: ['./addMerchant.component.scss']
})

export class AddMerchantComponent implements OnInit {
  message: any;

  valid = [];
  error: number = 0;

  regnoPattern = "[0-9]{12}";
  emailPattern = "^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$";
  contactPattern = "^[0][3]-[0-9]{7,8}$";
  bankaccPattern = "[0-9]{10,12}";
  swiftcodePattern = "[A-Z0-9]{8,11}";

  constructor(private http: HttpClient, private form: FormBuilder, private router:Router) {
    this.srch = [...this.merchants];
  }

  merchants = [];
  public srch = [];
  todayDate = "";

  ngOnInit() {
    this.getmerchantype();
    // this.getBackId();
    // google.maps.event.addDomListener(window, 'load', intilize);
    // function intilize() {
    //   var address = $( "#address").val();
    //   console.log(address)
    //   var autocomplete = new google.maps.places.Autocomplete(address);
    //   google.maps.event.addListener(autocomplete, 'place_changed', function () {
    //     var place = autocomplete.getPlace();
    //     console.log(place.geometry.location)
    //     var location = "<b>Address: </b>" + place.formatted_address + "<br>";
    //     location += "<b>Latitude: </b>" + place.geometry.location.A + "<br>";
    //     location += "<b>Longitude: </b>" + place.geometry.location.F + "<br>";
    //     document.getElementById('lblresult').innerHTML = location;
    //   });

    // }

    $("form").attr('autocomplete', 'off');
    $("input").attr('autocomplete', 'off');

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
  imagesArr = [];
  public image;
  public images;
  public imagetype;
  url = ('../../../assets/img/blankimg.PNG');
  onselectFile(event: any) {
    if (event.target.files) {
      if(event.target.files.length !=0 ){
      var maxFileSize = 1024 * 1024; //1MB


      const file = event.target.files[0];
      if (file.size > maxFileSize) {
        alert('Image too large. Maximum file size is 1MB');
        this.merchant.thumbnail = '';
        this.url = ('../../../assets/img/blankimg.PNG');
      }
      else {
        this.merchant.thumbnail="a"
        this.images = file;
        var reader = new FileReader()
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event: any) => {
          this.url = event.target.result;
        }
      }
      }
    }

  }

  public lastmerchantid;
  addimage() {

    const formData = new FormData();

    formData.append('file', this.images)
    formData.append('companyname', this.merchant.companyname)
    formData.append('regno', this.merchant.regno)
    formData.append('email', this.merchant.email)
    formData.append('contact', this.merchant.contact)
    formData.append('address', this.merchant.address)
    formData.append('fb', this.merchant.fb)
    formData.append('ig', this.merchant.ig)
    formData.append('twitter', this.merchant.twitter)
    formData.append('linkedin', this.merchant.linkedin)
    formData.append('tiktok', this.merchant.tiktok)
    formData.append('bankacc', this.merchant.bankacc)
    formData.append('bankname', this.merchant.bankname)
    formData.append('swiftcode', this.merchant.swiftcode)
    formData.append('status', 'Active')
    formData.append('createdate', this.todayDate)
    formData.append('merchanttype', this.merchant.merchanttype)

    // formData.forEach(file => console.log("File: ", file));
    this.http.post('http://165.22.50.213:3000/upmerchantandimage', formData).subscribe(res => {
      console.log(res);
      this.message = res;
      // window.location.href = "/merchant";
      this.router.navigate(['/merchant'])
    });
  }
  getLastMerchant() {
    this.http.get('http://165.22.50.213:3000/getlastmerch').subscribe(res => {
      this.lastmerchantid = res['data'][0]._id;
      this.addimage();
    });
  }

  public merchant = {
    // id: '',
    thumbnail: '',
    companyname: '',
    // shopname: '',
    regno: '',
    email: '',
    contact: '',
    address: '',
    // operatehrsstart: '',
    // operatehrsend: '',
    // operateday1: '',
    // operateday2: '',
    fb: '',
    ig: '',
    twitter: '',
    linkedin: '',
    tiktok: '',
    bankacc: '',
    bankname: '',
    swiftcode: '',
    status: '',
    createdate: '',
    merchanttype: ''
  };

  sendMerchant() {
    this.error = 0;
    console.log(this.merchant);
    this.validation()
    if (this.error === 0) {
      // this.newMerchant(this.merchant);
      this.addimage();
    }
  }


  newMerchant(merchant) {
    merchant.status = 'Active';
    merchant.createdate = this.todayDate;
    console.log(merchant);

    this.http.post('http://165.22.50.213:3000/addMerchant', merchant).subscribe(res => {
      console.log(res);
      this.message = res;
      this.getLastMerchant();

    });
    setTimeout(() => {
      this.router.navigate(['/merchant'])
      // window.location.href = "/merchant";
    }, 1200);
  }

  public testarr;
  arr = [];
  padLeadingZeros(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }
  merchtype = [];
  getmerchantype() {
    this.http.get('http://165.22.50.213:3000/getmerchanttype').subscribe(res => {
      this.merchtype = res['data'];
      console.log(this.merchtype)
    });
  }

  // getLastMerchant() {
  //   this.http.get('http://165.22.50.213:3000/getlastmerch').subscribe(res => {
  //     this.lastmerchantid = res['data'][0].id;
  //     // console.log(this.lastmerchantid.toString().split('-'));
  //     this.arr = this.lastmerchantid.toString().split('-');
  //     // console.log(this.arr);
  //     this.arr[1] = this.padLeadingZeros((parseInt(this.arr[1]) + 1), 5).toString();
  //     this.lastmerchantid = this.arr.join('-');
  //     console.log(this.lastmerchantid);
  //     this.merchant.id = this.lastmerchantid;
  //   });
  // }
  // getBackId() {
  //   this.getLastMerchant();
  // }

  goBack() {
    window.history.back();
  }

  validation() {
    if (this.merchant.thumbnail === '') {
      this.valid['thumbnail'] = "*Thumbnail is required!";
      this.error++;
    }
    else {
      this.valid['thumbnail'] = ""
    }

    if (this.merchant.merchanttype === '') {
      this.valid['merchanttype'] = "*Merchant Type is required!";
      this.error++;
    }
    else {
      this.valid['merchanttype'] = ""
    }

    if (this.merchant.companyname === '') {
      this.valid['companyname'] = "*Company Name is required!";
      this.error++;
    }
    else {
      this.valid['companyname'] = ""
    }

    if (this.merchant.regno === '') {
      this.valid['regno'] = "*Registration Number is required!";
      this.error++;
    }
    else if (!this.merchant.regno.match(this.regnoPattern)) {
      this.error++;
    }
    else {
      this.valid['regno'] = ""
    }


    //email
    if (this.merchant.email === '') {
      this.valid['email'] = "*Email is required!";
      this.error++;
    }
    else if (!this.merchant.email.match(this.emailPattern)) {
      this.error++;
    }
    else {
      this.valid['email'] = ""
    }

    //contact
    if (this.merchant.contact === '') {
      this.valid['contact'] = "*Contact number is required!";
      this.error++;
    }
    else if (!this.merchant.contact.match(this.contactPattern)) {
      this.error++;
    }
    else {
      this.valid['contact'] = ""
    }

    if (this.merchant.address === '') {
      this.valid['address'] = "*Address is required!";
      this.error++;
    }
    else {
      this.valid['address'] = ""
    }


    if (this.merchant.bankacc === '') {
      this.valid['bankacc'] = "*Bank Account is required!";
      this.error++;
    }
    else if (!this.merchant.bankacc.match(this.bankaccPattern)) {
      this.error++;
    }
    else {
      this.valid['bankacc'] = ""
    }

    if (this.merchant.bankname === '') {
      this.valid['bankname'] = "*Bank Name is required!";
      this.error++;
    }
    else {
      this.valid['bankname'] = ""
    }

    if (this.merchant.swiftcode === '') {
      this.valid['swiftcode'] = "*Swift Code is required!";
      this.error++;
    }
    else if (!this.merchant.swiftcode.match(this.swiftcodePattern)) {
      this.error++;
    }
    else {
      this.valid['swiftcode'] = ""
    }

  }


}


