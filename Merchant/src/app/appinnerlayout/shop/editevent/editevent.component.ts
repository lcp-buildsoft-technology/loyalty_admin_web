import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MapsAPILoader } from '@agm/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { WindowScrollController } from '@fullcalendar/common';
import { Buffer } from 'buffer';
import { Router } from '@angular/router';

declare var angular: any;

@Component({
  selector: 'app-editevent',
  templateUrl: './editevent.component.html',
  styleUrls: ['./editevent.component.scss']
})

export class EditeventComponent implements OnInit {
  message: any;
  eventArr = [];
  selectedArr = [];
  public srch = [];
  routeSub: any;


  data_id = '';
  error: number = 0;
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

  @ViewChild('search')
  public searchElementRef!: ElementRef;
  constructor(private modalService: NgbModal, private http: HttpClient, private route: ActivatedRoute, private router: Router, private form: FormBuilder, private activatedroute: ActivatedRoute, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {
    this.srch = [...this.eventArr];
  }

  public event = {
    _id: '',
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

  public editEvent = {
    _id: '',
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

  public id: any;

  ngOnInit(): void {
    this.open(this.event);
    var url = document.URL;
    console.log(url)
    const myArray = url.split("=");
    this.id = myArray[1];
    this.data_id = this.id;
    this.getEvent(this.id);

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
          this.editEvent.thumbnail = this.ogthumb;
          console.log(this.ogthumb)
          console.log(this.editEvent.thumbnail)
        }
        else{
          this.images=file;
          $('#newimg').show();
          $('#ogimg').hide();
          var reader = new FileReader()
          reader.readAsDataURL(event.target.files[0]);
          reader.onload=(event:any)=>{
          this.url=event.target.result;
          this.ogthumb =this.editEvent.thumbnail;
         }
        }
  
      }
    }
  }

  imagesArr =[];
  public image:any;
  public imagetype:any;

  getEvent(id: any) {
    this.event._id = this.id
    this.http.post('http://165.22.50.213:3001/getoneevent', this.event).subscribe((res: any) => {
      this.eventArr = res['data'];
      console.log(this.eventArr);
      this.editEvent.eventname = res['data'][0]['eventname']
      this.editEvent.eventhost = res['data'][0]['eventhost']
      this.editEvent.sdate = res['data'][0]['sdate']
      this.editEvent.edate = res['data'][0]['edate']
      this.editEvent.stime = res['data'][0]['stime']
      this.editEvent.etime = res['data'][0]['etime']
      this.editEvent.slot = res['data'][0]['slot']
      this.editEvent.amount = res['data'][0]['amount']
      this.editEvent.location = res['data'][0]['location']
      this.editEvent.latlong = res['data'][0]['latlong']
      this.editEvent.description = res['data'][0]['description']
      this.editEvent.contact = res['data'][0]['contact']
      this.editEvent.email = res['data'][0]['email']
      this.editEvent.whatsapp = res['data'][0]['whatsapp']
      this.editEvent.termsandcondition = res['data'][0]['termsandcondition']

      $('#newimg').hide();
      this.image = new Buffer(this.eventArr[0]['thumbnail']['data']).toString('base64');
      this.imagetype = this.eventArr[0]['thumbnail']['contentType'];
      this.images = this.eventArr[0]['thumbnail'];
      this.ogthumb = this.eventArr[0]['thumbnail'];

    });
  }

  uploadEvent(event: any) {
    this.error = 0;
    this.valid = this.validation();
    console.log(this.id)
    if (this.error < 1) {
      const formData = new FormData();
      this.event.location = ''+$('#location').val()+'';
      this.event.latlong = this.latitude.toString() + ',' + this.longitude.toString();
      var mlogin = JSON.parse(localStorage.getItem('Mlogin')!);
      var moutlet = JSON.parse(localStorage.getItem('Moutlet')!);
      formData.append('_id', this.id)
      formData.append('outletid', moutlet._id)
      formData.append('eventname', event.eventname)
      formData.append('eventhost', event.eventhost)
      formData.append('sdate', event.sdate)
      formData.append('edate', event.edate)
      formData.append('stime', event.stime)
      formData.append('etime', event.etime)
      formData.append('file', this.images)
      formData.append('amount', event.amount)
      formData.append('location', event.location)
      formData.append('latlong', event.latlong)
      formData.append('merchantid', mlogin.merchantid)
      formData.append('description', event.description)
      formData.append('termsandconditions', event.termsandcondition)
      formData.append('contact', event.contact)
      formData.append('email', event.email)
      formData.append('whatsapp', event.whatsapp)
      formData.append('slot', event.slot)
      formData.forEach(file => console.log("File: ", file));

      console.log(formData)
      this.http.post('http://165.22.50.213:3001/editeventandimage', formData).subscribe(res => {
        console.log(res);
        this.message = res;
        this.router.navigateByUrl('/eventlist')
      });
    }
  }

