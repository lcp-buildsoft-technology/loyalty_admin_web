import { AfterViewInit, Component, OnInit, OnDestroy,ViewChild} from '@angular/core';
import * as $ from 'jquery';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import tinymce from 'tinymce';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from 'express';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-editProfile',
  templateUrl: './editProfile.component.html',
  styleUrls: ['./editProfile.component.scss']
})
export class EditProfileComponent implements OnInit {

  message: any;
  admin: Object;
  searchAdmin: string = '';
  constructor(private modalService: NgbModal, private http: HttpClient) {
    this.srch = [...this.adminusers];
  }

  adminusers = [];
  public srch = [];
  valid = [];
  error: number = 0;

  ngOnInit() {
    this.getAdmin();

    $("form").attr('autocomplete', 'off');
  }

  open(content) {
    this.modalService.open(content, { scrollable: true }).result.then((result) => {
    }, (reason)=>{ 
      /*Leave empty or handle reject*/
     });
  }

  openEdit(content, adminuser) {
    console.log(adminuser)
    this.editadminuser = {
      _id: adminuser._id,
      username: adminuser.username,
      name: adminuser.name,
      contact: adminuser.contact,
      email: adminuser.email,
      gender: adminuser.gender,
      pwd: adminuser.pwd,
      cfmpwd: adminuser.cfmpwd,
      status: adminuser.status,
    }
    
    $('#status [value=' + adminuser.status + ']').attr('selected', 'true');

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

  public adminuser = {
    _id: '6194b0ccb43af93e25102884',
    username: '',
    name: '',
    contact: '',
    email: '',
    gender: '',
    pwd: '',
    cfmpwd:'',
    status: ''
  };

  public editadminuser = {
    _id: '6194b0ccb43af93e25102884',
    username: '',
    name: '',
    contact: '',
    email: '',
    gender: '',
    pwd: '',
    cfmpwd:'',
    status: ''
  }

  sendAdmin() {
    this.newAdmin(this.adminuser);
  }

  newAdmin(adminuser) {
    window.location.reload();
    console.log(adminuser);
    this.http.post('http://165.22.50.213:3000/adminuser', adminuser).subscribe(res => {
      console.log(res);
      this.message = res;
    });
  }

  getAdmin() {
    this.http.get('http://165.22.50.213:3000/getadminuser').subscribe(res => {
      console.log(res);
      this.admin = res;
      console.log(this.admin);
      this.adminusers = res['data'];
    });
  }

  updateAdmin(adminuser) {
    console.log(adminuser);

    this.error=0;
    this.validation();
    if(this.error === 0){    
    this.http.post('http://165.22.50.213:3000/editadminuser', adminuser).subscribe(res => {
      console.log(res);
      this.message = res;0
    });
    window.location.reload();
  }
  }

  goBack(){
    window.history.back();
  }

  validation() {
    if (this.editadminuser.pwd === '') {
      this.valid['pwd'] = "*Please enter the password!";
      this.error++;
    }
    else {
      this.valid['pwd'] = ""
    }

    if (this.editadminuser.cfmpwd === '') {
      this.valid['cfmpwd'] = "*Please enter the confirm password!";
      this.error++;
    }
    else if(this.editadminuser.cfmpwd != this.editadminuser.pwd){
      this.valid['cfmpwd'] = "*Please enter the same password!";
      this.error++;
    }
    else {
      this.valid['cfmpwd'] = ""
    }
  }
}