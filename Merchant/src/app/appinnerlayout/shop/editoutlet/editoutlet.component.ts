import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MapsAPILoader } from '@agm/core';
import { Buffer } from 'buffer';
import { Router } from '@angular/router';

declare var angular: any;
@Component({
  selector: 'app-editoutlet',
  templateUrl: './editoutlet.component.html',
  styleUrls: ['./editoutlet.component.scss']
})

export class EditoutletComponent implements OnInit {
  
  emailPattern = "^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$";
  contactPattern = "^[0][1][0-9]+-[0-9]{7,8}$";
  whatsappPattern = "^[+]*[6][0][1][0-9]+-[0-9]{7,8}$";
  originalslotPattern = "^[0-9.]{1,8}";
  
  valid: string[] = [];
  todayDate:any
  message: any;
  moutletArr = [];
  selectedArr = [];
  public srch = [];
  title: string = 'AGM project';
  latitude!: number;
  longitude!: number;
  zoom!: number;
  error:number =0;
  address!: string;
  private geoCoder!: google.maps.Geocoder;
  shopname: any

  phone: any
  whatsapp: any
  emailaddress: any
  operatehrsstart: any
  operatehrsend: any
  operateday1: any
  operateday2: any
  description: any
  merchantid: any
  originalslot: any

  data_id = '';
  @ViewChild('search')
  public searchElementRef!: ElementRef;

