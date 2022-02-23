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
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss']
})
export class AdvertisementComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  // dtOptions: DataTables.Settings = {};
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  message: any;
  adsArr = [];
  new: Object;
  public srch = [];
  validErr = [];
  errorcount: number = 0;

  constructor(private modalService: NgbModal, private router:Router,
    private http: HttpClient, private domSanitizer: DomSanitizer, private form: FormBuilder, private sessionSt: SessionStorageService) {
    this.srch = [...this.adsArr];
  }
  public editads = {
    _id: '',
    title: '',
    pdate: '',
    ptime: '',
    sdate: '',
    edate: '',
    merchant: '',
    thumbnail: [],
    detail: ''
  }

  ngOnInit() {
    $(window).scrollTop(0);
    // this.showImage();
    this.getSession();
    this.dtOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [5, 10, 20],
      processing: true,
    };
    $('#loader').show();
    $('body').css("overflow-y", "hidden");
    this.getAds();
    this.getMerch();
  }

  public sessionid;
  getSession() {
    this.sessionid = this.sessionSt.retrieve("_UUID");
    this.adminid = this.sessionid;
    this.findrole();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  open(content, ads) {
    // window.location.href = "/editads?id=" + ads._id;
    const eadurl = "/editads?id=" + ads._id;
    console.log(eadurl)
    this.router.navigateByUrl(eadurl)

    this.editads = {
      _id: ads._id,
      title: ads.title,
      pdate: ads.pdate,
      ptime: ads.ptime,
      sdate: ads.sdate,
      edate: ads.edate,
      merchant: ads.merchant,
      thumbnail: ads.thumbnail,
      detail: ads.detail
    }
    $('#merchantname [value="' + ads.merchant + '"]').attr('selected', 'true');
    // this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    // });
  }

  openDlt(content, ads) {
    this.editads = {
      _id: ads._id,
      title: ads.title,
      pdate: ads.pdate,
      ptime: ads.ptime,
      sdate: ads.sdate,
      edate: ads.edate,
      merchant: ads.merchant,
      thumbnail: ads.thumbnail,
      detail: ads.detail
    }
    this.imagesArr[0] = ads;
    this.image1arr[0] = new Buffer(this.imagesArr[0].thumbnail.data).toString('base64');
    this.imagetypearr[0] = this.imagesArr[0].thumbnail.contentType;
    $('#merchantname [value="' + ads.merchant + '"]').attr('selected', 'true');    // this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    this.modalService.open(content, { scrollable: true }).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
  }

  getAds() {
    this.http.get('http://165.22.50.213:3000/getadvertandimage').subscribe(res => {
      this.adsArr = res['data'];
      this.dtTrigger.next(void 0);
      $('#loader').hide();
      $('#loader-wrapper').hide();
      $('#loader-inner').hide();
      $('body').css("overflow-y", "visible");
    });
  }

  public image;
  public imagetype;
  opnimage(content, ads) {
    this.imagesArr[0] = ads;
    this.image1arr[0] = new Buffer(this.imagesArr[0].thumbnail.data).toString('base64');
    this.imagetypearr[0] = this.imagesArr[0].thumbnail.contentType;

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
  }

  image1arr = [];
  imagetypearr = [];
  imagesArr = [];
 
  uploadAds(ads) {
    this.errorcount = 0;
    this.validation();
    if (this.errorcount === 0) {
      this.http.post('http://165.22.50.213:3000/editads', ads).subscribe(res => {
        this.message = res;
      });
      // window.location.reload();
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/advertisement'])
    }
  }

  merchArr = [];
  getMerch() {
    this.http.get('http://165.22.50.213:3000/getmerchant').subscribe(res => {
      this.merchArr = res['data'];
    });
  }

  validation() {
    if (this.editads.title === '') {
      this.validErr['title'] = "*Title is required!";
      this.errorcount++;
    }
    else {
      this.validErr['title'] = ""
    }

    if (this.editads.pdate === '') {
      this.validErr['pdate'] = "*Publish Date is required!";
      this.errorcount++;
    }
    else {
      this.validErr['pdate'] = ""
    }

    if (this.editads.ptime === '') {
      this.validErr['ptime'] = "*Publish Time is required!";
      this.errorcount++;
    }
    else {
      this.validErr['ptime'] = ""
    }
    if (this.editads.sdate === '') {
      this.validErr['sdate'] = "*Start Date is required!";
      this.errorcount++;
    }
    else {
      this.validErr['sdate'] = ""
    }
    if (this.editads.edate === '') {
      this.validErr['edate'] = "*End Date is required!";
      this.errorcount++;
    }
    else {
      this.validErr['edate'] = ""
    }

    if (this.editads.merchant === '') {
      this.validErr['merchant'] = "*Merchant is required!";
      this.errorcount++;
    }
    else {
      this.validErr['merchant'] = ""
    }

    if (this.editads.detail === '') {
      this.validErr['detail'] = "*Details is required!";
      this.errorcount++;
    }
    else {
      this.validErr['detail'] = ""
    }

  }

  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('adstable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    var wscols = [
      // { wch: 20 },
      { wch: 20 },
      { wch: 30 },
      // { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
    ];
    ws['!cols'] = wscols;
    ws['!cols'][0] = { hidden: true };
    ws['!cols'][3] = { hidden: true };

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, 'AdvertisementList.xlsx');

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
      this.adminrole = res['data'][0].ads;
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

