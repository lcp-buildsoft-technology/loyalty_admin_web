import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {


  title: string = 'AGM project';
  // latitude!: number;
  // longitude!: number;
  zoom!: number;
  address!: string;
  private geoCoder!: google.maps.Geocoder;
  
  @ViewChild('search')
  public searchElementRef!: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }

  ngOnInit(): void {
    // this.mapsAPILoader.load().then(() => {
    //   this.setCurrentLocation();
    //   this.geoCoder = new google.maps.Geocoder;
  
    //   let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
    //   autocomplete.addListener("place_changed", () => {
    //     this.ngZone.run(() => {
    //       let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  
    //       if (place.geometry === undefined || place.geometry === null) {
    //         return;
    //       }
  
    //       this.latitude = place.geometry.location.lat();
    //       this.longitude = place.geometry.location.lng();
    //       this.zoom = 12;
    //     });
    //   });
    // });
  }

  // private setCurrentLocation() {
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       this.zoom = 8;
  //       this.getAddress(this.latitude, this.longitude);
  //     });
  //   }
  // }
  
  // getAddress(latitude: number, longitude: number) {
  //   this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results: { formatted_address: string; }[], status: string) => {
  //     if (status === 'OK') {
  //       if (results[0]) {
  //         this.zoom = 12;
  //         this.address = results[0].formatted_address;
  //       } else {
  //         window.alert('No results found');
  //       }
  //     } else {
  //       window.alert('Geocoder failed due to: ' + status);
  //     }
  
  //   });
  // }

  longitude = 20.728218;
latitude = 52.128973;

markers = [
{ latitude: 52.228973, longitude: 20.728218 }
];

placeMarker(position: any) {
const lat = position.coords.lat;
const lng = position.coords.lng;

this.markers.push({ latitude: lat, longitude: lng });

}

}
