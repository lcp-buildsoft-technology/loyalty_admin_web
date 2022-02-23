import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import tinymce from 'tinymce';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Loader } from '@googlemaps/js-api-loader';
import { features } from 'process';
import { Buffer } from 'buffer';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.scss']
})

export class MerchantComponent implements OnInit {
  title = 'google-maps';
  
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  message: any;
  valid = [];
  error: number = 0;

  regnoPattern = "[0-9]{12}";
  emailPattern = "^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$";
  contactPattern = "^[03]+-[0-9]{7,8}$";
  bankaccPattern = "[0-9]{10,12}";
  swiftcodePattern = "[A-Z0-9]{8,11}";

  constructor(private modalService: NgbModal, private router:Router,
    private http: HttpClient, private sessionSt: SessionStorageService, private domSanitizer: DomSanitizer) {
    this.srch = [...this.merchants];
  }
  locate;
  merchants = [];
  public srch = [];
  public address = 'AEON Bukit Tinggi';
  public lati;
  public long;

  ngOnInit() {
    this.getSession();
    $(window).scrollTop(0);
    $('#loader').show();
    $('body').css("overflow-y", "hidden");

    let loader = new Loader({
      apiKey: '90c29d80-5198-11ec-a9ad-a56315ed9300'
    })
    var x = loader.apiKey + '&text=' + this.address;

    this.http.get('http://165.22.50.213:3000/addressapikey/' + x).subscribe(res => {
      this.locate = JSON.parse(res['data']);
      this.long = this.locate['features'][0].geometry.coordinates[0]
      this.lati = this.locate['features'][0].geometry.coordinates[1]

      loader.load().then(() => {

        new google.maps.Map(document.getElementById("map"), {
          center: { lat: this.lati, lng: this.long },
          zoom: 20,
        })

      })
    });

    // var city = '';
    // var state = '';
    // var geocoder = new google.maps.Geocoder();
    // var address = city + "," + state;

    // geocoder.geocode({ 'address': address }, function (results, status) {

    //   if (status == google.maps.GeocoderStatus.OK) {
    //     var latitude = results[0].geometry.location.lat();
    //     var longitude = results[0].geometry.location.lng();
    //     let query = "latitude=" + latitude + "&longitude=" + longitude + "&localityLanguage=en";

    //     const Http = new XMLHttpRequest();

    //     let bigdatacloud_api = "https://api.bigdatacloud.net/data/reverse-geocode-client?";

    //     bigdatacloud_api += query;

    //     Http.open("GET", bigdatacloud_api);
    //     Http.send();

    //     Http.onreadystatechange = function () {
    //       if (this.readyState == 4 && this.status == 200) {
    //         let myObj = JSON.parse(this.responseText);

    //         state = myObj.principalSubdivision
    //         city = myObj.locality
    //         city = city.replace("Municipal Council", "");

    //       }
    //     };
    //   }
    // });

    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      lengthMenu: [5, 10, 20]
    };
    this.getmerchantype();
    this.getMerchant();
    $("form").attr('autocomplete', 'off');

  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  nextpage(id) {
    // window.location.href = "/onlineStore?id=" + id;
    const osurl = "/onlineStore?id=" + id;
    console.log(osurl)
    this.router.navigateByUrl(osurl)
  }

  public image;
  public imagetype;
  open(content) {
    this.modalService.open(content, { scrollable: true }).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
  }

  image1arr = [];
  imagesArr = []
  imagetypearr = [];
  public imagenewsid;
  opnimage(content, merchant) {

    this.imagesArr[0] = merchant;
    this.image1arr[0] = new Buffer(this.imagesArr[0].thumbnail.data).toString('base64');
    this.imagetypearr[0] = this.imagesArr[0].thumbnail.contentType;

    const modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
  }

  openEdit(content, merchant) {
    $('#newimg').hide();
    this.editmerchant = {
      id: merchant._id,
      thumbnail: merchant.thumbnail,
      companyname: merchant.companyname,
      regno: merchant.regno,
      // operatehrsstart: merchant.operatehrsstart,
      // operatehrsend: merchant.operatehrsend,
      // operateday1: merchant.operateday1,
      // operateday2: merchant.operateday2,
      email: merchant.email,
      contact: merchant.contact,
      address: merchant.address,
      fb: merchant.fb,
      ig: merchant.ig,
      twitter: merchant.twitter,
      linkedin: merchant.linkedin,
      tiktok: merchant.tiktok,
      bankacc: merchant.bankacc,
      bankname: merchant.bankname,
      swiftcode: merchant.swiftcode,
      status: merchant.status,
      createdate: merchant.createdate,
      merchanttype: merchant.merchanttype
    }
    $('#newimg').hide();
    this.image = new Buffer(merchant.thumbnail.data).toString('base64');
    this.imagetype = merchant.thumbnail.contentType;
    this.images = merchant.thumbnail;
    this.ogthumb = merchant.thumbnail;

    $('#merchanttypee [value="' + merchant.merchanttype + '"]').attr('selected', 'true');
    this.modalService.open(content, { scrollable: true }).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
  }

