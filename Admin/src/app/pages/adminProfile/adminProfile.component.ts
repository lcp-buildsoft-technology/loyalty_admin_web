import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import tinymce from 'tinymce';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-adminProfile',
  templateUrl: './adminProfile.component.html',
  styleUrls: ['./adminProfile.component.scss']
})
export class AdminProfileComponent implements OnInit {

  message: any;
  admin: Object;
  searchAdmin: string = '';
  
  pwdPattern = "^(?=.*?[0-9])(?=.*?[a-z])[a-z0-9_-]{8,15}$";
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  contactPattern = "^[0][1][0-9]+-[0-9]{7,8}$";


  constructor(private modalService: NgbModal, private router:Router, private http: HttpClient, private cookieService: CookieService, private sessionSt: SessionStorageService) {

    this.srch = [...this.adminusers];
  }
  // public thisadmin = '6194b0ccb43af93e25102884';
  public thisadmin;
  adminusers = [];
  public srch = [];
  valid = [];
  error: number = 0;

  public sessionid;
  getSession() {
    this.sessionid = this.sessionSt.retrieve("_UUID");
    this.thisadmin = this.sessionid;

  }

  ngOnInit() {
    $(window).scrollTop(0);
    this.getSession();
    this.getAdmin();
    $("form").attr('autocomplete', 'off');
  }

  // open(content) {
  //   this.modalService.open(content, { scrollable: true }).result.then((result) => {
  //   });
  // }

  // openEdit(content, adminuser) {
  //   console.log(adminuser)
  //   this.editadminuser = {
  //     id: adminuser._id,
  //     name: adminuser.name,
  //     contact: adminuser.contact,
  //     email: adminuser.email,
  //     gender: adminuser.gender,
  //     pwd: adminuser.pwd,
  //     cfmpwd: adminuser.cfmpwd,
  //     status: adminuser.status,
  //   }

  //   this.modalService.open(content, { scrollable: true }).result.then((result) => {
  //   });
  // }

  public editadminuser = {
    id: '',
    name: '',
    contact: '',
    email: '',
    gender: '',
    pwd: '',
    cfmpwd: '',
    status: ''
  };


  getAdmin() {
    this.http.get('http://165.22.50.213:3000/getadminuser').subscribe(res => {
      this.adminusers = res['data'];
      for (let i = 0; i < this.adminusers.length; i++) {
        if (this.adminusers[i]._id == this.thisadmin) {
          this.editadminuser = {
            id: this.adminusers[i]._id,
            name: this.adminusers[i].name,
            contact: this.adminusers[i].contact,
            email: this.adminusers[i].email,
            gender: this.adminusers[i].gender,
            pwd: this.adminusers[i].pwd,
            cfmpwd: this.adminusers[i].cfmpwd,
            status: this.adminusers[i].status
          };
        }

      }
    });
  }
  updateAdmin(adminuser) {
    console.log(adminuser);
    this.error = 0;
    this.validation();
    if (this.error === 0) {
      this.http.post('http://165.22.50.213:3000/editadminuser', this.editadminuser).subscribe(res => {
        console.log(res);
        this.message = res;
        // window.location.reload();
      });

    }
  }

  validation() {
    if (this.editadminuser.name === '') {
      this.valid['name'] = "*Name is required!";
      this.error++;
    }
    else {
      this.valid['name'] = ""
    }
    if (this.editadminuser.contact === '') {
      this.valid['contact'] = "*Contact number is required!";
      this.error++;
    }
    
    else {
      this.valid['contact'] = ""
    }
    // if (this.editadminuser.pwd === '') {
    //   this.valid['pwd'] = "*Please enter the password!";
    //   this.error++;
    // }
    // else {
    //   this.valid['pwd'] = ""
    // }

    // if (this.editadminuser.cfmpwd === '') {
    //   this.valid['cfmpwd'] = "*Please enter the confirm password!";
    //   this.error++;
    // }
    // else if (this.editadminuser.cfmpwd != this.editadminuser.pwd) {
    //   this.valid['cfmpwd'] = "*Please enter the same password!";
    //   this.error++;
    // }
    // else {
    //   this.valid['cfmpwd'] = ""
    // }
  }
}