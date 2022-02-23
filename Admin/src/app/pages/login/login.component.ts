import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { CookieService  } from 'ngx-cookie';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  success: boolean
  constructor(private http: HttpClient, private cookieService: CookieService, private sessionSt: SessionStorageService, private router:Router) {
    
   }
  public user = {
    email: '',
    password: ''
  }

  ngOnInit() {
    $("form").attr('autocomplete', 'off');
  }
  public loginsessionid;
  login() {
    this.http.post('http://165.22.50.213:3000/testlogin', this.user).subscribe(res => {
      console.log(res);
      this.success = res['success'];
      
      if (this.success == true) {
        this.loginsessionid = res['data']._id;
        this.setCookies();
        this.setSession();
        alert("Login success");
        // window.location.href = "/dashboard";
        this.router.navigate(['/dashboard'])
      }
      
      else {
        alert("Login failed! Invalid email or password or user does not exist.");
      }
    });
  }
  setCookies(){
    this.cookieService.put('_gf', this.loginsessionid);
    
  }
  getCookies(){
    alert(this.cookieService.get("_gf"));
  }
  delCookies(){
    this.cookieService.remove("_gf");
  }
  

  setSession(){
    this.sessionSt.store('_UUID', this.loginsessionid);
    
  }
  getSession(){
    alert(this.sessionSt.retrieve("_UUID"));
  }
  delSession(){
    this.sessionSt.clear("_UUID");
  }

  otp()
  {
    this.router.navigate(['/enterotp'])
  }


  // onLogin(loginForm: NgForm) {
  //   console.log(loginForm.value);
  //   const token = this.authService.authUser(loginForm.value);
  //   if (token) {
  //     localStorage.setItem('token', token.email)
  //     alert("Login success");
  //       window.location.href = "#/dashboard";
  //   } else {
  //     alert("Login Failed");
  //   }
  // }

}
