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
  selector: 'app-membertransactcollect',
  templateUrl: './membertransactcollect.component.html',
  styleUrls: ['./membertransactcollect.component.scss']
})
export class MembertransactcollectComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  pointCollectArr=[];
  pointTransactArr=[];
  memberArr =[];
  merchArr =[];
  specificpointCollectArr=[];
  specificpointTransactArr=[];
  constructor(private modalService: NgbModal, private router:Router,
    private http: HttpClient, private domSanitizer: DomSanitizer, private sessionSt: SessionStorageService) {

  }
  public id;
  public merchid;
  public membername;
  public shopname;
  ngOnInit() {
    this.getSession()
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      lengthMenu : [5, 10, 20]
    };
    var url= document.URL;
    this.id = /id=([^&]+)merchid%3D([^&]+)/.exec(url)[1]
    this.merchid = /merchid%3D([^&]+)/.exec(url)[1]
    console.log(this.id);
    console.log(this.merchid);
    this.getMemberName();
    this.getMerchantName();
    this.getPointCollect();
    

  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  getPointCollect(){
    var y =this.id+'-'+this.merchid;
    this.http.get('http://165.22.50.213:3000/getpointcollect/'+y).subscribe(res => {
      this.specificpointCollectArr = res['data'];
      console.log(this.specificpointCollectArr)
      this.getPointTransact();
    });
  }
  getPointTransact() {
    var y =this.id+'-'+this.merchid;
    this.http.get('http://165.22.50.213:3000/getpointredeem/'+y).subscribe(res => {
      this.specificpointTransactArr = res['data'];
      console.log(this.specificpointCollectArr)
      this.dtTrigger.next(void 0);
    });
}
  // getPointCollect() {
  //   var j =0;
  //   this.http.get('http://165.22.50.213:3000/getpointscollect').subscribe(res => {
  //     this.pointCollectArr = res['data'];
  //     for(var i=0; i < this.pointCollectArr.length; i++){
  //       if(this.pointCollectArr[i].memberID == this.id && this.pointCollectArr[i].merchantID == this.merchid){
  //         this.specificpointCollectArr[j] = this.pointCollectArr[i];
  //         j++;
  //       }
  //     }
  //   });
  // }
  // getPointTransact() {
  //   var j =0;
  //   this.http.get('http://165.22.50.213:3000/getpointstransact').subscribe(res => {
  //     this.pointTransactArr = res['data'];
  //     for(var i=0; i < this.pointTransactArr.length; i++){
  //       if(this.pointTransactArr[i].memberID == this.id && this.pointTransactArr[i].merchantID == this.merchid){
  //         this.specificpointTransactArr[j] = this.pointTransactArr[i];
  //         j++;
  //       }
  //     }
      
  //   });
  // }
  getMemberName() {
    this.http.get('http://165.22.50.213:3000/getmember').subscribe(res => {
      this.memberArr = res['data'];
      for(var i=0; i < this.memberArr.length; i++){
        if(this.memberArr[i]._id == this.id){
          this.membername = this.memberArr[i].name;
        }
      }
    });
  }
  getMerchantName(){
    this.http.get('http://165.22.50.213:3000/getamerchant/'+this.merchid).subscribe(res => {
      this.merchArr = res['data'];

          this.shopname = this.merchArr[0].companyname;

      // this.dtTrigger[0].next(void 0);
     
    });

  }
  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('gametable');
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
    XLSX.writeFile(wb, 'gamificationList.xlsx');
  
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