  public merchant = {
    id: '',
    thumbnail: [],
    companyname: '',
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

  public editmerchant = {
    id: '',
    thumbnail: [],
    companyname: '',
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

  getMerchant() {
    this.http.get('http://165.22.50.213:3000/getmerchantandimage').subscribe(res => {
      this.merchants = res['data'];
      this.dtTrigger.next(void 0);
      $('#loader').hide();
      $('#loader-wrapper').hide();
      $('#loader-inner').hide();
      $('body').css("overflow-y", "visible");
    });
  }
  merchtype = [];
  getmerchantype() {
    this.http.get('http://165.22.50.213:3000/getmerchanttype').subscribe(res => {
      this.merchtype = res['data'];
    });
  }

  editMerchant(merchant) {
    const formData = new FormData();
    formData.append('file', this.images)
    formData.append('id', merchant.id)
    formData.append('companyname', merchant.companyname)
    formData.append('regno', merchant.regno)
    formData.append('email', merchant.email)
    formData.append('contact', merchant.contact)
    formData.append('address', merchant.address)
    formData.append('fb', merchant.fb)
    formData.append('ig', merchant.ig)
    formData.append('twitter', merchant.twitter)
    formData.append('linkedin', merchant.linkedin)
    formData.append('tiktok', merchant.tiktok)
    formData.append('bankacc', merchant.bankacc)
    formData.append('bankname', merchant.bankname)
    formData.append('swiftcode', merchant.swiftcode)
    formData.append('status', merchant.status)
    formData.append('createdate', merchant.createdate)
    formData.append('merchanttype', merchant.merchanttype)

    // formData.forEach(file => console.log("File: ", file));
    this.http.post('http://165.22.50.213:3000/editmerchantandimage', formData).subscribe(res => {
      this.message = res;
      // window.location.reload();
      
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/merchant'])

      // window.location.href = "/merchant";
    });

    // this.http.post('http://165.22.50.213:3000/editmerchant', merchant).subscribe(res => {
    //   this.message = res;
    // });
    // window.location.reload();
  }

  public ogthumb;
  url;
  public images;
  oneditselectFile(event: any) {
    if (event.target.files) {
      if (event.target.files.length != 0) {
      // const file = event?.target.files[0];
      // this.images=file;
      var maxFileSize = 1024 * 1024; //1MB

      const file = event.target.files[0];

      if (file.size > maxFileSize) {
        alert('Image too large. Maximum file size is 1MB');
        this.editmerchant.thumbnail = this.ogthumb;
      }
      else {
        this.images = file;
        $('#newimg').show();
        $('#ogimg').hide();
        var reader = new FileReader()
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event: any) => {
          this.url = event.target.result;
          this.ogthumb = this.editmerchant.thumbnail;
        }
      }

      }
    }

  }
  addimage(id) {
    const formData = new FormData();

    formData.append('file', this.images)
    formData.append('id', id)

    // formData.forEach(file => console.log("File: ", file));
    this.http.post('http://165.22.50.213:3000/editimage', formData).subscribe(res => {
      this.message = res;
    });
  }

  validation() {
    // if (this.merchant.thumbnail.length === 0) {
    //   this.valid['thumbnail'] = "*Thumbnail is required!";
    //   this.error++;
    // }
    // else {
    //   this.valid['thumbnail'] = ""
    // }

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

  public sessionid;
  getSession() {
    this.sessionid = this.sessionSt.retrieve("_UUID");
    this.adminid = this.sessionid;
    this.findrole();
  }

  public adminid;
  public adminrole;
  public thisedit = false;
  public thisdelete = false;
  public thisadd = false;
  public thisview = false;
  public thisexport = false;
  findrole() {
    this.http.get('http://165.22.50.213:3000/getaadminuser/' + this.adminid).subscribe(res => {
      this.adminrole = res['data'][0].merch;
      var x = this.adminrole.split('-');
      if (x[0] == '1') {//view
        $("[name='viewclass']").show();
        this.thisview = true;
      }
      if (x[1] == '1') {//edit
        $("[name='editclass']").show();
        this.thisedit = true;
      }
      if (x[2] == '1') {//add
        $("[name='addclass']").show();
        this.thisadd = true;
      }
      if (x[3] == '1') {//delete
        $("[name='deletclass']").show();
        this.thisdelete = true;
      }
      if (x[4] == '1') {//export
        $("[name='exportclass']").show();
        this.thisexport = true;
      }

    });

  }

}