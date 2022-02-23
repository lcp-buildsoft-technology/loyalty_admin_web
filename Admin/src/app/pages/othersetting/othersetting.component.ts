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
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
@Component({
  selector: 'app-othersetting',
  templateUrl: './othersetting.component.html',
  styleUrls: ['./othersetting.component.scss']
})
export class OthersettingComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger1: Subject<any> = new Subject();
  dtTrigger2: Subject<any> = new Subject();
  message: any;

  pcvalid = [];
  pcerror: number = 0;
  pgvalid = [];
  pgerror: number = 0;
  pevalid = [];
  peerror: number = 0;

  amvalid = [];
  amerror: number = 0;
  apvalid = [];
  aperror: number = 0;

  emvalid = [];
  emerror: number = 0;
  epvalid = [];
  eperror: number = 0;

  inputPattern = "^[a-zA-Z ]*$";

  constructor(private http: HttpClient, private router:Router,
    private modalService: NgbModal, private sessionSt: SessionStorageService) {
    this.srch = [...this.points];
  }

  public srch = [];
  points = [];
  merchtype = []
  productcategory = []
  pointexpiry = [];
  public edittitle;
  public deletetitle;
  public addtitle;
  public deletecap;

  ngOnInit() {
    $(window).scrollTop(0);
    this.getPoint();
    this.getmerchantype();
    this.getproductcategory();
    this.getpointex();
    this.getTier();
    this.getSession();
    $('#loader').show();
    $('body').css("overflow-y", "hidden");
    $("form").attr('autocomplete', 'off');
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      lengthMenu: [5, 10, 20]
    };

  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger1.unsubscribe();
    this.dtTrigger2.unsubscribe();
  }
  public editpoint = {
    id: '',
    Bronze: '',
    Silver: '',
    Gold: '',
  }
  public edittier = {
    id: '',
    Silver: '',
    Gold: '',
  }
  public editpexpiry = {
    id: '',
    month: '',
  }
  public edittype = {
    id: '',
    type: '',
  }
  public editcategory = {
    id: '',
    category: '',
  }
  public merchanttype = {
    type: '',
  }
  public pcategory = {
    category: '',
  }
  public sessionid;
  getSession() {
    this.sessionid = this.sessionSt.retrieve("_UUID");
    this.adminid = this.sessionid;
    this.findrole();
  }

  openEdit(edit, editype, title) {
    if (title == 'type') {
      this.edittitle = 'Edit Merchant Type';
      this.edittype = {
        id: editype._id,
        type: editype.type,
      }
    }
    else {
      this.edittitle = 'Edit Product Category';
      this.edittype = {
        id: editype._id,
        type: editype.category,
      }
    }
    this.modalService.open(edit, { scrollable: true }).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
  }
  openDelete(content, editype, title) {
    if (title == 'type') {
      this.deletetitle = 'Delete Merchant Type';
      this.deletecap = 'Merchant Type: ';
      this.edittype = {
        id: editype._id,
        type: editype.type,
      }
    }
    else {
      this.deletetitle = 'Delete Product Category';
      this.deletecap = 'Product Category: ';
      this.edittype = {
        id: editype._id,
        type: editype.category,
      }
    }
    this.modalService.open(content, { scrollable: true }).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
  }
  openAdd(add, title) {
    if (title == 'type') {
      this.addtitle = 'New Merchant Type';
    }
    else {
      this.addtitle = 'New Product Category';
    }
    this.modalService.open(add, { scrollable: true }).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
  }

  getPoint() {
    this.http.get('http://165.22.50.213:3000/getpts').subscribe(res => {
      this.points = res['data'];
      if (this.points.length == 0) {
        this.editpoint = {
          id: '',
          Bronze: '0',
          Silver: '0',
          Gold: '0',
        }
      }
      else {
        this.editpoint = {
          id: this.points[0]._id,
          Bronze: this.points[0].Bronze,
          Silver: this.points[0].Silver,
          Gold: this.points[0].Gold,
        }
      }
    });
  }

  savepoint() {
    this.pcerror = 0;
    this.validate();
    if (this.pcerror === 0) {
      this.http.post('http://165.22.50.213:3000/editpts', this.editpoint).subscribe(res => {
        this.message = res;
        // window.location.reload();
      });
      // window.location.reload();
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/othersetting'])

    }
  }

  validate() {
    if (this.editpoint.Bronze == null) {
      this.pcvalid['Bronze'] = "*Please enter the Point Conversion!";
      this.pcerror++;
    }
    else {
      this.pcvalid['Bronze'] = ""
    }

    if (this.editpoint.Silver == null) {
      this.pcvalid['Silver'] = "*Please enter the Point Conversion!";
      this.pcerror++;
    }
    else if (this.editpoint.Silver <= this.editpoint.Bronze) {
      this.pcvalid['Silver'] = "*Invalid Point Conversion!";
      this.pcerror++;
    }
    else {
      this.pcvalid['Silver'] = ""
    }

    if (this.editpoint.Gold == null) {
      this.pcvalid['Gold'] = "*Please enter the Point Conversion!";
      this.pcerror++;
    }
    else if (this.editpoint.Gold <= this.editpoint.Silver) {
      this.pcvalid['Gold'] = "*Invalid Point Conversion!";
      this.pcerror++;
    }
    else {
      this.pcvalid['Gold'] = ""
    }
  }
  getTier() {
    this.http.get('http://165.22.50.213:3000/gettier').subscribe(res => {
      this.points = res['data'];
      if (this.points.length == 0) {
        this.edittier = {
          id: '',
          Silver: '0',
          Gold: '0',
        }
      }
      else {
        this.edittier = {
          id: this.points[0]._id,
          Silver: this.points[0].Silver,
          Gold: this.points[0].Gold,
        }
      }
    });
  }

  saveTier() {
    this.pgerror = 0;
    this.validate2();
    if (this.pgerror === 0) {
      this.http.post('http://165.22.50.213:3000/edittier', this.edittier).subscribe(res => {
        this.message = res;
        // window.location.reload();
      });
      // window.location.reload();
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/othersetting'])
    }
  }

  validate2() {
    if (this.edittier.Silver == null) {
      this.pgvalid['Silver'] = "*Please enter the Points Get!";
      this.pgerror++;
    }
    else {
      this.pgvalid['Silver'] = ""
    }

    if (this.edittier.Gold == null) {
      this.pgvalid['Gold'] = "*Please enter the Points Get!";
      this.pgerror++;
    }
    else if (this.edittier.Gold <= this.edittier.Silver) {
      this.pgvalid['Gold'] = "*Invalid Points Get!";
      this.pgerror++;
    }
    else {
      this.pgvalid['Gold'] = ""
    }
  }
  getmerchantype() {
    this.http.get('http://165.22.50.213:3000/getmerchanttype').subscribe(res => {
      this.merchtype = res['data'];
      this.dtTrigger1.next(void 0);
    });
  }
  addmerchanttype(title) {
    if (title == 'New Merchant Type') {
      this.amerror = 0;
      this.validation()
      if (this.amerror === 0) {
        this.http.post('http://165.22.50.213:3000/addnewmerchanttype', this.merchanttype).subscribe(res => {
          this.message = res;
          // window.location.reload();
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/othersetting'])
        });
      }
    }
    else {
      this.pcategory.category = this.merchanttype.type;
      this.aperror = 0;
      this.validation2()
      if (this.aperror === 0) {
        this.http.post('http://165.22.50.213:3000/addnewproductcategory', this.pcategory).subscribe(res => {
          this.message = res;
          // window.location.reload();
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/othersetting'])
        });
      }
    }
  }
  editmerchanttype(title) {
    if (title == 'Edit Merchant Type') {
      this.emerror = 0;
      this.validation3()
      if (this.emerror === 0) {
        this.http.post('http://165.22.50.213:3000/editmerchanttype', this.edittype).subscribe(res => {
          this.message = res;
          // window.location.reload();
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/othersetting'])
        });
      }
    }
    else {
      this.editcategory.id = this.edittype.id;
      this.editcategory.category = this.edittype.type;
      this.eperror = 0;
      this.validation4()
      if (this.eperror === 0) {
        this.http.post('http://165.22.50.213:3000/editproductcategory', this.editcategory).subscribe(res => {
          this.message = res;
          // window.location.reload();
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/othersetting'])
        });
      }
    }
  }
  deletemerchanttype(id, title) {
    if (title == 'Delete Merchant Type') {
      this.http.delete('http://165.22.50.213:3000/deletemerchanttype/' + id).subscribe(res => {
        this.message = res;
        // window.location.reload();
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/othersetting'])
      });
    }
    else {
      this.http.delete('http://165.22.50.213:3000/deleteproductcategory/' + id).subscribe(res => {
        this.message = res;
        // window.location.reload();
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/othersetting'])
      });
    }
  }
  //===========================================================================================
  getproductcategory() {
    this.http.get('http://165.22.50.213:3000/getproductcategory').subscribe(res => {
      this.productcategory = res['data'];
      this.dtTrigger2.next(void 0);
    });
  }

  getpointex() {
    this.http.get('http://165.22.50.213:3000/getpointexpiry').subscribe(res => {
      this.pointexpiry = res['data'];
      if (this.pointexpiry.length == 0) {
        this.editpexpiry = {
          id: '',
          month: '0',
        }
      }
      else {
        this.editpexpiry = {
          id: this.pointexpiry[0]._id,
          month: this.pointexpiry[0].month,
        }
      }
    });
  }
  editpointex() {
    this.peerror = 0;
    this.validate3();
    if (this.peerror === 0) {
      this.http.post('http://165.22.50.213:3000/editpointexpiry', this.editpexpiry).subscribe(res => {
        this.message = res;
        // window.location.reload();
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/othersetting'])
      });

    }
  }

  validate3() {
    if (this.editpexpiry.month == null) {
      this.pevalid['month'] = "*Please enter the Point Expiry!";
      this.peerror++;
    }
    else {
      this.pevalid['month'] = ""
    }
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
      this.adminrole = res['data'][0].generalsetting;
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
      $('#loader').hide();
      $('#loader-wrapper').hide();
      $('#loader-inner').hide();
      $('body').css("overflow-y", "visible");
    });

  }

  // Add merchant type
  validation() {
    if (this.merchanttype.type === '') {
      this.amvalid['type'] = "*Merchant type is required!";
      this.amerror++;
    }
    else if (!this.merchanttype.type.match(this.inputPattern)) {
      this.amerror++;
    }
    else {
      this.amvalid['type'] = ""
    }
  }

  //Add product category
  validation2() {
    if (this.merchanttype.type === '') {
      this.apvalid['type'] = "*Product category is required!";
      this.aperror++;
    }
    else if (!this.merchanttype.type.match(this.inputPattern)) {
      this.aperror++;
    }
    else {
      this.apvalid['type'] = ""
    }
  }

  //Edit merchant type
  validation3() {
    if (this.edittype.type === '') {
      this.emvalid['type'] = "*Merchant type is required!";
      this.emerror++;
    }
    else if (!this.edittype.type.match(this.inputPattern)) {
      this.emerror++;
    }
    else {
      this.emvalid['type'] = ""
    }
  }

  //edit product category
  validation4() {
    if (this.edittype.type === '') {
      this.epvalid['type'] = "*Product category is required!";
      this.eperror++;
    }
    else if (!this.edittype.type.match(this.inputPattern)) {
      this.eperror++;
    }
    else {
      this.epvalid['type'] = ""
    }
  }

}
