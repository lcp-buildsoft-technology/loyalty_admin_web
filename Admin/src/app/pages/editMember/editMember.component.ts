import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editMember',
  templateUrl: './editMember.component.html',
  styleUrls: ['./editMember.component.scss']
})

export class EditMemberComponent implements OnInit {

  message: any;
  memberArr = [];
  mem: Object;
  public srch = [];
  public id;
  valid = [];
  errorcount: number = 0;

  passwordPattern = "^(?=.*?[0-9])[a-z0-9_-]{8,15}$";

  constructor(private modalService: NgbModal, private http: HttpClient, private router:Router) {
    this.srch = [...this.memberArr];
  }

  public editMember = {
    _id: '',
    name: '',
    username: '',
    thumbnail: '',
    phonenumber: '',
    email: '',
    birthdate: '',
    pointscollect: '',
    pointsredeem: '',
    tierlevel: '',
    pwd: '',
    cfmpwd: '',
    address1: '',
    address2: '',
    address3: '',
    state: '',
    city: '',
    postcode: '',
    status: '',
    createdat: ''
  }

  ngOnInit() {
    var url = document.URL;
    this.id = /id=([^&]+)/.exec(url)[1]
    this.getMember();
    $('#loader').show();
    $('body').css("overflow-y", "hidden");
  }

  pwdPattern = "^(?=.*?[0-9])(?=.*?[a-z])[a-z0-9_-]{8,15}$";
  uploadMember() {
    this.errorcount = 0;
    this.validation();
    if (this.errorcount === 0) {

    
        if (this.editMember.pwd != "" || this.editMember.cfmpwd != ""){
                //password
          if (this.editMember.pwd === '') {
            this.valid['pwd'] = "*Password is required!";
            this.errorcount++;
          }
          else if (!this.editMember.pwd.match(this.pwdPattern)) {
            this.errorcount++;
          }
          else {
            this.valid['pwd'] = "";
                  //confirm password
            if (this.editMember.cfmpwd === '') {
              this.valid['cfmpwd'] = "*Confirm password is required!";
              this.errorcount++;
            }
            else if (this.editMember.cfmpwd != this.editMember.pwd) {
              this.valid['cfmpwd'] = "*Please enter the same password!";
              this.errorcount++;
            }
            else {
              this.valid['cfmpwd'] = "";
              if (this.errorcount === 0) {
                this.http.post('http://165.22.50.213:3000/editmember', this.editMember).subscribe(res => {
                  console.log(res);
                  this.message = res;
                  // window.location.reload();
                  // window.location.href = "/memberData";
                  this.router.navigate(['/memberData'])
                });
              }
            }
          }
          }
          else{
            this.http.post('http://165.22.50.213:3000/editmember', this.editMember).subscribe(res => {
              console.log(res);
              this.message = res;
              // window.location.reload();
              // window.location.href = "/memberData";
              this.router.navigate(['/memberData'])
            });
        }
      }
  }

  // open(member) {
  //   this.editMember = {
  //     _id: member._id,
  //     name: member.name,
  //     username: member.username,
  //     thumbnail: member.thumbnail,
  //     phonenumber: member.phonenumber,
  //     email: member.email,
  //     birthdate: member.birthdate,
  //     pointscollect: member.pointscollect,
  //     pointsredeem: member.pointsredeem,
  //     tierlevel: member.tierlevel,
  //     password: member.password,
  //     confirmpwd: member.confirmpwd,
  //     address1: member.address1,
  //     address2: member.address2,
  //     address3: member.address3,
  //     state: member.state,
  //     city: member.city,
  //     postcode: member.postcode,
  //     status: member.status,
  //     createdat: member.createdat
  //   }
  // }

  getMember() {
    this.http.get('http://165.22.50.213:3000/getmember').subscribe(res => {
      this.memberArr = res['data'];
      for (var i = 0; i < this.memberArr.length; i++) {
        if (this.memberArr[i]._id == this.id) {
          this.editMember = {
            _id: this.memberArr[i]._id,
            username: this.memberArr[i].username,
            name: this.memberArr[i].name,
            thumbnail: "",
            phonenumber: this.memberArr[i].phonenumber,
            email: this.memberArr[i].email,
            birthdate: this.memberArr[i].birthdate,
            pointscollect: this.memberArr[i].pointscollect,
            pointsredeem: this.memberArr[i].pointsredeem,
            tierlevel: this.memberArr[i].tierlevel,
            pwd: "",
            cfmpwd: "",
            address1: this.memberArr[i].address1,
            address2: this.memberArr[i].address2,
            address3: this.memberArr[i].address3,
            state: this.memberArr[i].state,
            city: this.memberArr[i].city,
            postcode: this.memberArr[i].postcode,
            status: this.memberArr[i].status,
            createdat: this.memberArr[i].createdat
          }
        }
        $('#loader').hide();
        $('#loader-wrapper').hide();
        $('#loader-inner').hide();
        $('body').css("overflow-y", "visible");
      }
    });
  }

  goBack() {
    window.history.back();
  }

  validation() {
    //password
    // if(this.editMember.password === ''){
    //   this.valid['password'] = "*Please enter the password!";
    //   this.errorcount++;
    // }
    // else if (!this.editMember.password.match(this.passwordPattern) ) {
    //   this.errorcount++;
    // }
    // else{
    //   this.valid['password'] = ""
    // }

    // //confirm password
    // if(this.editMember.confirmpwd === ''){
    //   this.valid['confirmpwd'] = "*Please enter the confirm password!";
    //   this.errorcount++;
    // }
    // else if(this.editMember.confirmpwd != this.editMember.password){
    //   this.valid['confirmpwd'] = "*Please enter the same password!";
    //   this.errorcount++;
    // }
    // else{
    //   this.valid['confirmpwd'] = ""
    // }

    //status
    if (this.editMember.status === '') {
      this.valid['status'] = "*Status is required!";
      this.errorcount++;
    }
    else {
      this.valid['status'] = ""
    }

  }




}
