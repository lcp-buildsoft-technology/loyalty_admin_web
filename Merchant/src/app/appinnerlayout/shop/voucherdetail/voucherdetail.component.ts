import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-voucherdetail',
  templateUrl: './voucherdetail.component.html',
  styleUrls: ['./voucherdetail.component.scss']
})
export class VoucherdetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const footerhide:any = document.getElementsByTagName('app-footerinfo')[0];
    footerhide.remove();
  }

}