  constructor(private modalService: NgbModal, private http: HttpClient, private route: ActivatedRoute, private router: Router, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {
    this.srch = [...this.moutletArr];
  }

  public moutlet = {
    _id: '',
    shopname: '',
    address: '',
    phone: '',
    whatsapp: '',
    email: '',
    operatehrsstart: '',
    operatehrsend: '',
    operateday1: '',
    operateday2: '',
    description: '',
    merchantid: '',
    originalslot: '',
    thumbnail: '',
    latlong: '',
    state:''
  };

  public editmoutlet = {
    _id: '',
    shopname: '',
    address: '',
    phone: '',
    whatsapp: '',
    thumbnail: '',
    email: '',
    operatehrsstart: '',
    operatehrsend: '',
    operateday1: '',
    operateday2: '',
    description: '',
    merchantid: '',
    originalslot: '',
    latlong: '',
    state:'',
  };

  public id: any;

  ngOnInit(): void {
    this.open(this.moutlet);

    var url = document.URL;
    console.log(url)
    const myArray = url.split("=");
    this.id = myArray[1];
    this.data_id = this.id;
    console.log(this.data_id)
    this.getMoutlet();

    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;

        });
      });
    });
  }

  public images: any;
  public ogthumb: any;
  public x :any
  url: any;
  onselectFile(event: any) {
    if (event.target.files) {
      if (event.target.files.length != 0) {
        var maxFileSize = 1024 * 1024;

        const file = event.target.files[0];

        if (this.images.size > maxFileSize) {
          alert('Image too large. Maximum file size is 1MB');
          this.editmoutlet.thumbnail = this.ogthumb;
          console.log(this.ogthumb)
          console.log(this.editmoutlet.thumbnail)
        }
        else {
          this.images = file;
          $('#newimg').show();
          $('#ogimg').hide();
          var reader = new FileReader()
          reader.readAsDataURL(event.target.files[0]);
          reader.onload = (event: any) => {
            this.url = event.target.result;
            this.ogthumb = this.editmoutlet.thumbnail;
          }
        }

      }
    }
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }
  
  imagesArr = [];
  public image: any;
  public imagetype: any;

  getMoutlet() {
    var mlogin = JSON.parse(localStorage.getItem('Mlogin')!);
    this.moutlet.merchantid = mlogin.merchantid
    this.http.post('http://165.22.50.213:3001/getmoutlet', this.moutlet).subscribe((res: any) => {

      var moutlet = JSON.parse(localStorage.getItem('Moutlet')!);

      this.moutletArr = res['data'];
      console.log(this.moutletArr.length);
      console.log(this.moutletArr[0]['_id']);

      console.log(this.selectedArr);
      for (var i = 0; i < this.moutletArr.length; i++) {
        if (this.moutletArr[i]['_id'] == this.id) {
          this.selectedArr = this.moutletArr[i];
          console.log(this.moutletArr[i]['email'])
    
          this.editmoutlet.address = this.moutletArr[i]['address']
          this.editmoutlet.shopname = this.moutletArr[i]['shopname']
          this.editmoutlet.phone = this.moutletArr[i]['phone']
          this.editmoutlet.whatsapp = this.moutletArr[i]['whatsapp']
          this.editmoutlet.email = this.moutletArr[i]['email']
          this.editmoutlet.originalslot = this.moutletArr[i]['originalslot']
          this.editmoutlet.operatehrsstart = this.moutletArr[i]['operatehrsstart'],
            this.editmoutlet.operatehrsend = this.moutletArr[i]['operatehrsstart'],
            this.editmoutlet.operateday1 = this.moutletArr[i]['operateday1'],
            this.editmoutlet.operateday2 = this.moutletArr[i]['operateday2'],
            this.editmoutlet.description = this.moutletArr[i]['description']
          this.editmoutlet.merchantid = this.moutletArr[i]['merchantid']
          this.editmoutlet.state = this.moutletArr[i]['state']
          $('#newimg').hide();
          this.image = new Buffer(this.moutletArr[i]['thumbnail']['data']).toString('base64');
          this.imagetype = this.moutletArr[i]['thumbnail']['contentType'];
          this.images = this.moutletArr[i]['thumbnail'];
          this.ogthumb = this.moutletArr[i]['thumbnail'];
        }
      }
    });
  }

  uploadmoutlet(moutlet: any) {
    this.error = 0;
    this.validation()
    const formData = new FormData();
    if(this.error <1){
    this.moutlet.address = '' + $('#address').val() + '';
    this.moutlet.latlong = this.latitude + ',' + this.longitude;
    var mlogin = JSON.parse(localStorage.getItem('Mlogin')!);

    formData.append('_id', this.id)
    formData.append('shopname', this.editmoutlet.shopname)
    formData.append('address', this.moutlet.address)
    formData.append('phone', this.editmoutlet.phone)
    formData.append('file', this.images)
    formData.append('whatsapp', this.editmoutlet.whatsapp)
    formData.append('email', this.editmoutlet.email)
    formData.append('operatehrsstart', this.editmoutlet.operatehrsstart)
    formData.append('operatehrsend', this.editmoutlet.operatehrsend)
    formData.append('operateday1', this.editmoutlet.operateday1)
    formData.append('operateday2', this.editmoutlet.operateday2)
    formData.append('description', this.editmoutlet.description)
    formData.append('originalslot', this.editmoutlet.originalslot)
    formData.append('state', this.editmoutlet.state)
    formData.append('merchantid', mlogin.merchantid)
    formData.append('latlong', this.moutlet.latlong)
    formData.forEach(file => console.log("File: ", file));

    console.log(formData)
    this.http.post('http://165.22.50.213:3001/editmoutletandimage', formData).subscribe(res => {
      console.log(res['data']);
      var x =res['data']
      this.message = res;

      if (this.message['success'] == false) {
        alert("failed to save");
      }
      else {
      console.log(x)
        var moutlet = JSON.parse(localStorage.getItem('Moutlet')!);
        if(this.id == moutlet._id){
          console.log(this.id)
          console.log(moutlet._id)
          localStorage.setItem("Moutlet", JSON.stringify(x));
        }
        this.router.navigateByUrl('/outletlist')
      }
    });
   }
  }

  open(moutlet: any) {
    this.editmoutlet = {
      merchantid: moutlet.merchantid,
      shopname: moutlet.shopname,
      _id: moutlet._id,
      address: moutlet.address,
      phone: moutlet.phone,
      whatsapp: moutlet.whatsapp,
      email: moutlet.email,
      operatehrsstart: moutlet.operatehrsstart,
      operatehrsend: moutlet.operatehrsend,
      operateday1: moutlet.operateday1,
      operateday2: moutlet.operateday2,
      description: moutlet.description,
      originalslot: moutlet.originalslot,
      thumbnail: moutlet.thumbnail,
      latlong: moutlet.latlong,
      state:moutlet.state,
    }
  }
  
  backnav(){
    this.router.navigate[('/outletlist')]
  }

  getAddress(latitude: number, longitude: number) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results: { formatted_address: string; }[], status: string) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  validation() {
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
    
    //title
    if (this.editmoutlet.shopname === '') {
      this.valid['shopname'] = "*Please enter the shopname!";
      this.error++;
    }
    else {
      this.valid['shopname'] = ""
    }
  
    if (this.editmoutlet.originalslot === '') {
      this.valid['originalslot'] = "*Please enter the slot now!";
      this.error++;
    }
    else if (!this.editmoutlet.originalslot.match(this.originalslotPattern)) {
      this.error++;
    }
    else {
      this.valid['originalslot'] = ""
    }
  
    //detail
    if (this.editmoutlet.address === '') {
      this.valid['address'] = "*Please enter the address!";
      this.error++;
    }
    else {
      this.valid['address'] = ""
    }
  
    if (this.editmoutlet.state === '') {
      this.valid['state'] = "*Please enter the state!";
      this.error++;
    }
    else {
      this.valid['state'] = ""
    }
    //merchant
    if (this.editmoutlet.phone === '') {
      this.valid['phone'] = "*Please enter phone number";
      this.error++;
    }
    else if (!this.editmoutlet.phone.match(this.contactPattern) ) {
      this.error++;
    }
    else {
      this.valid['phone'] = ""
    }
  
    //type
    if (this.editmoutlet.whatsapp === '') {
      this.valid['whatsapp'] = "*Please select a whatsapp!";
      this.error++;
    }
    else if (!this.editmoutlet.whatsapp.match(this.whatsappPattern) ) {
      this.error++;
    } 
    else {
      this.valid['whatsapp'] = ""
    }
  
    //quantity
    if (this.editmoutlet.email === '') {
      this.valid['email'] = "*Please enter your email address!";
      this.error++;
    }
    else if (!this.editmoutlet.email.match(this.emailPattern) ) {
      this.error++;
    }  
    else {
      this.valid['email'] = ""
    }
  
    //tnc
    if (this.editmoutlet.operatehrsstart === '') {
      this.valid['operatehrsstart'] = "*Please enter operation start hour!";
      this.error++;
    }
    else {
      this.valid['operatehrsstart'] = ""
    }
  
    //start date
    if (this.editmoutlet.operatehrsstart === '') {
      this.valid['operatehrsstart'] = "*Please enter operation start hour!";
      this.error++;
    }
  
    else {
      this.valid['operatehrsstart'] = ""
    }
  
    //end date
    if (this.editmoutlet.operatehrsend === '') {
      this.valid['operatehrsend'] = "*End date is required!";
      this.error++;
    }
  
    else {
      this.valid['operatehrsend'] = ""
    }
  
    // operate day
     
     if (this.editmoutlet.operateday1 === '') {
      this.valid['operateday1'] = "*Please enter operation day";
      this.error++;
    }
  
    else {
      this.valid['operateday1'] = ""
    }
  
    //end date
    if (this.editmoutlet.operateday2 === '') {
      this.valid['operateday2'] = "*End date is required!";
      this.error++;
    }
  
    else {
      this.valid['operateday2'] = ""
    }
  
    //status
    if (this.editmoutlet.description === '') {
      this.valid['description'] = "*Please select the description!";
      this.error++;
    }
    else {
      this.valid['description'] = ""
    }
    return this.valid;
  }
}
