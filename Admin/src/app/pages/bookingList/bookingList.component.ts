import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import tinymce from 'tinymce';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import * as XLSX from 'xlsx';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
@Component({
  selector: 'app-bookingList',
  templateUrl: './bookingList.component.html',
  styleUrls: ['./bookingList.component.scss']
})
export class BookingListComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger1: Subject<any> = new Subject();
  dtTrigger2: Subject<any> = new Subject();

  constructor(private modalService: NgbModal, private router:Router,
    private http: HttpClient, private sessionSt: SessionStorageService) {
    this.srch = [...this.bookingvenues];
    this.srch = [...this.bookingevents];
  }

  bookingvenues = [];
  bookingevents = [];
  public srch = [];

  ngOnInit() {
    $(window).scrollTop(0);
    this.getSession();
    $('#loader').show();
    $('body').css("overflow-y", "hidden");
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      lengthMenu: [5, 10, 20]
    };
    this.getBookingVenue();
    this.getBookingEvent();
  }
  ngOnDestroy(): void {

    // Do not forget to unsubscribe the event
    this.dtTrigger1.unsubscribe();
    this.dtTrigger2.unsubscribe();
  }

  public sessionid;
  getSession() {
    this.sessionid = this.sessionSt.retrieve("_UUID");
    this.adminid = this.sessionid;
    this.findrole();
  }

  getBookingVenue() {
    this.http.get('http://165.22.50.213:3000/getbookingvenue').subscribe(res => {
      this.bookingvenues = res['data'];
      this.dtTrigger1.next(void 0);
    });
  }

  getBookingEvent() {
    this.http.get('http://165.22.50.213:3000/getbookingevent').subscribe(res => {
      this.bookingevents = res['data'];
      this.dtTrigger2.next(void 0);
      $('#loader').hide();
      $('#loader-wrapper').hide();
      $('#loader-inner').hide();
      $('body').css("overflow-y", "visible");
    });
  }
  exportvenueexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('venuetable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    var wscols = [
      { wch: 30 },
      { wch: 20 },
      { wch: 30 },
      { wch: 20 },
      { wch: 20 },
      { wch: 10 },
      { wch: 20 },
    ];
    ws['!cols'] = wscols;
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, 'BookingVenueList.xlsx');

  }
  exporteventexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('eventtable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    var wscols = [
      { wch: 30 },
      { wch: 20 },
      { wch: 30 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 10 },
      { wch: 20 },
    ];
    ws['!cols'] = wscols;
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, 'BookingEventList.xlsx');

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
      this.adminrole = res['data'][0].bookinglist;
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
        $("#testing").hide();
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
