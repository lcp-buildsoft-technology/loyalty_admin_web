import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import tinymce from 'tinymce';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from 'express';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import * as XLSX from 'xlsx';
import { Buffer } from 'buffer';
import { FormBuilder } from '@angular/forms';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-MemberAccountManagement',
  templateUrl: './MemberAccountManagement.component.html',
  styleUrls: ['./MemberAccountManagement.component.css'],
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `],
})
export class MemberAccountManagementComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  message: any;
  memberArr = [];
  mem: Object;

  bookingevents = [];
  public srch = [];
  constructor(private modalService: NgbModal, private http: HttpClient, private sessionSt: SessionStorageService, private form: FormBuilder) {
    this.srch = [...this.memberArr];
  }

  public editMember = {
    name: '',
    phonenumber: '',
    emailaddress: '',
    password: '',
    birthdate: '',
    tierlevel: '',
    pointscollect: '',
    pointsredeem: ''
  }

  ngOnInit() {
    $(window).scrollTop(0);
    $(window).on('beforeunload', function () {
      $(window).scrollTop(0);
    });
    this.getSession();
    $('#loader').show();
    $('body').css("overflow-y", "hidden");

    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      lengthMenu: [5, 10, 20]
    };
    this.getMember();
    this.getBookingEvent();
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  public sessionid;
  getSession() {
    this.sessionid = this.sessionSt.retrieve("_UUID");
    this.adminid = this.sessionid;
    this.findrole();
  }

  getMember() {
    this.http.get('http://165.22.50.213:3000/getmember').subscribe(res => {

      this.memberArr = res['data'];
      // window.location.reload();
    });
  }
  bookingeventarr = [];
  bookingeventcontactarr = [];
  imagesArr = [];
  image1arr = [];
  imagetypearr = [];
  getBookingEvent() {
    this.http.get('http://165.22.50.213:3000/getbookingevent').subscribe(res => {
      this.bookingevents = res['data'];
      if (this.bookingevents.length != 0) {

        this.dtTrigger.next(void 0);
        this.getmerchantevent();
      }
      else{
        $('#loader').hide();
        $('#loader-wrapper').hide();
        $('#loader-inner').hide();
        $('body').css("overflow-y", "visible");
        this.dtTrigger.next(void 0);
      }

    });
  }
  getmerchantevent() {
    for (let i = 0; i < this.bookingevents.length; i++) {
      var id = this.bookingevents[i].eventid;
      this.http.get('http://165.22.50.213:3000/getmerchantbyevent/' + id).subscribe(res => {
        this.eventarr = res['data'];
        this.bookingeventarr[this.bookingevents[i]._id] = this.eventarr[0].companyname;
        this.bookingeventcontactarr[this.bookingevents[i]._id] = this.eventarr[0].contact;
        // this.dtTrigger.next(void 0);
        $('#loader').hide();
        $('#loader-wrapper').hide();
        $('#loader-inner').hide();
        $('body').css("overflow-y", "visible");

      });
    }
  }

  public imageeventid;
  opnimage(content, events) {
    this.imagesArr[0] = events;
    this.image1arr[0] = new Buffer(this.imagesArr[0].receipt.data).toString('base64');
    this.imagetypearr[0] = this.imagesArr[0].receipt.contentType;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
  }
  eventarr = [];
  geteventmerchant(id) {
    var x;
    this.http.get('http://165.22.50.213:3000/getmerchantbyevent/' + id).subscribe(res => {
      this.eventarr = res['data'];

      this.bookingeventarr[id] = this.eventarr[0].companyname;
      // this.dtTrigger.next(void 0);
    });
  }
 
  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('membertable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    var wscols = [
      { wch: 20 },
      { wch: 20 },
      { wch: 30 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
    ];

    ws['!cols'] = wscols;
    ws['!cols'][5] = { hidden: true };

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, 'MemberAccountList.xlsx');

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
      this.adminrole = res['data'][0].memberacc;
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
