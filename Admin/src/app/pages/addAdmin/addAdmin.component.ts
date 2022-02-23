import { NgModule,Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-addAdmin',
  templateUrl: './addAdmin.component.html',
  styleUrls: ['./addAdmin.component.scss']
})
export class AddAdminComponent implements OnInit {

  message: any;
  admin: Object;
  searchAdmin: string = '';
  valid = [];
  error: number = 0;
  
  pwdPattern = "^(?=.*?[0-9])(?=.*?[a-z])[a-z0-9_-]{8,15}$";
  // emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  emailPattern = "^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$";
  contactPattern = "^[0][1][0-9]+-[0-9]{7,8}$";

  constructor(private modalService: NgbModal, private http: HttpClient, private fb: FormBuilder, private router:Router) {
    this.srch = [...this.adminusers];
  }

  adminusers = [];
  public srch = [];

  ngOnInit() {
    this.getAdmin();
    this.getroledb();

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
      name: adminuser.name,
      contact: adminuser.contact,
      email: adminuser.email,
      gender: adminuser.gender,
      pwd: adminuser.pwd,
      cfmpwd: adminuser.cfmpwd,
      status: adminuser.status,
      role: adminuser.role
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
    name: '',
    contact: '',
    email: '',
    gender: '',
    pwd: '',
    cfmpwd: '',
    status: '',
    role: ''
  };

  public editadminuser = {
    name: '',
    contact: '',
    email: '',
    gender: '',
    pwd: '',
    cfmpwd: '',
    status: '',
    role:''
  }

  sendAdmin() {
    this.error = 0;
    console.log(this.adminuser);
    this.validation()
    if (this.error === 0) {
      this.newAdmin(this.adminuser);
    }
  }

  newAdmin(adminuser) {
    adminuser.status = 'Active';
    console.log(adminuser);
    this.http.post('http://165.22.50.213:3000/adminuser', adminuser).subscribe(res => {
      console.log(res);
      this.message = res['msg'];
      if(this.message == 'DUP'){
        alert("Email already exist! Please try another one.")
      }
      else{
        // window.location.href = "/adminUser";
        this.router.navigate(['/adminUser'])
        // window.location.reload();
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/adminUser'])
      }
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
    this.http.post('http://165.22.50.213:3000/editadminuser', adminuser).subscribe(res => {
      console.log(res);
      this.message = res;
    });
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/adminUser'])
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
  //     // console.log(this.lastadminuserid.toString().split('-'));
  //     this.arr = this.lastadminuserid.toString().split('-');
  //     // console.log(this.arr);
  //     this.arr[1] = this.padLeadingZeros((parseInt(this.arr[1]) + 1), 5).toString();
  //     this.lastadminuserid = this.arr.join('-');
  //     console.log(this.lastadminuserid);
  //     this.adminuser.id = this.lastadminuserid;
  //   });
  // }
  // getBackId() {
  //   this.getLastAdminUser();
  // }
  
  public getallrole = [];
  getroledb(){
    this.http.get('http://165.22.50.213:3000/getrole').subscribe(res => {
      this.getallrole = res['data'];

    });
  }


  goBack() {
    window.history.back();
  }

  validation() {
    //name
    if (this.adminuser.name === '') {
      this.valid['name'] = "*Name is required!";
      this.error++;
    }
    else {
      this.valid['name'] = ""
    }

    //contact number
    if (this.adminuser.contact === '') {
      this.valid['contact'] = "*Contact number is required!";
      this.error++;
    }
    else if (!this.adminuser.contact.match(this.contactPattern) ) {
      this.error++;
    }
    else {
      this.valid['contact'] = ""
    }

    //email
    if (this.adminuser.email === '') {
      this.valid['email'] = "*Email is required!";
      this.error++;
    }
    else if (!this.adminuser.email.match(this.emailPattern) ) {
      this.error++;
    }
    else {
      this.valid['email'] = ""
    }

    //gender
    if (this.adminuser.gender === '') {
      this.valid['gender'] = "*Gender is required!";
      this.error++;
    }
    else {
      this.valid['gender'] = ""
    }

    //role
    if (this.adminuser.role === '') {
      this.valid['role'] = "*Admin role is required!";
      this.error++;
    }
    else {
      this.valid['role'] = ""
    }

    //password
    if (this.adminuser.pwd === '') {
      this.valid['pwd'] = "*Password is required!";
      this.error++;
    }
    else if (!this.adminuser.pwd.match(this.pwdPattern) ) {
      this.error++;
    }
    else {
      this.valid['pwd'] = ""
    }

    //confirm password1
    if (this.adminuser.cfmpwd === '') {
      this.valid['cfmpwd'] = "*Confirm password is required!";
      this.error++;
    }
    else if(this.adminuser.cfmpwd != this.adminuser.pwd){
      this.valid['cfmpwd'] = "*Please enter the same password!";
      this.error++;
    }
    else {
      this.valid['cfmpwd'] = ""
    }

  }


}
