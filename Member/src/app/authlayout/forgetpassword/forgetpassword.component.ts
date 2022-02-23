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
  
  constructor(private http: HttpClient,
    private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
  }

  public user = {
    email: '',
  }

  otpcode: any;
  email: any;
  inputotp: any;

  sendData(){
    this.openotpform(this.user);
  }
  
  openotpform(user:any) {
    this.http.post('http://165.22.50.213:3001/checkemail',this.user).subscribe((res:any) => {
         this.message =res;
        if(this.message['success']== false){
          alert("No email is found");
        }
        else{
          console.log(this.user.email)
          this.http.get('http://165.22.50.213:3001/getotp/'+ this.email).subscribe((res:any) => {
            this.otpcode = res['data'];
          });
          const vrurl = "/verification?id=" + this.user.email;
          console.log(vrurl)
          this.router.navigateByUrl(vrurl)
        }
    });
  }
}