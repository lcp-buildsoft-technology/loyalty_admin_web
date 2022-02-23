import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enterotp',
  templateUrl: './enterotp.component.html',
  styleUrls: ['./enterotp.component.scss']
})
export class EnterotpComponent implements OnInit {
  message: any;
  constructor(private http: HttpClient, private router:Router) { }

  ngOnInit() {
    $('#otpform').hide();
    $('#newpwdform').hide();
    $("input").attr('autocomplete', 'off');
    $("form").attr('autocomplete', 'off');
  }

  public adminuser = {
    email: '',
    pwd: '',
    cfmpwd: '',
  }

  public email;
  public otpcode;
  public inputotp;

  openotpform() {
    this.http.get('http://165.22.50.213:3000/checkemail/' + this.email).subscribe(res => {
        
      if (res['data']) {
        this.startcheck(res['data']);
      }
      else {
        alert('Invalid email! Please try again')
      }
    });
  }
  
  startcheck(arr){
    console.log(arr)
    $('#otpform').show();
    $('#resetpwdform').hide();
    $('#newpwdform').hide();

    this.http.get('http://165.22.50.213:3000/getotp/' + this.email).subscribe(res => {
      this.otpcode = res['data'];
      console.log(this.otpcode);
    });
  }

  resetotpform() {
    $('#otpform').hide();
    $('#resetpwdform').show();
    $('#newpwdform').hide();
  }

  cmpotp() {
    if (this.otpcode === this.inputotp) {
      alert('Correct OTP! Click "OK" to proceed')
      $('#otpform').hide();
      $('#resetpwdform').hide();
      $('#newpwdform').show();
    } else {
      alert('Invalid OTP! Please enter again')
    }
  }

  resetPwd() {
    this.adminuser.email = this.email;
    console.log(this.adminuser.email)
    console.log(this.email)
    this.http.post('http://165.22.50.213:3000/resetpwd', this.adminuser).subscribe(res => {
      console.log(res);
      this.message = res;
      // window.location.href = "/login";
      this.router.navigate(['/login'])
    });
    // window.location.reload();
  }


}


