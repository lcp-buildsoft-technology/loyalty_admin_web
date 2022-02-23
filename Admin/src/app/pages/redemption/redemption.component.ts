import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import tinymce from 'tinymce';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Buffer } from 'buffer';
import { FormBuilder } from '@angular/forms';
import * as XLSX from 'xlsx';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
@Component({
  selector: 'app-redemption',
  templateUrl: './redemption.component.html',
  styleUrls: ['./redemption.component.css']
})
export class RedemptionComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();


  message: any;
  redempArr = [];
  merchArr = [];
  search: any;
  total: number = 0;
  total1: number = 0
  total2: number = 0
  eachRedempArr1 = [];
  eachRedempArr2 = [];
  eachTotal = [];
  temp: number = 0;

  public srch = [];
  public sech = [];

  constructor(private modalService: NgbModal, private router:Router,
    private http: HttpClient, private domSanitizer: DomSanitizer, private sessionSt: SessionStorageService) {
    this.srch = [...this.redempArr];
    this.sech = [...this.merchArr];
  }
  public thismonth;

  ngOnInit() {
    $(window).scrollTop(0);
    this.checkdate();
    this.getSession();
    $('#loader').show();
    $('body').css("overflow-y", "hidden");

    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      lengthMenu: [5, 10, 20]
    };
    this.getMerch();
    this.getRedemp();
    this.geteachPoint();
    this.getPointCollect();
    this.getMonthlyRedemp();
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  checkdate() {
    const month = new Array();
    month[1] = "JAN";
    month[2] = "FEB";
    month[3] = "MAR";
    month[4] = "APR";
    month[5] = "MAY";
    month[6] = "JUN";
    month[7] = "JUL";
    month[8] = "AUG";
    month[9] = "SEP";
    month[10] = "OCT";
    month[11] = "NOV";
    month[12] = "DEC";
    var today = new Date();
    var mm = today.getMonth() + 1;
    this.thismonth = month[mm];
  }

  public sessionid;
  getSession() {
    this.sessionid = this.sessionSt.retrieve("_UUID");
    this.adminid = this.sessionid;
    this.findrole();
  }

  open(merchantid) {
    // window.location.href = "/redemptionMember?id=" + merchantid;
    const rdmurl = "/redemptionMember?id=" + merchantid;
    console.log(rdmurl)
    this.router.navigateByUrl(rdmurl)
  }


  getMerch() {
    this.http.get('http://165.22.50.213:3000/getmerchant').subscribe(res => {
      this.merchArr = res['data'];
      // this.merchArr.forEach(element => {
      //   this.http.get('http://165.22.50.213:3000/getmerchantpoint', element['_id']).subscribe(res => {
      //   });
      // });
    });
  }

  getMonthlyRedemp() {
    var today = new Date();
    var mm = today.getMonth() + 1;
    var month = mm.toString();

    this.http.get('http://165.22.50.213:3000/getpointsredeem').subscribe(res => {
      this.redempArr = res['data'];
      for (var i = 0; i < this.redempArr.length; i++) {
        var z = this.redempArr[i].createddate.split('-')
        if (month == z[1]) {
          this.total2 += parseFloat(this.redempArr[i].points);
        }
      }
    });
  }
  getRedemp() {

    this.http.get('http://165.22.50.213:3000/getpointsredeem').subscribe(res => {
      this.redempArr = res['data'];
      for (var i = 0; i < this.redempArr.length; i++) {
        this.total1 += parseFloat(this.redempArr[i].points);
      }
    });
  }
  geteachPoint() {
    this.http.get('http://165.22.50.213:3000/geteachmerchpoint').subscribe(res => {
      this.eachRedempArr1 = res['data'];
      this.eachRedempArr2 = res['data1'];

      for (var i = 0; i < this.eachRedempArr1.length; i++) {
        this.total = 0;
        for (var j = 0; j < this.eachRedempArr2.length; j++) {
          if (this.eachRedempArr1[i]._id == this.eachRedempArr2[j].merchantid) {
            this.eachTotal[this.eachRedempArr2[j].merchantid] = 0;
            this.total += parseFloat(this.eachRedempArr2[j].points);
            this.eachTotal[this.eachRedempArr2[j].merchantid] = this.total;
          }
        }
      }
      this.dtTrigger.next(void 0);
      $('#loader').hide();
      $('#loader-wrapper').hide();
      $('#loader-inner').hide();
      $('body').css("overflow-y", "visible");
    });
  }
  getPointCollect() {
    this.http.get('http://165.22.50.213:3000/getpointsgiven').subscribe(res => {
      this.pointCollectArr = res['data'];
      for (var j = 0; j < this.pointCollectArr.length; j++) {
        this.totalgiven += parseFloat(this.pointCollectArr[j].pointsget);
      }
    });
  }
  // geteachPoint(){
  //   this.http.get('http://165.22.50.213:3000/geteachmerchpoint').subscribe(res => {
  //     this.eachRedempArr1 = res['data'];
  //     this.eachRedempArr2 = res['data1'];

  //     // var arrayRedemp = {};

  //     for(var i=0; i < this.eachRedempArr1.length; i++){
  //       this.total = 0;
  //       for(var j=0; j < this.eachRedempArr2.length; j++){
  //           if(this.eachRedempArr1[i]._id == this.eachRedempArr2[j].merchantID){

  //               this.eachTotal[this.eachRedempArr2[j].merchantID]=0;
  //               this.total += parseInt(this.eachRedempArr2[j].points);
  //               // total =  parseInt(this.eachTotal[this.eachRedempArr2[j].merchantID]);
  //               // total += parseInt(this.eachRedempArr2[j].points);
  //               // this.eachTotal[i] =  parseInt(this.eachRedempArr2[j].points);
  //               // total = parseInt(this.eachTotal[this.eachRedempArr2[j].merchantID]) + parseInt(this.eachRedempArr2[j].points);
  //               // this.eachTotal[this.eachRedempArr2[j].merchantID] = total.toString();
  //               // this.eachTotal[this.eachRedempArr2[j].merchantID] = parseInt(this.eachTotal[this.eachRedempArr2[j].merchantID]) + parseInt(this.eachRedempArr2[j].points)
  //               this.eachTotal[this.eachRedempArr2[j].merchantID] = this.total;
  //               // arrayRedemp = {
  //               //   'total':this.total
  //               // }
  //               // this.eachTotal.push(arrayRedemp);
  //           }
  //       }

  //     }
  //   });
  // }
  isEmpty(id) {
    if (this.eachTotal[id] == null) {
      return this.eachTotal[id] = '0';
    }
    else {
      return this.eachTotal[id];
    }
  }
  pointCollectArr = [];
  totalgiven: number = 0;
  // getPointCollect() {
  //   this.http.get('http://165.22.50.213:3000/getpointscollect').subscribe(res => {
  //     this.pointCollectArr = res['data'];
  //       for(var j=0; j < this.pointCollectArr.length; j++){
  //          this.totalgiven += parseInt(this.pointCollectArr[j].points);
  //     }
  //   });
  // }
  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('redeemtable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    var wscols = [
      { wch: 20 },
      { wch: 20 },
      { wch: 30 },
      { wch: 20 },
      { wch: 20 },
    ];
    ws['!cols'] = wscols;
    ws['!cols'][0] = { hidden: true };

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, 'RdemptionList.xlsx');

  }

  public adminid;
  public adminrole;
  public thisedit = false;
  public thisdelete = false;
  public thisadd = false;
  public thisview = false;
  public thisexport = false;
  findrole() {
    this.http.get('http://165.22.50.213:3000/getaadminuser/' + this.adminid).subscribe(res => {
      this.adminrole = res['data'][0].redemption;
      var x = this.adminrole.split('-');
      if (x[0] == '1') {//view
        $("[name='viewclass']").show();
        this.thisview = true;
      }
      if (x[1] == '1') {//edit
        $("[name='editclass']").show();
        this.thisedit = true;
      }
      if (x[2] == '1') {//add
        $("[name='addclass']").show();
        this.thisadd = true;
      }
      if (x[3] == '1') {//delete
        $("[name='deletclass']").show();
        this.thisdelete = true;
      }
      if (x[4] == '1') {//export
        $("[name='exportclass']").show();
        this.thisexport = true;
      }

    });

  }
}