  open(event: any) {
    this.editEvent = {
      _id: event._id,
      eventname: event.eventname,
      eventhost: event.eventhost,
      sdate: event.sdate,
      edate: event.edate,
      stime: event.stime,
      etime: event.etime,
      amount: event.amount,
      location: event.location,
      latlong: event.latlong,
      description: event.description,
      contact: event.contact,
      email: event.email,
      whatsapp: event.whatsapp,
      thumbnail: event.thumbnail,
      termsandcondition: event.termsandcondition,
      slot:event.slot
    }
  }

  backnav() {
    this.router.navigateByUrl[('/eventlist')]
  }

  goback() {
    this.router.navigate[('/eventlist')]
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
    if (this.editEvent.eventname === '') {
      this.valid['eventname'] = "*Please enter the eventname!";
      this.error++;
    }
    else {
      this.valid['eventname'] = ""
    }
    if (this.editEvent.slot === '') {
      this.valid['slot'] = "*Please enter the slot!";
      this.error++;
    }
    else if (!this.editEvent.slot.match(this.slotPattern)) {
      this.error++;
    }
    else {
      this.valid['slot'] = ""
    }

    //detail
    if (this.editEvent.eventhost === '') {
      this.valid['eventhost'] = "*Please enter the eventhost!";
      this.error++;
    }
    else {
      this.valid['eventhost'] = ""
    }

    //start date
    if (this.editEvent.sdate === '') {
      this.valid['sdate'] = "*Please select a start date!";
      this.error++;
    }
    else if (this.editEvent.sdate < this.todayDate) {
      this.valid['sdate'] = "*Invalid Start Date!";
      this.error++;
    }
    else {
      this.valid['sdate'] = ""
    }

    //end date
    if (this.editEvent.edate === '') {
      this.valid['edate'] = "*Please select a end date!";
      this.error++;
    }
    else if (this.editEvent.edate < this.editEvent.sdate) {
      this.valid['edate'] = "*Invalid End Date!";
      this.error++;
    }
    else {
      this.valid['edate'] = ""
    }

    //stime
    if (this.editEvent.stime === '') {
      this.valid['stime'] = "*Please enter the start time!";
      this.error++;
    }
    else {
      this.valid['stime'] = ""
    }
    //etime
    if (this.editEvent.etime === '') {
      this.valid['etime'] = "*Please enter the end time!";
      this.error++;
    }
    else {
      this.valid['etime'] = ""
    }
    //description
    if (this.editEvent.description === '') {
      this.valid['description'] = "*Please enter the description!";
      this.error++;
    }
    else {
      this.valid['description'] = ""
    }

    //discount
    if (this.editEvent.amount === '') {
      this.valid['amount'] = "*Please enter the amount!";
      this.error++;
    }
    else if (!this.editEvent.amount.match(this.pricePattern)) {
      this.error++;
    }
    else {
      this.valid['amount'] = ""
    }

    //minimum spend
    if (this.editEvent.location === '') {
      this.valid['location'] = "*Please enter the location!";
      this.error++;
    }

    else {
      this.valid['location'] = ""
    }

    //contact
    if (this.editEvent.contact === '') {
      this.valid['contact'] = "*Please enter the contact!";
      this.error++;
    }
    else if (!this.editEvent.contact.match(this.contactPattern) ) {
      this.error++;
    }
    else {
      this.valid['contact'] = ""
    }
    if (this.editEvent.email === '') {
      this.valid['email'] = "*Please enter the email!";
      this.error++;
    }
    else if (!this.editEvent.email.match(this.emailPattern) ) {
      this.error++;
    }
    else {
      this.valid['email'] = ""
    }
    if (this.editEvent.whatsapp === '') {
      this.valid['whatsapp'] = "*Please enter the whatsapp!";
      this.error++;
    }
    else if (!this.editEvent.whatsapp.match(this.whatsappPattern) ) {
      this.error++;
    } 
    else {
      this.valid['whatsapp'] = ""
    }
    if (this.editEvent.termsandcondition === '') {
      this.valid['termsandcondition'] = "*Please enter the terms and condition!";
      this.error++;
    }

    else {
      this.valid['termsandcondition'] = ""
    }
    return this.valid;
  }
}
