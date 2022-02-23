import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import tinymce from 'tinymce';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Buffer } from 'buffer';
import { FormBuilder } from '@angular/forms';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-memberRecord',
  templateUrl: './memberRecord.component.html',
  styleUrls: ['./memberRecord.component.scss']
})
export class MemberRecordComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger1: Subject<any> = new Subject();
  dtTrigger2: Subject<any> = new Subject();
  dtTrigger3: Subject<any> = new Subject();
  dtTrigger4: Subject<any> = new Subject();


  pointCollectArr = [];
  pointTransactArr = [];
  memberArr = [];
  merchArr = [];
  specificpointCollectArr = [];
  specificpointTransactArr = [];
  specificVoucherArr = [];
  specificRewardArr = [];

  constructor(private modalService: NgbModal, private router:Router,
    private http: HttpClient, private domSanitizer: DomSanitizer) {

  }

  public id;
  public membername;
  public shopname;

  ngOnInit() {

    var url = document.URL;
    this.id = /id=([^&]+)/.exec(url)[1]
    console.log(this.id);
    this.getMemberName();
    // this.getMerchantName();
    this.getPointCollect();
    this.getPointTransact();
    this.getVoucherRedeem();
    this.getRewardsRedeem();
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      lengthMenu: [5, 10, 20]
    };
    $('#loader').show();
    $('body').css("overflow-y", "hidden");

  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger1.unsubscribe();
    this.dtTrigger2.unsubscribe();
    this.dtTrigger3.unsubscribe();
    this.dtTrigger4.unsubscribe();
  }

  eachshopnamearr = [];
  eachshopnamearr2 = [];
  eachshopnamearr3 = [];
  eachshopnamearr4 = [];
  getPointCollect() {

    this.http.get('http://165.22.50.213:3000/getspecificmempointcollect/' + this.id).subscribe(res => {
      this.specificpointCollectArr = res['data'];
      console.log(1)
      // for (let i = 0; i < this.specificpointCollectArr.length; i++) {
      //   var id = this.specificpointCollectArr[i].merchantid;
      //   this.http.get('http://165.22.50.213:3000/getamerchant/' + id).subscribe(res => {
      //     this.merchArr[id] = res['data'];
      //     console.log('ok',this.merchArr[id][0].companyname)
      //     this.eachshopnamearr[id] = this.merchArr[id][0].companyname;
      //   });

      // }
      for (let i = 0; i < this.specificpointCollectArr.length; i++) {
        var id = this.specificpointCollectArr[i].merchantid;
        this.http.get('http://165.22.50.213:3000/getamerchant/' + id).subscribe(res => {
          this.merchArr = res['data'];
          // console.log('ok',i,"o",this.merchArr[0].companyname)
          this.eachshopnamearr[this.specificpointCollectArr[i]._id] = this.merchArr[0].companyname;
        });

      }
      this.dtTrigger1.next(void 0);
    });
  }
  getPointTransact() {

    this.http.get('http://165.22.50.213:3000/getspecificmempointredeem/' + this.id).subscribe(res => {
      this.specificpointTransactArr = res['data'];
      for (let i = 0; i < this.specificpointTransactArr.length; i++) {
        var id = this.specificpointTransactArr[i].merchantid;
        this.http.get('http://165.22.50.213:3000/getamerchant/' + id).subscribe(res => {
          this.merchArr[id] = res['data'];
          // console.log('ok',this.merchArr[id][0].companyname)
          this.eachshopnamearr2[id] = this.merchArr[id][0].companyname;
          console.log(2)

        });

      }
      this.dtTrigger2.next(void 0);

    });
  }
  getVoucherRedeem() {
    this.http.get('http://165.22.50.213:3000/getspecficmemvoucher/' + this.id).subscribe(res => {
      this.specificVoucherArr = res['data'];
      for (let i = 0; i < this.specificVoucherArr.length; i++) {
        var id = this.specificVoucherArr[i].voucherid;
        this.http.get('http://165.22.50.213:3000/getspecficmerchantwithvoucher/' + id).subscribe(res => {
          this.merchArr[id] = res['data'];
          this.eachshopnamearr3[this.specificVoucherArr[i]._id] = this.merchArr[id][0].companyname;
          
        });

      }
      $('#loader').hide();
          $('#loader-wrapper').hide();
          $('#loader-inner').hide();
          $('body').css("overflow-y", "visible");
      this.dtTrigger3.next(void 0);
      console.log(3)
    });
  }
  getRewardsRedeem() {
    this.http.get('http://165.22.50.213:3000/getspecficmemreward/' + this.id).subscribe(res => {
      this.specificRewardArr = res['data'];
      // for (let i = 0; i < this.specificRewardArr.length; i++) {
      //   var id = this.specificRewardArr[i].rewardid;
      //   this.http.get('http://165.22.50.213:3000/getspecficrewardwithreward/' + id).subscribe(res => {
      //     this.merchArr[id] = res['data'];
      //     this.eachshopnamearr4[this.specificRewardArr[i]._id] = this.merchArr[id][0].reward;
      //   });

      // }
      this.getRewardsVoucherRedeem();
      console.log(4)
    });
  }
  specificrewardvcharr = []
  getRewardsVoucherRedeem() {
    this.http.get('http://165.22.50.213:3000/getspecficmemrewardvoucher/' + this.id).subscribe(res => {
      this.specificrewardvcharr = res['data'];
      // for (let i = 0; i < this.specificRewardArr.length; i++) {
      //   var id = this.specificRewardArr[i].rewardid;
      //   this.http.get('http://165.22.50.213:3000/getspecficrewardwithreward/' + id).subscribe(res => {
      //     this.merchArr[id] = res['data'];
      //     this.eachshopnamearr4[this.specificRewardArr[i]._id] = this.merchArr[id][0].reward;
      //   });

      // }
      this.dtTrigger4.next(void 0);
      console.log(5)

    });
  }

  getMemberName() {
    this.http.get('http://165.22.50.213:3000/getmember').subscribe(res => {
      this.memberArr = res['data'];
      for (var i = 0; i < this.memberArr.length; i++) {
        if (this.memberArr[i]._id == this.id) {
          this.membername = this.memberArr[i].name;
        } console.log(6)
      }
    });
  }
  getMerchantName(id) {
    this.http.get('http://165.22.50.213:3000/getamerchant/' + id).subscribe(res => {
      this.merchArr = res['data'];
      this.shopname = this.merchArr[0].companyname;

      console.log(7)
    });

  }

}
