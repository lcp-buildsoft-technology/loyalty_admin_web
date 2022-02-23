import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookingvenuelist',
  templateUrl: './bookingvenuelist.component.html',
  styleUrls: ['./bookingvenuelist.component.scss']
})
export class BookingvenuelistComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const footerhide:any = document.getElementsByTagName('app-footerinfo')[0];
    footerhide.remove()
  }

}