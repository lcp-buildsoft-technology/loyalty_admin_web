import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Buffer } from 'buffer';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  validErr = [];
  error: number = 0;
  message: any;
  otp: any;

  numPattern = "^[0][1][0-9]+[0-9]{7,8}$";
  emailPattern = "^[_a-z0-9-]+(\.[_a-z0-9-]+)@[a-z0-9-]+(\.[a-z0-9-]+)(\.[a-z]{2,})$";
  pwdPattern = "^(?=.*?[0-9])[a-z0-9_-]{8,15}$";
  codePattern = "^[0-9]{6}";

  imagesArr =[];
  public image: any;
  public images: any;
  public imagetype: any;
  public email: any;
  public otpcode: any;
  public inputotp: any;
  url=('../../../assets/img/blankimg.png');
  todayDate = ""; 

  public registerObj = {
    phonenumber:'', 
    name:'',
    password:'',
    birthdate:'',
    tierlevel:'',
    pointscollect:'',
    pointsredeem:'',
    confirmpwd:'',
    email:'',
    registerObjname:'',
    thumbnail:[],
    address1:'',
    address2:'',
    address3:'',
    state:'',
    city:'',
    postcode:'',
    status:'',
    createdat:'',
    codetype:'',
    totalpoints:'',
    verificationcode:''
  };

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {   
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1

    var day = "";
    var month = "";

    var yyyy = today.getFullYear();
    if (dd < 10) {
      day = '0' + dd.toString();
    } else {
      day = dd.toString();
    }
    if (mm < 10) {
      month = '0' + mm.toString();
    } else {
      month = mm.toString();
    }
    this.todayDate = yyyy + '-' + month + '-' + day; 
  }
  

  register(){
    this.error=0;
    this.validErr = this.validation();
    if(this.error === 0) {
      this.Register(this.registerObj);
    }
    this.router.navigate(['/getstarted']);
  }

  getDataApi(){
    this.http.get('http://165.22.50.213:3001/register').subscribe((res:any) =>{
        this.message = res;
    });
  }

  Register(registerObj:any){ 
    this.registerObj.createdat = this.todayDate;
    this.registerObj.status = 'Active';
    this.registerObj.tierlevel = 'Bronze';
    this.registerObj.codetype = 'profile'
    this.registerObj.pointscollect = '0';
    this.registerObj.pointsredeem = '0';
    this.registerObj.totalpoints = '0';
      this.http.post('http://165.22.50.213:3001/register', registerObj).subscribe((res:any) =>{
          this.message = res;
      });
  }

  openotpform(registerObj:any) {
    this.http.get('http://165.22.50.213:3001/getotp/'+ this.registerObj.email).subscribe((res:any) => {
      this.otpcode = res['data'];
      console.log(this.otpcode);
    });
  }
  
  validation(){
    //phonenumber
    if(this.registerObj.phonenumber === ''){
      this.validErr['phonenumber'] = "*phonenumber is required!";
      this.error++;
    }
    else if (!this.registerObj.phonenumber.match(this.numPattern) ) {
      this.error++;
    }
    else{
      this.validErr['phonenumber'] = ""
    }

    //email
    if(this.registerObj.email === ''){
      this.validErr['email'] = "*email is required!";
      this.error++;
    }
    else{
      this.validErr['email'] = ""
    }

    //password
    if(this.registerObj.password === ''){
      this.validErr['password'] = "*password is required!";
      this.error++;
    }
    else{
      this.validErr['password'] = ""
    }

    //confirm password
    if(this.registerObj.confirmpwd === ''){
      this.validErr['confirmpwd'] = "*password not match!";
      this.error++;
    }
    else{
      this.validErr['confirmpwd'] = ""
    }

    //verification code
    if(this.registerObj.verificationcode === ''){
      this.validErr['verificationcode'] = "*verificationcode is required!";
      this.error++;
    }
    else{
      this.validErr['verificationcode'] = ""
    }

    return this.validErr;
}
}