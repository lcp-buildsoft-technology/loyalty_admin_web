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
  selector: 'app-adminuser',
  templateUrl: './adminUser.component.html',
  styleUrls: ['./adminUser.component.scss'],

})

export class AdminUserComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  message: any;
  admin: Object;
  searchAdmin: string = '';

  pwdPattern = "^(?=.*?[0-9])(?=.*?[a-z])[a-z0-9_-]{8,15}$";
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  contactPattern = "^[0][1][0-9]+-[0-9]{7,8}$";


  constructor(private modalService: NgbModal, private router:Router,
    private http: HttpClient, private sessionSt: SessionStorageService) {
    this.srch = [...this.adminusers];
  }

  adminusers = [];
  public srch = [];
  valid = [];
  error: number = 0;

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
    this.getAdmin();
    this.getroledb();
    $("form").attr('autocomplete', 'off');
  }
  ngOnDestroy(): void {

    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  open(content) {
    this.modalService.open(content, { scrollable: true }).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
  }

  openEdit(content, adminuser) {
    if(this.thisedit){
    this.editadminuser = {
      id: adminuser._id,
      name: adminuser.name,
      contact: adminuser.contact,
      email: adminuser.email,
      gender: adminuser.gender,
      pwd: adminuser.pwd,
      status: adminuser.status,
      role: adminuser.role
    }
    $('#role [value=' + adminuser.role + ']').attr('selected', 'true');
    $('#status [value=' + adminuser.status + ']').attr('selected', 'true');

    this.modalService.open(content, { scrollable: true }).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
    }
    else{
      alert("You have no permission to edit admin user!")
    }
  }

  addEdit(content) {
    this.modalService.open(content, { scrollable: true }).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
  }

  public adminuser = {
    name: '',
    contact: '',
    email: '',
    gender: '',
    pwd: '',
    status: '',
    role: ''
  };

  public editadminuser = {
    id: '',
    name: '',
    contact: '',
    email: '',
    gender: '',
    pwd: '',
    status: '',
    role: ''
  }

  sendAdmin() {
    this.newAdmin(this.adminuser);
  }

  newAdmin(adminuser) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/adminUser'])
    this.http.post('http://165.22.50.213:3000/adminuser', adminuser).subscribe(res => {
      this.message = res;
    });
  }

  getAdmin() {
    this.http.get('http://165.22.50.213:3000/getadminuser').subscribe(res => {

      this.adminusers = res['data'];

      this.dtTrigger.next(void 0);
      $('#loader').hide();
      $('#loader-wrapper').hide();
      $('#loader-inner').hide();
      $('body').css("overflow-y", "visible");
    });
  }

  updateAdmin(adminuser) {
    this.error = 0;
    this.validation();
    if (this.error === 0) {
      this.http.post('http://165.22.50.213:3000/editadminuser', this.editadminuser).subscribe(res => {
        this.message = res;
      });
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/adminUser'])
    }
  }


  // --------------------- auto generate id ----------------------
  // public lastadminuserid;
  // public testarr;
  // arr = [];
  // padLeadingZeros(num, size) {
  //   var s = num + "";
  //   while (s.length < size) s = "0" + s;
  //   return s;
  // }
  // getLastAdminUser() {
  //   this.http.get('http://165.22.50.213:3000/getlastadminuser').subscribe(res => {
  //     this.lastadminuserid = res['data'][0].id;
  //     this.arr = this.lastadminuserid.toString().split('-');
  //     this.arr[1] = this.padLeadingZeros((parseInt(this.arr[1]) + 1), 5).toString();
  //     this.lastadminuserid = this.arr.join('-');
  //     this.adminuser.id = this.lastadminuserid;
  //   });
  // }
  // getBackId() {
  //   this.getLastAdminUser();
  // }

  validation() {
    if (this.editadminuser.name === '') {
      this.valid['name'] = "*Name is required!";
      this.error++;
    }
    else {
      this.valid['name'] = ""
    }

    if (this.editadminuser.contact === '') {
      this.valid['contact'] = "*Contact Number is required!";
      this.error++;
    }
    else {
      this.valid['contact'] = ""
    }

    if (this.editadminuser.email === '') {
      this.valid['email'] = "*Email is required!";
      this.error++;
    }
    else {
      this.valid['email'] = ""
    }

    if (this.editadminuser.gender === '') {
      this.valid['gender'] = "*Gender is required!";
      this.error++;
    }
    else {
      this.valid['gender'] = ""
    }
    if (this.editadminuser.role === '') {
      this.valid['role'] = "*User Role is required!";
      this.error++;
    }
    else {
      this.valid['role'] = ""
    }

    if (this.editadminuser.status === '') {
      this.valid['status'] = "*Status is required!";
      this.error++;
    }
    else {
      this.valid['status'] = ""
    }

  }

  public getallrole = [];
  getroledb() {
    this.http.get('http://165.22.50.213:3000/getrole').subscribe(res => {
      this.getallrole = res['data'];

    });
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
      this.adminrole = res['data'][0].user;
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
  checkedit(){
    if(this.thisedit){
      return true;
    }
    else{
      return false;
    }
  }
}