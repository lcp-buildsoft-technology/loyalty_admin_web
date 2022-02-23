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
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss']
})

export class RewardsComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger1: Subject<any> = new Subject();
  dtTrigger2: Subject<any> = new Subject();


  message: any;
  rewardArr = [];
  voucherArr = [];
  new: Object;
  public srch = [];
  public sch = [];
  valid = [];
  error: number = 0;

  constructor(private modalService: NgbModal, private router:Router,
    private http: HttpClient, private form: FormBuilder, private sessionSt: SessionStorageService) {
    this.srch = [...this.rewardArr];
    this.sch = [...this.voucherArr];
  }

  public editRwd = {
    title: '',
    thumbnail: '',
    detail: '',
    type: '',
    reward: '',
    termsandcondition: '',
    sdate: '',
    edate: '',
    status: '',
  }

  public editVch = {
    _id: '',
    title: '',
    thumbnail: '',
    detail: '',
    type: '',
    quantity: '',
    discount: '',
    minspend: '',
    termsandcondition: '',
    sdate: '',
    edate: '',
    status: '',
    merchantid: '',

  }

  ngOnInit() {
    $(window).scrollTop(0);
    this.getSession();
    $('#loader').show();
    $('body').css("overflow-y", "hidden");
    // this.showImage();
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      lengthMenu: [5, 10, 20]
    };
    this.getRwdvoucher();
    this.getVch();
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
  //IMAGE
  openr(rwd, title) {
    if(this.thisedit){
      // window.location.href = "/editRwd?id=" + rwd._id;
      const edrurl = "/editRwd?id=" + rwd._id;
      console.log(edrurl)
      this.router.navigateByUrl(edrurl)
      }
      else{
        alert("You have no permission to edit")
      }
    
    // this.modalService.open(editrwd, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    // });
  }

  openrv(rwd, title) {
    if(this.thisedit){
    // window.location.href = "/editRwdVch?id=" + rwd._id;
    const edrvurl = "/editRwdVch?id=" + rwd._id;
      console.log(edrvurl)
      this.router.navigateByUrl(edrvurl)
    }
    else{
      alert("You have no permission to edit")
    }
    // this.modalService.open(editrwd, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    // });
  }

  public rwdid;
  image(content, reward) {

    this.imagesArr[0] = reward;
    this.image1arr[0] = new Buffer(this.imagesArr[0].thumbnail.data).toString('base64');
    this.imagetypearr[0] = this.imagesArr[0].thumbnail.contentType;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
  }
  imagesArr = [];
  image1arr = [];
  imagetypearr = [];

  //REWARD
  openrwd(editrwd, rwd) {
    this.editRwd = {
      title: rwd.title,
      thumbnail: rwd.thumbnail,
      detail: rwd.detail,
      type: rwd.type,
      reward: rwd.reward,
      termsandcondition: rwd.termsandcondition,
      sdate: rwd.sdate,
      edate: rwd.edate,
      status: rwd.status

    }

    $('#type [value=' + rwd.type + ']').attr('selected', 'true');
    $('#status [value=' + rwd.status + ']').attr('selected', 'true');

    this.modalService.open(editrwd, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
  }

  getRwd() {
    this.http.get('http://165.22.50.213:3000/getrewardandimage').subscribe(res => {
      this.rewardArr = res['data'];
      // this.dtTrigger1.next(void 0);
      this.dtTrigger1.next(void 0);
      
    });
  }
  public rewvch = []
  getRwdvoucher() {
    this.http.get('http://165.22.50.213:3000/getrewardvchandimage').subscribe(res => {
      this.rewvch = res['data'];
      this.getRwd();
      
    });
  }

  uploadRwd(rwd) {
    this.error = 0;
    this.valid = this.validation();

    if (this.error === 0) {
      this.http.post('http://165.22.50.213:3000/editRwd', rwd).subscribe(res => {
        this.message = res;
      });
      // window.location.reload();
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/rewards'])

    }
  }

  validation() {
    if (this.editRwd.title === '') {
      this.valid['title'] = "*Title is required!";
      this.error++;
    }
    else {
      this.valid['title'] = ""
    }

    if (this.editRwd.thumbnail === '') {
      this.valid['thumbnail'] = "*Thumbnail is required!";
      this.error++;
    }
    else {
      this.valid['thumbnail'] = ""
    }

    if (this.editRwd.detail === '') {
      this.valid['detail'] = "*Detail is required!";
      this.error++;
    }
    else {
      this.valid['detail'] = ""
    }

    if (this.editRwd.type === '') {
      this.valid['type'] = "*Type is required!";
      this.error++;
    }
    else {
      this.valid['type'] = ""
    }

    if (this.editRwd.reward === '') {
      this.valid['reward'] = "*Reward is required!";
      this.error++;
    }
    else {
      this.valid['reward'] = ""
    }

    if (this.editRwd.termsandcondition === '') {
      this.valid['termsandcondition'] = "*Terms and Conditions is required!";
      this.error++;
    }
    else {
      this.valid['termsandcondition'] = ""
    }

    if (this.editRwd.status === '') {
      this.valid['status'] = "*Status is required!";
      this.error++;
    }
    else {
      this.valid['status'] = ""
    }

    return this.valid;
  }

  //VOUCHER

  openv(vch) {
    $('#vch_type [value=' + vch.type + ']').attr('selected', 'true');
    $('#vch_status [value=' + vch.status + ']').attr('selected', 'true');
    if(this.thisedit){
      // window.location.href = "/editVch?id=" + vch._id;
      const edvurl = "/editVch?id=" + vch._id;
      console.log(edvurl)
      this.router.navigateByUrl(edvurl)

      }
      else{
        alert("You have no permission to edit")
      }

  }

  openvch(editvch, vch) {
    this.editVch = {
      _id: vch._id,
      title: vch.title,
      thumbnail: vch.thumbnail,
      detail: vch.detail,
      type: vch.type,
      quantity: vch.quantity,
      discount: vch.discount,
      minspend: vch.minspend,
      termsandcondition: vch.termsandcondition,
      sdate: vch.sdate,
      edate: vch.edate,
      status: vch.status,
      merchantid: vch.merchantid,

    }
    $('#vch_type [value=' + vch.type + ']').attr('selected', 'true');
    $('#vch_status [value=' + vch.status + ']').attr('selected', 'true');

    this.modalService.open(editvch, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
  }

  public vch = {
    title: '',
    thumbnail: '',
    detail: '',
    type: '',
    quantity: '',
    discount: '',
    minspend: '',
    termsandcondition: '',
    sdate: '',
    edate: '',
    status: '',
    merchantid: ''
  }

  getVch() {
    this.http.get('http://165.22.50.213:3000/getVch').subscribe(res => {
      this.voucherArr = res['data'];
      this.dtTrigger2.next(void 0);
      $('#loader').hide();
      $('#loader-wrapper').hide();
      $('#loader-inner').hide();
      $('body').css("overflow-y", "visible");
    });
  }

  uploadVch(vch) {
    this.http.post('http://165.22.50.213:3000/editVch', vch).subscribe(res => {
      this.message = res;
    });
    // window.location.reload();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/rewards'])

  }

  exportrewardexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('rewardtable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    var wscols = [
      { wch: 20 },
      { wch: 20 },
      { wch: 30 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
    ];
    ws['!cols'] = wscols;
    ws['!cols'][0] = { hidden: true };
    
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, 'RewardsList.xlsx');

  }
  exportvoucherexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('vouchertable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    var wscols = [
      { wch: 20 },
      { wch: 20 },
      { wch: 30 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
    ];
    ws['!cols'] = wscols;
    ws['!cols'][0] = { hidden: true };

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, 'VoucherList.xlsx');

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
      this.adminrole = res['data'][0].rewards;
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
        this.thisdelete = true;
        $("[name='deletclass']").show();
      }
      if (x[4] == '1') {//export
        this.thisexport = true;
        $("[name='exportclass']").show();
      }

    });

  }
}