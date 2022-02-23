import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import tinymce from 'tinymce';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-gsContactInfo',
  templateUrl: './gsContactInfo.component.html',
  styleUrls: ['./gsContactInfo.component.scss']
})
export class GsContactInfoComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  message: any;

  constructor(private modalService: NgbModal, private router:Router,
    private http: HttpClient, private sessionSt: SessionStorageService) {
    this.srch = [...this.contactinfo];
  }

  contactinfo = [];
  public srch = [];

  ngOnInit() {
    this.getSession();
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      lengthMenu: [5, 10, 20]
    };
    this.getContactInfo();
    $("form").attr('autocomplete', 'off');
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

  open(content) {
    this.modalService.open(content, { scrollable: true }).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
  }

  addEdit(content) {
    this.modalService.open(content, { scrollable: true }).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
  }

  openEdit(content, contactInfo) {
    this.editcontactinfo = {
      label: contactInfo.label,
      content: contactInfo.content,
    }
    this.modalService.open(content, { scrollable: true }).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
  }
  //-------------------------------------//

  public addContactInfo = {
    label: '',
    content: '',
  };

  public editcontactinfo = {
    label: '',
    content: '',
  };

  sendContactInfo() {
    this.newContactInfo(this.addContactInfo);
  }

  newContactInfo(addContactInfo) {
    // window.location.reload();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/gsAboutUs'])
    this.http.post('http://165.22.50.213:3000/addcontactinfo', addContactInfo).subscribe(res => {
      this.message = res;
    });
  }

  getContactInfo() {
    this.http.get('http://165.22.50.213:3000/getcontactinfo').subscribe(res => {
      this.contactinfo = res['data'];
      this.dtTrigger.next(void 0);
    });
  }

  updateInfo(contactinfo) {
    this.http.post('http://165.22.50.213:3000/editcontactinfo', contactinfo).subscribe(res => {
      this.message = res;
    });
    // window.location.reload();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/gsAboutUs'])
  }

  deleteInfo(contactinfo) {
    this.http.post('http://165.22.50.213:3000/deletecontactinfo', contactinfo).subscribe(res => {
      this.getContactInfo();
      this.message = res;
    });
    // window.location.reload();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/gsAboutUs'])
  }
  public adminid;
  public adminrole;
  findrole() {
    this.http.get('http://165.22.50.213:3000/getaadminuser/' + this.adminid).subscribe(res => {
      this.adminrole = res['data'][0].generalsetting;
      var x = this.adminrole.split('-');
      if (x[0] == '1') {//view
        $("[name='viewclass']").show();
      }
      if (x[1] == '1') {//edit
        $("[name='editclass']").show();
      }
      if (x[2] == '1') {//add
        $("[name='addclass']").show();
      }
      if (x[3] == '1') {//delete
        $("[name='deletclass']").show();
      }
      if (x[4] == '1') {//export
        $("[name='exportclass']").show();
      }

    });

  }
}
