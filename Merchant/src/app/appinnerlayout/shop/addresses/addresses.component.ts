import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { 
     const footerhide:any = document.getElementsByTagName('app-footerinfo')[0];
  footerhide.remove();

  }

}
