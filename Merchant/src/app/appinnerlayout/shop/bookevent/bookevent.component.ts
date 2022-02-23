import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MapsAPILoader } from '@agm/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
declare var angular: any;

@Component({
  selector: 'app-bookevent',
  templateUrl: './bookevent.component.html',
  styleUrls: ['./bookevent.component.scss']
})

export class BookeventComponent implements OnInit {
  message: any;
  id: any;
  images: any;
  public srch = [];
  eventArr = [];
  outletArr = [];
  valid: string[] = [];
  todayDate: any

  pricePattern = "^[0-9.]{1,8}";
  emailPattern = "^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$";
  contactPattern = "^[0][1][0-9]+-[0-9]{7,8}$";
  whatsappPattern = "^[+]*[6][0][1][0-9][0-9]{7,8}$";
  slotPattern = "^[0-9.]{1,8}";

  title: string = 'AGM project';
  latitude!: number ;
  longitude!: number;
  zoom!: number;
  location!: string;
  private geoCoder!: google.maps.Geocoder;
  error: number = 0;

  backnav()
  {
    this.router.navigateByUrl('/eventlist')
  }

  @ViewChild('search')
  public searchElementRef!: ElementRef;
  constructor(private modalService: NgbModal, private http: HttpClient, private router: Router, private route: ActivatedRoute,  private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {
    this.srch = [...this.eventArr];
  }

  public event = {
    outletid: '',
    merchantid: '',
    eventname: '',
    eventhost: '',
    sdate: '',
    edate: '',
    stime: '',
    etime: '',
    amount: '',
    location: '',
    latlong:'',
    description: '',
    contact: '',
    email: '',
    whatsapp: '',
    thumbnail: '',
    termsandcondition: '',
    slot:''

  };

  public editevent = {
    outletid: '',
    merchantid: '',
    eventname: '',
    eventhost: '',
    sdate: '',
    edate: '',
    stime: '',
    etime: '',
    amount: '',
    location: '',
    latlong:'',
    description: '',
    contact: '',
    email: '',
    whatsapp: '',
    thumbnail: '',
    termsandcondition: '',
    slot:''
  };

  ngOnInit(): void {
    const footerhide: any = document.getElementsByTagName('app-footerinfo')[0];
    footerhide.remove();
    var moutlet = JSON.parse(localStorage.getItem('Moutlet')!);
    var url = document.URL;
    console.log(url)
    const myArray = url.split("=");
    this.id = myArray[1];
    console.log(this.id);

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
    
    this.getcheckedvalue();
  
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

  getcheckedvalue(){
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
  
  getAddress(latitude: number, longitude: number) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results: { formatted_address: string; }[], status: string) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.location = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
  
    });
  }

  goto() {
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
    console.log(this.event);
    this.valid = this.validation();
    if (this.error < 1) {
      this.addimage()
    }
  }

  addimage() {
    const formData = new FormData();
    this.event.location = ''+$('#location').val()+'';
    this.event.latlong = this.latitude.toString() + ',' + this.longitude.toString();
    var mlogin = JSON.parse(localStorage.getItem('Mlogin')!);
    var moutlet = JSON.parse(localStorage.getItem('Moutlet')!);
    formData.append('outletid', moutlet._id)
    formData.append('eventname', this.event.eventname)
    formData.append('eventhost', this.event.eventhost)
    formData.append('sdate', this.event.sdate)
    formData.append('edate', this.event.edate)
    formData.append('stime', this.event.stime)
    formData.append('etime', this.event.etime)
    formData.append('file', this.images)
    formData.append('amount', this.event.amount)
    formData.append('location', this.event.location)
    formData.append('latlong', this.event.latlong)
    formData.append('merchantid', mlogin.merchantid)
    formData.append('description', this.event.description)
    formData.append('termsandcondition', this.event.termsandcondition)
    formData.append('contact', this.event.contact)
    formData.append('email', this.event.email)
    formData.append('whatsapp', this.event.whatsapp)
    formData.append('slot', this.event.slot)

    formData.forEach(file => console.log("File: ", file));
    console.log(formData)
    this.http.post('http://165.22.50.213:3001/upeventandimage', formData).subscribe(res => {
      console.log(res);
      this.message = res;
      if(this.message['success'] == false){
      
      }
      else{
        this.router.navigate(['/eventlist'])
      }
    });
  
    // this.router.navigateByUrl('/bookevent', {skipLocationChange: true}).then(() => {
    //   this.router.navigate(['/eventlist']);
    // });
  }

  validation() {
    //title
    if (this.event.eventname === '') {
      this.valid['eventname'] = "*Please enter the event name!";
      this.error++;
    }
    else {
      this.valid['eventname'] = ""
    }

    //detail
    if (this.event.eventhost === '') {
      this.valid['eventhost'] = "*Please enter the event host!";
      this.error++;
    }
    else {
      this.valid['eventhost'] = ""
    }
    if (this.event.slot === '') {
      this.valid['slot'] = "*Please enter the event host!";
      this.error++;
    }
    else if (!this.event.slot.match(this.slotPattern)) {
      this.error++;
    }
    else {
      this.valid['slot'] = ""
    }
    //start date
    if (this.event.sdate === '') {
      this.valid['sdate'] = "*Please select a start date!";
      this.error++;
    }
    else if (this.event.sdate < this.todayDate) {
      this.valid['sdate'] = "*Invalid Start Date!";
      this.error++;
    }
    else {
      this.valid['sdate'] = ""
    }

    //end date
    if (this.event.edate === '') {
      this.valid['edate'] = "*Please select a end date!";
      this.error++;
    }
    else if (this.event.edate < this.event.sdate) {
      this.valid['edate'] = "*Invalid End Date!";
      this.error++;
    }
    else {
      this.valid['edate'] = ""
    }


    //stime
    if (this.event.stime === '') {
      this.valid['stime'] = "*Please enter the start time!";
      this.error++;
    }
    else {
      this.valid['stime'] = ""
    }
    //etime
    if (this.event.etime === '') {
      this.valid['etime'] = "*Please enter the end time!";
      this.error++;
    }
    else {
      this.valid['etime'] = ""
    }
    //description
    if (this.event.description === '') {
      this.valid['description'] = "*Please enter the description!";
      this.error++;
    }
    else {
      this.valid['description'] = ""
    }

    //discount
    if (this.event.amount === '') {
      this.valid['amount'] = "*Please enter the amount!";
      this.error++;
    }
    else if (!this.event.amount.match(this.pricePattern)) {
      this.error++;
    }
    else {
      this.valid['amount'] = ""
    }

    //minimum spend
    if (this.event.location === '') {
      this.valid['location'] = "*Please enter the location!";
      this.error++;
    }

    else {
      this.valid['location'] = ""
    }

    //contact
    if (this.event.contact === '') {
      this.valid['contact'] = "*Please enter the contact!";
      this.error++;
    }
    else if (!this.event.contact.match(this.contactPattern) ) {
      this.error++;
    }
    else {
      this.valid['contact'] = ""
    }

    if (this.event.email === '') {
      this.valid['email'] = "*Please enter the email!";
      this.error++;
    }
    else if (!this.event.email.match(this.emailPattern) ) {
      this.error++;
    }    
    else {
      this.valid['email'] = ""

    }
    if (this.event.whatsapp === '') {
      this.valid['whatsapp'] = "*Please enter the whatsapp!";
      this.error++;
    }
    else if (!this.event.whatsapp.match(this.whatsappPattern) ) {
      this.error++;
    } 
    else {
      this.valid['whatsapp'] = ""
    }
    if (this.event.termsandcondition === '') {
      this.valid['termsandcondition'] = "*Please enter the terms and condition!";
      this.error++;
    }

    else {
      this.valid['termsandcondition'] = ""
    }
    return this.valid;
  }
}