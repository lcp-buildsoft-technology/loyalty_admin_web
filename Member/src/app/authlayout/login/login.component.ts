import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  message: any;
  validErr = [];
  error: number = 0;

  public registerObj = {
    phonenumber: '',
    password: ''
  };

  public memberlogin = {
    phonenumber: '',
    password: '',
  };

  numPattern = "^[0][1][0-9][0-9]{7,8}$";

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router

    // private socialAuthService: SocialAuthService
  ) { }

  ngOnInit(): void {
    
  }

  sendData() {
    this.login(this.memberlogin);
  }

  login(memberlogin: any) {
    this.http.post('http://165.22.50.213:3001/getlogin', memberlogin).subscribe((res: any) => {
      this.message = res;
      if (this.message['success'] == false) {
        alert("Please check your phonenumber and password");
      }
      else {
        localStorage.setItem("Memberlogin", JSON.stringify(res['data']));
        this.router.navigate(['/home']);
      }
    });
    this.error = 0;
    this.validErr = this.validation();
  }

  validation() {
    //phonenumber
    if (this.memberlogin.phonenumber === '') {
      this.validErr['phonenumber'] = "*phonenumber is required!";
      this.error++;
    }
    else if (!this.memberlogin.phonenumber.match(this.numPattern)) {
      this.error++;
    }
    else {
      this.validErr['phonenumber'] = ""
    }

    //password
    if (this.memberlogin.password === '') {
      this.validErr['password'] = "*password is required!";
      this.error++;
    }
    else {
      this.validErr['password'] = ""
    }

    return this.validErr;
  }

  // loginWithApple(): void {
  //   this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }
  // loginWithFacebook(): void {
  //   this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }
  // loginWithGoogle(): void {
  //   this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }

}
