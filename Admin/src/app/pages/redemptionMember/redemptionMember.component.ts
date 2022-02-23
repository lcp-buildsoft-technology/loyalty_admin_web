import { AfterViewInit, Component, OnInit, OnDestroy,ViewChild} from '@angular/core';
import * as $ from 'jquery';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
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
  selector: 'app-redemptionMember',
  templateUrl: './redemptionMember.component.html',
  styleUrls: ['./redemptionMember.component.css']
})
export class RedemptionMemberComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  
  public id;
  message: any;
  redempArr = [];
  merchArr = [];
  search: any;
  totalgiven: number=0;
  total: number =0;
  total1: number=0
  total2: number=0
  total3: number=0
  eachRedempArr1 = [];
  eachRedempArr2 = [];
  eachRedempArr3 = [];
  eachRedempArr4 = [];
  memberArr = [];

  pointCollectArr=[];
  pointTransactArr=[];
  eachTotal=[];
  eachTotal1=[];
  eachTotal2=[];
  public thismonth;
  public srch =[];
  public sech =[];
  public sach =[];
  public shopname;
  constructor(private modalService: NgbModal, private router:Router,
    private http: HttpClient, private domSanitizer: DomSanitizer, private sessionSt: SessionStorageService) {
    this.srch = [...this.redempArr];
    this.sech = [...this.merchArr];
    this.sach = [...this.memberArr];
  }

  ngOnInit() {
    this.checkdate();
    this.getSession();
    var url= document.URL;
    this.id = /id=([^&]+)/.exec(url)[1]
    // console.log(this.id);
    this.getMerchantName();
    this.getMember();
    this. getmonthlytotalPoint();
    this.gettotalPoint();
    this.gettotalPointgiven();
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      lengthMenu : [5, 10, 20]
    };
    // this.test();
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  checkdate(){
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
    var mm = today.getMonth()+1;
    this.thismonth = month[mm];
  }
  gettotalPoint(){
    this.http.get('http://165.22.50.213:3000/getamerchantredeem/'+this.id).subscribe(res => {
      this.eachRedempArr2 = res['data'];
        this.total = 0;
        for(var j=0; j < this.eachRedempArr2.length; j++){
            this.total += parseFloat(this.eachRedempArr2[j].points);
            this.eachTotal[this.eachRedempArr2[j].merchantID] = this.total;
        }
    });
  }

  getmonthlytotalPoint(){
    var today = new Date();
    var mm = today.getMonth()+1;
    var month = mm.toString();

    this.http.get('http://165.22.50.213:3000/getamerchantredeem/'+this.id).subscribe(res => {
      this.eachRedempArr2 = res['data'];
        this.total3 = 0;
        for(var j=0; j < this.eachRedempArr2.length; j++){
          var z = this.eachRedempArr2[j].createddate.split('-')
          if(month == z[1]){
            this.total3 += parseFloat(this.eachRedempArr2[j].points);
            // this.eachTotal[this.eachRedempArr2[j].merchantID] = this.total3;
          }
        }
    });
  }
  // gettotalPoint(){
  //   this.http.get('http://165.22.50.213:3000/geteachmerchpoint').subscribe(res => {
  //     this.eachRedempArr1 = res['data'];
  //     this.eachRedempArr2 = res['data1'];
      
  //     // console.log(this.eachRedempArr1)
  //     // console.log(this.eachRedempArr2)

  //     for(var i=0; i < this.eachRedempArr1.length; i++){
  //       this.total = 0;
  //       for(var j=0; j < this.eachRedempArr2.length; j++){
  //           if( this.eachRedempArr2[j].merchantID == this.id){
  //               this.eachTotal[this.eachRedempArr2[j].merchantID]=0;
  //               this.total += parseInt(this.eachRedempArr2[j].points);
  //               this.eachTotal[this.eachRedempArr2[j].merchantID] = this.total;
  //           }
  //       }
  //     }
  //     this.dtTrigger[3].next(void 0);
  //     // console.log(this.eachTotal)
  //   });
  // }
  gettotalPointgiven(){
    this.http.get('http://165.22.50.213:3000/getamerchantgiven/'+this.id).subscribe(res => {
      this.eachRedempArr3 = res['data'];
        for(var j=0; j < this.eachRedempArr3.length; j++){
                this.totalgiven += parseFloat(this.eachRedempArr3[j].pointsget);
        }
        
      // this.dtTrigger[2].next(void 0);
    });
  }
  // gettotalPointgiven(){
  //   this.http.get('http://165.22.50.213:3000/geteachmerchpointgiven').subscribe(res => {
  //     this.eachRedempArr3 = res['data'];
  //     this.eachRedempArr4 = res['data1'];
      
  //     // console.log(this.eachRedempArr1)
  //     // console.log(this.eachRedempArr2)

  //     for(var i=0; i < this.eachRedempArr3.length; i++){
  //       this.totalgiven = 0;
  //       for(var j=0; j < this.eachRedempArr4.length; j++){
  //           if( this.eachRedempArr4[j].merchantID == this.id){
  //               this.eachTotal[this.eachRedempArr4[j].merchantID]=0;
  //               this.totalgiven += parseInt(this.eachRedempArr4[j].points);
  //               this.eachTotal[this.eachRedempArr4[j].merchantID] = this.totalgiven;
  //           }
  //       }
  //     }
  //     // console.log(this.eachTotal)
  //     this.dtTrigger[2].next(void 0);
  //   });
  // }

  getMember() {
    this.http.get('http://165.22.50.213:3000/getmember').subscribe(res => {
      this.memberArr = res['data'];
      console.log(this.memberArr)
      this.getPointCollect();
    });
  }
  getMerchantName(){
    this.http.get('http://165.22.50.213:3000/getamerchant/'+this.id).subscribe(res => {
      this.merchArr = res['data'];
      for(var i=0; i < this.merchArr.length; i++){
        if(this.merchArr[i]._id == this.id){
          this.shopname = this.merchArr[i].companyname;
        }
      }
      // this.dtTrigger[0].next(void 0);
    });

  }
  // testing=[]
  // test(){
  //   var y =this.id+'-'+'61a05f4e14b12992053936cf';
  //   this.http.get('http://165.22.50.213:3000/gtest/'+y).subscribe(res => {
  //     this.testing = res['data'];
  //     console.log("testing=",this.testing)
  //     // console.log(this.memberArr)
  //   });
  // }
    getPointCollect() {
    this.http.get('http://165.22.50.213:3000/getamerchantgiven/'+this.id).subscribe(res => {
      this.pointCollectArr = res['data'];
      // console.log(this.pointCollectArr)
      for(var i=0; i < this.memberArr.length; i++){
        this.total2 = 0;
        for(var j=0; j < this.pointCollectArr.length; j++){
            if( this.memberArr[i]._id == this.pointCollectArr[j].memberid){
              
                this.eachTotal2[this.pointCollectArr[j].memberid]=0;
                this.total2 += parseFloat(this.pointCollectArr[j].pointsget);
                this.eachTotal2[this.pointCollectArr[j].memberid] = this.total2;
              
            }
        }
      }
      // this.dtTrigger[1].next(void 0);
      this.getPointTransact();
    });
  }
  getPointTransact() {
    this.http.get('http://165.22.50.213:3000/getamerchantredeem/'+this.id).subscribe(res => {
      this.pointTransactArr = res['data'];
      // console.log(this.pointTransactArr)
      
      for(var i=0; i < this.memberArr.length; i++){
        this.total1 = 0;
        for(var j=0; j < this.pointTransactArr.length; j++){
            if( this.memberArr[i]._id == this.pointTransactArr[j].memberid){
                this.eachTotal1[this.pointTransactArr[j].memberid]=0;
                this.total1 += parseFloat(this.pointTransactArr[j].points);
                this.eachTotal1[this.pointTransactArr[j].memberid] = this.total1;
            }
        }
      }
      this.dtTrigger.next(void 0);
      //tengsheng
    });
  }
  open(id) {
    // window.location.href = "/membertransactcollect?id=" + id + "merchid=" + this.id;
    const mturl = "/membertransactcollect?id=" + id + "merchid=" + this.id;
    console.log(mturl)
    this.router.navigateByUrl(mturl)
  }
  isEmpty(id){
    if(this.eachTotal1[id] == null){
      return this.eachTotal1[id] ='0';
    }
    else{
      return this.eachTotal1[id];
    }
  }
  isEmpty2(id){
    if(this.eachTotal2[id] == null){
      return this.eachTotal2[id] ='0';
    }
    else{
      return this.eachTotal2[id];
    }
  }
  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('redemmemtable');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    var wscols = [
      {wch:20},
      {wch:20},
      {wch:30},
      {wch:20},
      {wch:20},
      {wch:20},
  ];
  ws['!cols'] = wscols;
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */  
    XLSX.writeFile(wb, 'RedemptionFor'+this.shopname+'.xlsx');
  
  }
  public sessionid;
  getSession() {
    this.sessionid = this.sessionSt.retrieve("_UUID");
    this.adminid = this.sessionid;
    this.findrole();
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
      console.log(this.adminrole);
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
