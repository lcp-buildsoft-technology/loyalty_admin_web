import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';

@Component({
  selector: 'app-enterotp',
  templateUrl: './enterotp.component.html',
  styleUrls: ['./enterotp.component.scss']
})
export class EnterotpComponent implements OnInit {

  message: any;
  otp: any;

  constructor(private http: HttpClient) { }

  // ngOnInit() {
  //   $('#otpform').hide();
  //   $('#newpwdform').hide();
  //   // $('#resetpwdform').hide();
  //   $("input").attr('autocomplete', 'off');
  //   $("form").attr('autocomplete', 'off');
  // }
  ngOnInit() {
    $("input").attr('autocomplete', 'off');
    $("form").attr('autocomplete', 'off');
    var url= document.URL;
    console.log(url)
    const myArray = url.split("=");
    this.email = myArray[1];
    console.log(this.otp);
    this.startcheck();
  }

  public user = {
    email: '',
    pwd: '',
    cfmpwd: '',
  }

  public email: any;
  public otpcode: any;
  public inputotp: any;

  // openotpform() {
  //   this.http.get('http://165.22.50.213:3001/checkemail/' + this.email).subscribe(res => {
        
  //     if ((res: any ['data']) => {
  //       this.startcheck((res: any ['data']) => {});
  //     }) {
  //       // this.startcheck((res: any ['data']) => {});
  //     // if (res['data']) {
  //     //   this.startcheck(res['data']);
  //     }
  //     else {
  //       alert('Invalid email! Please try again')
  //     }
  //   });
  // }

  // startcheck(arr: any){
  // // startcheck(arr){
  //   console.log(arr)
  //   $('#otpform').show();
  //   $('#resetpwdform').hide();
  //   $('#newpwdform').hide();

  //   this.http.get('http://165.22.50.213:3001/getotp/' + this.email).subscribe(res => {
  //     this.otpcode = (res: any ['data']) =>
  //     // this.otpcode = res['data']
  //     console.log(this.otpcode);
  //   });
  // }

  startcheck(){
    // console.log(arr)
    // $('#otpform').show();
    // $('#resetpwdform').hide();
    // $('#newpwdform').hide();
   console.log(this.email)
    this.http.get('http://165.22.50.213:3001/getotp/'+ this.email).subscribe((res:any) => {
      this.otpcode = res['data'];
      console.log(this.otpcode);
    });
  }

  resetotpform() {
    // $('#otpform').hide();
    // $('#resetpwdform').show();
    // $('#newpwdform').hide();
  }

  // cmpotp() {
  //   if (this.otpcode === this.inputotp) {
  //     alert('Correct OTP! Click "OK" to proceed')
  //     $('#otpform').hide();
  //     $('#resetpwdform').hide();
  //     $('#newpwdform').show();
  //   } else {
  //     alert('Invalid OTP! Please enter again')
  //   }
  // }

  cmpotp() {
    console.log(this.otpcode)
    if (this.otpcode == this.inputotp) {
      alert('Correct OTP! Click "OK" to proceed')
      window.location.href="/resetpw?email=" + this.email;
    } else {
      alert('Invalid OTP! Please enter again')
    }
  }

  resetPwd() {
    this.user.email = this.email;
    console.log(this.user.email)
    console.log(this.email)
    this.http.post('http://165.22.50.213:3001/resetpwd', this.user).subscribe(res => {
      console.log(res);
      this.message = res;
    });
    // window.location.reload();
  }

}
