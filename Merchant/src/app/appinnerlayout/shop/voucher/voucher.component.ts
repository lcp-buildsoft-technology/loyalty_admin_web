import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { NouiFormatter } from "ng2-nouislider";
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper/core';





import { from } from 'rxjs';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);


@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']

})
export class voucherComponent implements OnInit {
  public disabled: boolean = false;
  public someValue: any = [30, 60];
  public someMin: number = 10;
  public someMax: number = 100;
  public someconect: any = true;
  public minvalueselect:any = this.someValue[0];
  public maxvalueselect:any = this.someValue[1];

  constructor() { }


  ngOnInit(): void {
    var html5Slider = document.getElementById('rangeslider');
    var inputNumber = document.getElementById('input-number');
    var select = document.getElementById('input-select');

  }
  

  toastshowtiny() {
    var newtoast = new bootstrap.Toast(document.querySelector('#toastprouctaddedtiny'));
    newtoast.show()
  }
  toastshowsimple() {
    var newtoast = new bootstrap.Toast(document.querySelector('#toastprouctadded'));
    newtoast.show()
  }
  toastshowrich() {
    var newtoast = new bootstrap.Toast(document.querySelector('#toastprouctaddedrich'));
    newtoast.show()
  }

  filterOpen() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('filter-open');
  }

  filterClose() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('filter-open');
  }

  saveRange(range:any) {
    this.minvalueselect = range[0];
    this.maxvalueselect = range[1];
 }

}
