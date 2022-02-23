import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {

  message: any;
  otp: any;

  constructor(private http: HttpClient, private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    $("input").attr('autocomplete', 'off');
    $("form").attr('autocomplete', 'off');
    var url= document.URL;
    const myArray = url.split("=");
    console.log( myArray[1])
    this.email = myArray[1];
    this.startcheck();
  }

  public user = {
    email: '',
    password: '',
    confirmpwd: '',
  }

  public email: any;
  public otpcode: any;
  public inputotp1: any;
  public inputotp2: any;
  public inputotp3: any;
  public inputotp4: any;
  public inputotp5: any;
  public inputotp6: any;


  startcheck(){
   console.log(this.email)
    this.http.get('http://165.22.50.213:3001/getotp/'+ this.email).subscribe((res:any) => {
      this.otpcode = res['data'];
      console.log(this.otpcode);
    });
  }
  inputcode:any;
  cmpotp() {
    this.inputcode = this.inputotp1 + this.inputotp2 + this.inputotp3 + this.inputotp4 + this.inputotp5 + this.inputotp6

    if (this.otpcode == this.inputcode) {
      alert('Correct OTP! Click "OK" to proceed')
      const rpwdurl = "/resetpw?email=" + this.email;
      console.log(rpwdurl)
      this.router.navigateByUrl(rpwdurl)
    } else {
      alert('Invalid OTP! Please enter again')
    }
  }

  resetPwd() {
    this.user.email = this.email;
    this.http.post('http://165.22.50.213:3001/resetpwd', this.user).subscribe(res => {
      this.message = res;
    });
  }

}
