import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})

export class ForgetpasswordComponent implements OnInit {
  message:any;
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
  
  public merchantuser = {
    email: '',
  }
  otpcode:any;
  email:any;
  inputotp:any;
  sendData(){
    this.openotpform(this.merchantuser);
  }
  
  openotpform(merchantuser:any) {
    console.log(this.merchantuser)
    this.http.post('http://165.22.50.213:3001/checkemails' ,this.merchantuser).subscribe((res:any) => {
        console.log(res)
         this.message =res;
        if(this.message['success']== false){
          alert("No email is found");
        }
        else{
          console.log(this.merchantuser.email)
          this.http.get('http://165.22.50.213:3001/getotp').subscribe((res:any) => {
            this.otpcode = res['data'];
            console.log(this.otpcode);
          });
          const otp = "/enterotp?id=" + this.merchantuser.email;
          console.log(otp)
          this.router.navigateByUrl(otp)
        }
    });
  }
}
