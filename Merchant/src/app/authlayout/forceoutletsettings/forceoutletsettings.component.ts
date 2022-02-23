import {  Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MapsAPILoader } from '@agm/core';
import * as $ from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forceoutletsettings',
  templateUrl: './forceoutletsettings.component.html',
  styleUrls: ['./forceoutletsettings.component.scss']
})
export class ForceoutletsettingsComponent implements OnInit {

  message: any;
  arr:any;
  images:any
  moutletArr = [];
  public srch =[];
  valid: string[] = [];
  todayDate:any

  emailPattern = "^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$";
  contactPattern = "^[0][1][0-9]+-[0-9]{7,8}$";
  whatsappPattern = "^[0][1][0-9]+-[0-9]{7,8}$";

  title: string = 'AGM project';
  latitude!: number ;
  longitude!: number;
  zoom!: number;
  address!: string;
  private geoCoder!: google.maps.Geocoder;
  error: number = 0;
  
  @ViewChild('search')
  public searchElementRef!: ElementRef;
  constructor(private modalService: NgbModal, private http: HttpClient, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private router: Router, private route: ActivatedRoute)  { 
    this.srch = [...this.moutletArr];

  }
  public moutlet={
    shopname:'',
    address:'',
    phone: '',
    whatsapp:'',
    email:'',
    operatehrsstart:'',
    operatehrsend:'',
    operateday1:'',
    operateday2:'',
    description:'',
    slot:'',
    merchantid:'',
    latlong:'',
    avgrating:'',
    state:''
     };
  ngOnInit(): void {
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
  url=("../../../../assets/img/blankimage.png");
  onselectFile(e:any){
    if(e.target.files){
      const file = e.target.files[0];
      this.images = file;
      var reader = new FileReader()
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
         this.url=event.target.result;
      }
    }
  }
backto(){
  this.router.navigate(['/outletlist'])
}
sendData(){
  this.error =0;
  var val:any =[];


  this.valid = this.validation();

      console.log(this.error)
  if(this.error < 1){
    this.addimage();

  }
 
  
 
}
addimage(){
  const formData = new FormData();
  this.moutlet.address = ''+$('#address').val()+'';
  this.moutlet.latlong = this.latitude.toString() + ',' + this.longitude.toString();
  var mlogin =JSON.parse(localStorage.getItem('Mlogin') !);
  formData.append('shopname', this.moutlet.shopname)
  formData.append('address', this.moutlet.address)
  formData.append('phone', this.moutlet.phone)
  formData.append('file', this.images)
  formData.append('whatsapp', this.moutlet.whatsapp)
  formData.append('email', this.moutlet.email)
  formData.append('operatehrsstart', this.moutlet.operatehrsstart)
  formData.append('operatehrsend', this.moutlet.operatehrsend)
  formData.append('operateday1', this.moutlet.operateday1)
  formData.append('operateday2', this.moutlet.operateday2)
  formData.append('description', this.moutlet.description)
  formData.append('state', this.moutlet.state)
  formData.append('slot', this.moutlet.slot)
  formData.append('merchantid', mlogin.merchantid)
  formData.append('latlong', this.moutlet.latlong)
  formData.forEach(file => console.log("File: ", file));
  console.log(formData)
  this.http.post('http://165.22.50.213:3001/upmoutletandimage', formData).subscribe(res =>{
    console.log(res);
    this.message = res;
    if(this.message['success'] == false){
      
    }
    else{
      this.router.navigate(['/outletlist'])
    }
 
});
}
registerOutlet(moutlet:any){
  var mlogin =JSON.parse(localStorage.getItem('Mlogin') !);
  moutlet.merchantid= mlogin.merchantid
  console.log(moutlet);
  this.moutlet.address = ''+$('#address').val()+'';
  this.moutlet.latlong = this.latitude.toString() + ',' + this.longitude.toString();
  console.log(this.moutlet.latlong)
 this.http.post('http://165.22.50.213:3001/addmoutlet', moutlet).subscribe(res =>{
     console.log(res);
     this.message = res;
 });
this.router.navigate(['/outletlist'])

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
  if (this.moutlet.shopname === '') {
    this.valid['shopname'] = "*Please enter the shopname!";
    this.error++;
  }
  else {
    this.valid['shopname'] = ""
  }

  //detail
  if (this.moutlet.address === '') {
    this.valid['address'] = "*Please enter the address!";
    this.error++;
  }
  else {
    this.valid['address'] = ""
  }

  //merchant
  if (this.moutlet.phone === '') {
    this.valid['phone'] = "*Please enter phone number";
    this.error++;
  }
  else if (!this.moutlet.phone.match(this.contactPattern) ) {
    this.error++;
  }
  else {
    this.valid['phone'] = ""
  }

  //type
  if (this.moutlet.whatsapp === '') {
    this.valid['whatsapp'] = "*Please select a whatsapp!";
    this.error++;
  }
  else if (!this.moutlet.whatsapp.match(this.whatsappPattern) ) {
    this.error++;
  } 
  else {
    this.valid['whatsapp'] = ""
  }

  //quantity
  if (this.moutlet.email === '') {
    this.valid['email'] = "*Please enter your email address!";
    this.error++;
  }
  else if (!this.moutlet.email.match(this.emailPattern) ) {
    this.error++;
  }  
  else {
    this.valid['email'] = ""
  }

  //tnc
  if (this.moutlet.operatehrsstart === '') {
    this.valid['operatehrsstart'] = "*Please enter operation start hour!";
    this.error++;
  }
  else {
    this.valid['operatehrsstart'] = ""
  }

  //start date
  if (this.moutlet.operatehrsstart === '') {
    this.valid['operatehrsstart'] = "*Please enter operation start hour!";
    this.error++;
  }

  else {
    this.valid['operatehrsstart'] = ""
  }

  //end date
  if (this.moutlet.operatehrsend === '') {
    this.valid['operatehrsend'] = "*End date is required!";
    this.error++;
  }

  else {
    this.valid['operatehrsend'] = ""
  }

  // operate day
   
   if (this.moutlet.operateday1 === '') {
    this.valid['operateday1'] = "*Please enter operation day";
    this.error++;
  }

  else {
    this.valid['operateday1'] = ""
  }

  //end date
  if (this.moutlet.operateday2 === '') {
    this.valid['operateday2'] = "*End date is required!";
    this.error++;
  }

  else {
    this.valid['operateday2'] = ""
  }

  //status
  if (this.moutlet.description === '') {
    this.valid['description'] = "*Please select the description!";
    this.error++;
  }
  else {
    this.valid['description'] = ""
  }

  //discount
  if (this.moutlet.slot === '') {
    this.valid['slot'] = "*Please enter the slot!";
    this.error++;
  }

  else {
    this.valid['slot'] = ""
  }


  return this.valid;
}


}
