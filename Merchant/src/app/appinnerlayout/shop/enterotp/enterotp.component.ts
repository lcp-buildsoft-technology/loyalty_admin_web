import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-enterotp',
  templateUrl: './enterotp.component.html',
  styleUrls: ['./enterotp.component.scss']
})

export class EnterotpComponent implements OnInit {
 
  message: any;
  otp:any;
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

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

  public merchantuser = {
    email: '',
    pwd: '',
    cfmpwd: '',
  }

  email:any;
  otpcode:any;
  inputotp:any;
  inputotp1:any;
  inputotp2:any;
  inputotp3:any;
  inputotp4:any;
  inputotp5:any;
  inputotp6:any;

  startcheck(){
   console.log(this.email)
    this.http.get('http://165.22.50.213:3001/getotp/'+ this.email).subscribe((res:any) => {
      this.otpcode = res['data'];
      console.log(this.otpcode);
    });
  }

  cmpotp() 
  {
    this.inputotp =this.inputotp1 + this.inputotp2 +this.inputotp3 + this.inputotp4 + this.inputotp5 + this.inputotp6
    console.log(this.otpcode)
    if (this.otpcode == this.inputotp) {
      alert('Correct OTP! Click "OK" to proceed')
      const rpw = "/resetpassword?email=" + this.email;
      console.log(rpw)
      this.router.navigateByUrl(rpw)

    } else {
      alert('Invalid OTP! Please enter again')
    }
  }
}
