import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import tinymce from 'tinymce';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { debugOutputAstAsTypeScript } from '@angular/compiler';
import { Buffer } from 'buffer';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Loader } from '@googlemaps/js-api-loader';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onlineStore',
  templateUrl: './onlineStore.component.html',
  styleUrls: ['./onlineStore.component.scss']
})

export class OnlineStoreComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger1: Subject<any> = new Subject();
  dtTrigger2: Subject<any> = new Subject();
  dtTrigger3: Subject<any> = new Subject();

  message: any;
  valid = [];
  error: number = 0;
  uvalid = [];
  uerror: number = 0;
  pvalid = [];
  perror: number = 0;
  ovalid =[];
  oerror:number=0;

  //Add User
  pwdPattern = "^(?=.*?[0-9])(?=.*?[a-z])[a-z0-9_-]{8,15}$";
  emailPattern = "^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$";
  contactPattern = "^[0][1][0-9]+-[0-9]{7,8}$";
  pricePattern = "^[0-9.]{2,8}";
  productcategory = [];

  constructor(private modalService: NgbModal, private http: HttpClient, private router:Router,
    private form: FormBuilder,private sessionSt: SessionStorageService) {
    this.srch = [...this.merchants];
    this.srch = [...this.merchantusers];
    this.srch = [...this.onlinestores];
    this.srch = [...this.outlets];
  }

  public id;
  merchants = [];
  merchantusers = [];
  onlinestores = [];
  outlets = [];
  public srch = [];
  todayDate = "";

  locate;
  // public address = 'AEON Bukit Tinggi';
  public lati;
  public long;

  ngOnInit() {
    this.getSession();
    // $('.content').hide();
    $('#loader').show();
    $('body').css("overflow-y", "hidden");

    $('#newimg').hide();
    $('#newimgoutlet').hide();
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      lengthMenu: [5, 10, 20]
    };
    $("form").attr('autocomplete', 'off');
    var url = document.URL;
    this.id = /id=([^&]+)/.exec(url)[1]
    this.getMerchant();
    this.getMerchantUser();
    this.getOnlineStore();
    this.getOutlet();


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
    // $('#createddate').attr('value', todayDate);
    // $('#updateddate').attr('value', todayDate);

    this.getproductcategory();
  }

  getproductcategory() {
    this.http.get('http://165.22.50.213:3000/getproductcategory').subscribe(res => {
      this.productcategory = res['data'];
    });
  }

  public thisadmin;
  public sessionid;
  getSession() {
    this.sessionid = this.sessionSt.retrieve("_UUID");
    this.thisadmin = this.sessionid;
    this.getAdminName();
    this.findrole();
  }
  adminname = [];
  public name;
  public adminid;
  public adminrole;
  public thisedit = false;
  public thisdelete = false;
  public thisadd = false;
  public thisview = false;
  public thisexport = false;
  getAdminName() {
    this.http.get('http://165.22.50.213:3000/getadminname/' + this.sessionid).subscribe(res => {
      this.adminname = res['data'];
      this.name = this.adminname[0].name
    });
  }
  findrole() {
    this.http.get('http://165.22.50.213:3000/getaadminuser/' + this.thisadmin).subscribe(res => {
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

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger1.unsubscribe();
    this.dtTrigger2.unsubscribe();
    this.dtTrigger3.unsubscribe();
  }
  image1arr = [];
  imagetypearr = [];
  imagesArr = [];
  public imagenewsid;
  opnimage(content, product) {

    this.imagesArr[0] = product;
    this.image1arr[0] = new Buffer(this.imagesArr[0].thumbnail.data).toString('base64');
    this.imagetypearr[0] = this.imagesArr[0].thumbnail.contentType;

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });

  }

  openmap(content, lati) {

    var y = lati.split(',');
    this.lati = parseFloat(y[0]);
    this.long = parseFloat(y[1]);
    let loader = new Loader({
      apiKey: '90c29d80-5198-11ec-a9ad-a56315ed9300'
    })

    var x = loader.apiKey + '&point.lat=' + this.lati.toString() + '&point.lon=' + this.long.toString();

    this.http.get('http://165.22.50.213:3000/addressapikey/' + x).subscribe(res => {
      this.locate = JSON.parse(res['data']);

      loader.load().then(() => {

        new google.maps.Map(document.getElementById("map"), {
          center: { lat: this.lati, lng: this.long },
          zoom: 20,
        })

      })
    });

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
  }

  public merchant = {
    id: '',
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
    merchanttype: ''
  };
  getMerchant() {
    this.http.get('http://165.22.50.213:3000/getmerchant').subscribe(res => {
   
      // $('.content').show();

      this.merchants = res['data'];
      for (var i = 0; i < this.merchants.length; i++) {
        if (this.merchants[i]._id == this.id) {
          this.merchant = {
            id: this.merchants[i]._id,
            thumbnail: this.merchants[i].thumbnail,
            companyname: this.merchants[i].companyname,
            // shopname: this.merchants[i].shopname,
            regno: this.merchants[i].regno,
            email: this.merchants[i].email,
            contact: this.merchants[i].contact,
            address: this.merchants[i].address,
            // operatehrsstart: this.merchants[i].operatehrsstart,
            // operatehrsend: this.merchants[i].operatehrsend,
            // operateday1: this.merchants[i].operateday1,
            // operateday2: this.merchants[i].operateday2,
            fb: this.merchants[i].fb,
            ig: this.merchants[i].ig,
            twitter: this.merchants[i].twitter,
            linkedin: this.merchants[i].linkedin,
            tiktok: this.merchants[i].tiktok,
            bankacc: this.merchants[i].bankacc,
            bankname: this.merchants[i].bankname,
            swiftcode: this.merchants[i].swiftcode,
            status: this.merchants[i].status,
            merchanttype: this.merchants[i].merchanttype
          };
        }
      }
    });
  }

  // ---------------------------------- Merchant User -----------------------------------------
  public merchantuser = {
    merchantid: '',
    id: '',
    email: '',
    pwd: '',
    cfmpwd: '',
    name: '',
    createdby: '',
    createddate: '',
    updatedby: '',
    updateddate: '',
    contact: '',
    status: '',
  }

  public editmerchantuser = {
    merchantid: '',
    id: '',
    email: '',
    pwd: '',
    cfmpwd: '',
    name: '',
    createdby: '',
    createddate: '',
    updatedby: '',
    updateddate: '',
    contact: '',
    status: '',
  }

  sendMerchantUser() {
    this.error = 0;

    this.validation()
    if (this.error === 0) {
      this.newMerchantUser(this.merchantuser);
    }

  }

  newMerchantUser(merchantuser) {
   
    merchantuser.createdby = this.name
    merchantuser.updatedby = '-';
    merchantuser.merchantid = this.id;
    merchantuser.status = 'Active';
    merchantuser.createddate = this.todayDate;
    merchantuser.updateddate = this.todayDate;

    this.http.post('http://165.22.50.213:3000/addmerchantuser', merchantuser).subscribe(res => {

      this.message = res['msg'];
      if(this.message == 'DUP'){
        alert("Email already exist! Please try another one.")
      }
      else{
        // window.location.reload();
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        const osurl = "/onlineStore?id=" + this.id;
        console.log(osurl)
        this.router.navigateByUrl(osurl)
        // this.router.navigate(['/onlineStore'])

      }
    });
  }
  counter(i: number) {
    return new Array(i);
  }

  usermerchant = [];
  getMerchantUser() {

    this.http.get('http://165.22.50.213:3000/getmerchantuser').subscribe(res => {
      this.merchantusers = res['data'];

      var j = 0;
      for (var i = 0; i < this.merchantusers.length; i++) {
        if (this.merchantusers[i].merchantid == this.id) {

          this.usermerchant[j] = this.merchantusers[i];
          j++;
        }
      }
      this.dtTrigger1.next(void 0);
    });
  }

  editMerchantUser(merchantuser) {
    merchantuser.updateddate = this.todayDate;
    merchantuser.updatedby = this.name
  
    this.uerror = 0;
    this.validation2();
    if (this.editmerchantuser.pwd != "" || this.editmerchantuser.cfmpwd != ""){
            //password
      if (this.editmerchantuser.pwd === '') {
        this.uvalid['pwd'] = "*Password is required!";
        this.uerror++;
      }
      else if (!this.editmerchantuser.pwd.match(this.pwdPattern)) {
        this.uerror++;
      }
      else {
        this.uvalid['pwd'] = "";
              //confirm password
        if (this.editmerchantuser.cfmpwd === '') {
          this.uvalid['cfmpwd'] = "*Confirm password is required!";
          this.uerror++;
        }
        else if (this.editmerchantuser.cfmpwd != this.editmerchantuser.pwd) {
          this.uvalid['cfmpwd'] = "*Please enter the same password!";
          this.uerror++;
        }
        else {
          this.uvalid['cfmpwd'] = "";
          if (this.uerror === 0) {
            this.http.post('http://165.22.50.213:3000/editmerchantuser', merchantuser).subscribe(res => {
             
              this.message = res;
              // window.location.reload();
              this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        const osurl = "/onlineStore?id=" + this.id;
        console.log(osurl)
        this.router.navigateByUrl(osurl)

            });
          }
        }
      }
    }
    else{
      this.http.post('http://165.22.50.213:3000/editmerchantuser', merchantuser).subscribe(res => {
   
        this.message = res;
        // window.location.reload();
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        const osurl = "/onlineStore?id=" + this.id;
        console.log(osurl)
        this.router.navigateByUrl(osurl)
      });
    }
  }

  openEdit(content, merchantuser) {

    this.editmerchantuser = {
      merchantid: this.id,
      id: merchantuser._id,
      email: merchantuser.email,
      pwd: "",
      cfmpwd: "",
      name: merchantuser.name,
      createdby: merchantuser.createdby,
      createddate: merchantuser.createddate,
      updatedby: merchantuser.updatedby,
      updateddate: merchantuser.updateddate,
      contact: merchantuser.contact,
      status: merchantuser.status,
    }
    $('#status [value=' + merchantuser.status + ']').attr('selected', 'true');

    this.modalService.open(content, { scrollable: true }).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
  }
  public image;
  public imagetype
  openEdit2(content, onlinestore) {
    $('#newimg').hide();
 
    this.editonlinestore = {
      merchantid: this.id,
      id: onlinestore._id,
      thumbnail: onlinestore.thumbnail,
      categories: onlinestore.categories,
      name: onlinestore.name,
      outletid: onlinestore.outletid,
      redemp: onlinestore.redemp,
      description: onlinestore.description,
      price: onlinestore.price,
      status: onlinestore.status,
      // availability: onlinestore.availability,
      tnc: onlinestore.tnc,
    }

    $('#newimg').hide();
    this.image = new Buffer(onlinestore.thumbnail.data).toString('base64');
    this.imagetype = onlinestore.thumbnail.contentType;
    this.images = onlinestore.thumbnail;
    this.ogthumb = onlinestore.thumbnail;
    // this.image = new Buffer(this.imagesArr[0].thumbnail.data).toString('base64');
    // this.imagetype = this.imagesArr[0].thumbnail.contentType;

    // $('#status [value=' + onlinestore.availability + ']').attr('selected', 'true');

    this.modalService.open(content, { scrollable: true }).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
  }
  public ogthumb;
  url;
  public images;
  oneditselectFile(event: any) {
    if (event.target.files) {
      if (event.target.files.length != 0) {
      var maxFileSize = 1024 * 1024; //1MB

      const file = event.target.files[0];
      if (file.size > maxFileSize) {
        alert('Image too large. Maximum file size is 1MB');
        this.editonlinestore.thumbnail = this.ogthumb;
      }
      else {
        this.images = file;
        $('#newimg').show();
        $('#ogimg').hide();
        var reader = new FileReader()
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event: any) => {
          this.url = event.target.result;
          this.ogthumb = this.editonlinestore.thumbnail;
        }
      }

      }
    }

  }
  oneditoutletselectFile(event: any) {
    if (event.target.files) {
      if (event.target.files.length != 0) {
      var maxFileSize = 1024 * 1024; //1MB

      const file = event.target.files[0];
      if (file.size > maxFileSize) {
        alert('Image too large. Maximum file size is 1MB');
        this.editonlinestore.thumbnail = this.ogthumb;

      }
      else {
        this.images = file;
        $('#newimgoutlet').show();
        $('#ogoutletimg').hide();
        var reader = new FileReader()
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event: any) => {
          this.url = event.target.result;
          this.ogthumb = this.editonlinestore.thumbnail;
        }
      }

      }
    }
    
  }
  openEdit3(content, outlet) {
    $('#newimgoutlet').hide();

    this.editoutlet = {
      merchantid: this.id,
      id: outlet._id,
      shopname: outlet.shopname,
      address: outlet.address,
      phone: outlet.phone,
      // whatsapp: outlet.whatsapp,
      email: outlet.email,
      operatehrsstart: outlet.operatehrsstart,
      operatehrsend: outlet.operatehrsend,
      operateday1: outlet.operateday1,
      operateday2: outlet.operateday2,
      description: outlet.description,
      latlong: outlet.latlong,
      thumbnail: outlet.thumbnail,
    }
    $('#newimgoutlet').hide();
    this.image = new Buffer(outlet.thumbnail.data).toString('base64');
    this.imagetype = outlet.thumbnail.contentType;
    this.images = outlet.thumbnail;
    this.ogthumb = outlet.thumbnail;

    this.modalService.open(content, { scrollable: true }).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
  }

  add(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
  }

  open(content, merchantuser) {
    this.editmerchantuser = {
      merchantid: this.id,
      id: merchantuser._id,
      email: merchantuser.email,
      pwd: merchantuser.pwd,
      cfmpwd: merchantuser.cfmpwd,
      name: merchantuser.name,
      createdby: merchantuser.createdby,
      createddate: merchantuser.createddate,
      updatedby: merchantuser.updatedby,
      updateddate: merchantuser.updateddate,
      contact: merchantuser.contact,
      status: merchantuser.status,
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
  }

  open2(content, onlinestore) {
    this.editonlinestore = {
      merchantid: onlinestore.id,
      outletid: onlinestore.outletid,
      redemp: onlinestore.redemp,
      id: onlinestore._id,
      thumbnail: onlinestore.thumbnail,
      categories: onlinestore.categories,
      name: onlinestore.name,
      description: onlinestore.description,
      price: onlinestore.price,
      status: onlinestore.status,
      // availability: onlinestore.availability,
      tnc: onlinestore.tnc,
    }
    this.imagesArr[0] = onlinestore;
    this.image1arr[0] = new Buffer(this.imagesArr[0].thumbnail.data).toString('base64');
    this.imagetypearr[0] = this.imagesArr[0].thumbnail.contentType;

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
  }

  open3(content, outlet) {
    this.editoutlet = {
      merchantid: this.id,
      id: outlet._id,
      shopname: outlet.shopname,
      address: outlet.address,
      phone: outlet.phone,
      // whatsapp: outlet.whatsapp,
      email: outlet.email,
      operatehrsstart: outlet.operatehrsstart,
      operatehrsend: outlet.operatehrsend,
      operateday1: outlet.operateday1,
      operateday2: outlet.operateday2,
      description: outlet.description,
      latlong: outlet.latlong,
      thumbnail: outlet.thumbnail,
    }
    this.imagesArr[0] = outlet;
    this.image1arr[0] = new Buffer(this.imagesArr[0].thumbnail.data).toString('base64');
    this.imagetypearr[0] = this.imagesArr[0].thumbnail.contentType;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
  }

  validation() {
    //name
    if (this.merchantuser.name === '') {
      this.valid['name'] = "*Name is required!";
      this.error++;
    }
    else {
      this.valid['name'] = ""
    }

    //contact number
    if (this.merchantuser.contact === '') {
      this.valid['contact'] = "*Contact number is required!";
      this.error++;
    }
    else if (!this.merchantuser.contact.match(this.contactPattern)) {
      this.error++;
    }
    else {
      this.valid['contact'] = ""
    }

    //email
    if (this.merchantuser.email === '') {
      this.valid['email'] = "*Email is required!";
      this.error++;
    }
    else if (!this.merchantuser.email.match(this.emailPattern)) {
      this.error++;
    }
    else {
      this.valid['email'] = ""
    }

    //password
    if (this.merchantuser.pwd === '') {
      this.valid['pwd'] = "*Password is required!";
      this.error++;
    }
    else if (!this.merchantuser.pwd.match(this.pwdPattern)) {
      this.error++;
    }
    else {
      this.valid['pwd'] = ""
    }

    //confirm password
    if (this.merchantuser.cfmpwd === '') {
      this.valid['cfmpwd'] = "*Confirm password is required!";
      this.error++;
    }
    else if (this.merchantuser.cfmpwd != this.merchantuser.pwd) {
      this.valid['cfmpwd'] = "*Please enter the same password!";
      this.error++;
    }
    else {
      this.valid['cfmpwd'] = ""
    }

  }

  validation2() {
    //name
    if (this.editmerchantuser.name === '') {
      this.uvalid['name'] = "*Name is required!";
      this.uerror++;
    }
    else {
      this.uvalid['name'] = ""
    }

    //contact number
    if (this.editmerchantuser.contact === '') {
      this.uvalid['contact'] = "*Contact number is required!";
      this.uerror++;
    }
    else if (!this.editmerchantuser.contact.match(this.contactPattern)) {
      this.uerror++;
    }
    else {
      this.uvalid['contact'] = ""
    }

    //email
    if (this.editmerchantuser.email === '') {
      this.uvalid['email'] = "*Email is required!";
      this.uerror++;
    }
    else if (!this.editmerchantuser.email.match(this.emailPattern)) {
      this.uerror++;
    }
    else {
      this.uvalid['email'] = ""
    }
  }


  // -------------------------------- Online Store --------------------------------------
  public onlinestore = {
    merchantid: '',
    id: '',
    thumbnail: '',
    categories: '',
    name: '',
    description: '',
    price: '',
    // availability: '',
    tnc: '',
  }

  public editonlinestore = {
    merchantid: '',
    outletid: '',
    redemp: '',
    id: '',
    thumbnail: [],
    categories: '',
    name: '',
    description: '',
    price: '',
    status: '',
    // availability: '',
    tnc: '',
  }


  sendOnlineStore() {
    this.newOnlineStore(this.onlinestore);
  }

  newOnlineStore(onlinestore) {
    onlinestore.merchantid = this.id;
    // onlinestore.availability = 'Available';
    // window.location.reload();
    

    this.http.post('http://165.22.50.213:3000/addonlinestore', onlinestore).subscribe(res => {
  
      this.message = res;
    });
  }
  storeonline = [];
  getOnlineStore() {
    this.http.get('http://165.22.50.213:3000/getonlinestore').subscribe(res => {
      this.onlinestores = res['data'];
      var j = 0;
      for (var i = 0; i < this.onlinestores.length; i++) {
        if (this.onlinestores[i].merchantid == this.id) {

          this.storeonline[j] = this.onlinestores[i];
          j++;
        }
      }
      this.dtTrigger2.next(void 0);
   
      $('#loader').hide();
      $('#loader-wrapper').hide();
      $('#loader-inner').hide();
      $('body').css("overflow-y", "visible");
    });
  }

  editOnlineStore(onlinestore) {
    this.perror = 0;
    this.validation3();

    if (this.perror === 0) {
      // this.http.post('http://165.22.50.213:3000/editonlinestore', onlinestore).subscribe(res => {
      //   console.log(res);
      //   this.message = res;
      this.addimage();
      //   // window.location.reload();
      // });
    }
  }
  addimage() {
    const formData = new FormData();

    formData.append('file', this.images)
    formData.append('merchantid', this.editonlinestore.merchantid)
    formData.append('outletid', this.editonlinestore.outletid)
    formData.append('redemp', this.editonlinestore.redemp)
    formData.append('categories', this.editonlinestore.categories)
    formData.append('name', this.editonlinestore.name)
    formData.append('description', this.editonlinestore.description)
    formData.append('price', this.editonlinestore.price)
    formData.append('tnc', this.editonlinestore.tnc)
    formData.append('status', this.editonlinestore.status)
    formData.append('id', this.editonlinestore.id)


    // formData.forEach(file => console.log("File: ", file));
    this.http.post('http://165.22.50.213:3000/editonlinestoreandimage', formData).subscribe(res => {
      console.log(res);
      this.message = res;
      // window.location.reload();
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        const osurl = "/onlineStore?id=" + this.id;
        console.log(osurl)
        this.router.navigateByUrl(osurl)
    });
  }


  validation3() {
    // if (this.editonlinestore.thumbnail === '') {
    //   this.pvalid['title'] = "*Thumbnail  is required!";
    //   this.perror++;
    // }
    // else {
    //   this.pvalid['thumbnail'] = ""
    // }

    if (this.editonlinestore.categories === '') {
      this.pvalid['categories'] = "*Categories is required!";
      this.perror++;
    }
    else {
      this.pvalid['categories'] = ""
    }

    if (this.editonlinestore.name === '') {
      this.pvalid['name'] = "*Name is required!";
      this.perror++;
    }
    else {
      this.pvalid['name'] = ""
    }

    if (this.editonlinestore.description === '') {
      this.pvalid['description'] = "*Description is required!";
      this.perror++;
    }
    else {
      this.pvalid['description'] = ""
    }

    if (this.editonlinestore.price === '') {
      this.pvalid['price'] = "*Price is required!";
      this.perror++;
    }
    else if (!this.editonlinestore.price.match(this.pricePattern)) {
      this.perror++;
    }
    else {
      this.pvalid['price'] = ""
    }

    if (this.editonlinestore.tnc === '') {
      this.pvalid['tnc'] = "*Terms and Conditions is required!";
      this.perror++;
    }
    else {
      this.pvalid['tnc'] = ""
    }
  }


  // -------------------------------- Outlet --------------------------------------
  public outlet = {
    merchantid: '',
    id: '',
    shopname: '',
    address: '',
    phone: '',
    // whatsapp: '',
    email: '',
    operatehrsstart: '',
    operatehrsend: '',
    operateday1: '',
    operateday2: '',
    description: '',
    latlong: '',
    thumbnail: []
  }

  public editoutlet = {
    merchantid: '',
    id: '',
    shopname: '',
    address: '',
    phone: '',
    // whatsapp: '',
    email: '',
    operatehrsstart: '',
    operatehrsend: '',
    operateday1: '',
    operateday2: '',
    description: '',
    latlong: '',
    thumbnail: []
  }

  sendOutlet() {
    this.newOutlet(this.outlet);
  }

  newOutlet(outlet) {
    outlet.merchantid = this.id;
    // window.location.reload();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        const osurl = "/onlineStore?id=" + this.id;
        console.log(osurl)
        this.router.navigateByUrl(osurl)
 
    this.http.post('http://165.22.50.213:3000/addoutlet', outlet).subscribe(res => {
     
      this.message = res;
    });
  }

  letsout = [];
  getOutlet() {
  
    this.http.get('http://165.22.50.213:3000/getoutlet').subscribe(res => {
      this.outlets = res['data'];
      var j = 0;
 
      for (var i = 0; i < this.outlets.length; i++) {
        if (this.outlets[i].merchantid == this.id) {

          this.letsout[j] = this.outlets[i];
          j++;
        }
      }
      this.dtTrigger3.next(void 0);
    });
  }

  editOutlet(outlet) {
    this.oerror = 0;
    this.validation4();
  

  if(this.oerror === 0){
    const formData = new FormData();
   
    formData.append('file', this.images)
    formData.append('id', outlet.id)
    formData.append('merchantid', outlet.merchantid)
    formData.append('shopname', outlet.shopname)
    formData.append('email', outlet.email)
    formData.append('phone', outlet.phone)
    formData.append('address', outlet.address)
    formData.append('operatehrsstart', outlet.operatehrsstart)
    formData.append('operatehrsend', outlet.operatehrsend)
    formData.append('operateday1', outlet.operateday1)
    formData.append('operateday2', outlet.operateday2)
    formData.append('description', outlet.description)
    formData.append('latlong', outlet.latlong)

    // formData.forEach(file => console.log("File: ", file));
    this.http.post('http://165.22.50.213:3000/editoutletandimage', formData).subscribe(res => {


      this.message = res;
      // window.location.reload();
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        const osurl = "/onlineStore?id=" + this.id;
        console.log(osurl)
        this.router.navigateByUrl(osurl)
    });

    
  }
}

validation4() {

  if (this.editoutlet.shopname === '') {
    this.ovalid['shopname'] = "*Outlet name is required!";
    this.oerror++;
  }
  else {
    this.ovalid['shopname'] = ""
  }

  if (this.editoutlet.phone === '') {
    this.ovalid['phone'] = "*Phone number is required!";
    this.oerror++;
  }
  else if (!this.editoutlet.phone.match(this.contactPattern)) {
    this.oerror++;
  }
  else {
    this.ovalid['phone'] = ""
  }

  if (this.editoutlet.email === '') {
    this.ovalid['email'] = "*Email is required!";
    this.oerror++;
  }
  else if (!this.editoutlet.email.match(this.emailPattern)) {
    this.oerror++;
  }
  else {
    this.ovalid['email'] = ""
  }

  if (this.editoutlet.operatehrsstart === '') {
    this.ovalid['operatehrsstart'] = "*Operating hour is required!";
    this.oerror++;
  }
  else {
    this.ovalid['operatehrsstart'] = ""
  }

  if (this.editoutlet.operatehrsend === '') {
    this.ovalid['operatehrsend'] = "*Operating hour is required!";
    this.oerror++;
  }
  else {
    this.ovalid['operatehrsend'] = ""
  }

  if (this.editoutlet.operateday1 === '') {
    this.ovalid['operateday1'] = "*Operating day is required!";
    this.oerror++;
  }
  else {
    this.ovalid['operateday1'] = ""
  }

  if (this.editoutlet.operateday2 === '') {
    this.ovalid['operateday2'] = "*Operating day is required!";
    this.oerror++;
  }
  else {
    this.ovalid['operateday2'] = ""
  }

  if (this.editoutlet.description === '') {
    this.ovalid['description'] = "*Description is required!";
    this.oerror++;
  }
  else {
    this.ovalid['description'] = ""
  }

}


  // ----------------------------- auto generate id ---------------------------------
  public lastmerchantuserid;
  public lastonlinestoreid;
  public lastoutletid;
  public testarr;
  arr = [];
  padLeadingZeros(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }
  getLastMerchUser() {
    this.http.get('http://165.22.50.213:3000/getlastmerchuser').subscribe(res => {
      this.lastmerchantuserid = res['data'][0].id;
      // console.log(this.lastadminuserid.toString().split('-'));
      this.arr = this.lastmerchantuserid.toString().split('-');
      // console.log(this.arr);
      this.arr[1] = this.padLeadingZeros((parseInt(this.arr[1]) + 1), 5).toString();
      this.lastmerchantuserid = this.arr.join('-');
    
      // this.merchantuser.id = this.lastmerchantuserid;
    });
  }
  getLastOnlineStore() {
    this.http.get('http://165.22.50.213:3000/getlastonlinestore').subscribe(res => {
      this.lastonlinestoreid = res['data'][0].id;
      // console.log(this.lastonlinestoreid.toString().split('-'));
      this.arr = this.lastonlinestoreid.toString().split('-');
      // console.log(this.arr);
      this.arr[1] = this.padLeadingZeros((parseInt(this.arr[1]) + 1), 5).toString();
      this.lastonlinestoreid = this.arr.join('-');
     
      this.onlinestore.id = this.lastonlinestoreid;
    });
  }
  getLastOutlet() {
    this.http.get('http://165.22.50.213:3000/getlastoutlet').subscribe(res => {
      this.lastoutletid = res['data'][0].id;
      // console.log(this.lastoutletid.toString().split('-'));
      this.arr = this.lastoutletid.toString().split('-');
      // console.log(this.arr);
      this.arr[1] = this.padLeadingZeros((parseInt(this.arr[1]) + 1), 5).toString();
      this.lastoutletid = this.arr.join('-');
 
      this.outlet.id = this.lastoutletid;
    });
  }
  getBackId() {
    this.getLastMerchUser();
    this.getLastOnlineStore();
    this.getLastOutlet();
  }

  goBack() {
    window.history.back();
  }
}