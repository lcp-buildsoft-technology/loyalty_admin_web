import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  email:any
  message:any
  constructor(private modalService: NgbModal, private http: HttpClient) { }

  ngOnInit(): void {
    var tooltiptriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltiptriggerList.map(function (e) {
      return new bootstrap.Tooltip(e)
    });
    var url= document.URL;
    console.log(url)
    const myArray = url.split("=");
    this.email = myArray[1];
    console.log(this.email);
  }
  public merchantuser = {
    email: '',
    pwd: '',
    cfmpwd: '',
  }

sendData(){
 
 this.updatepassword(this.merchantuser)
 console.log(this.merchantuser.pwd)
 console.log(this.merchantuser.cfmpwd)
}

updatepassword(merchantuser:any){
  this.merchantuser.email = this.email;
  console.log(this.merchantuser.email)
  console.log(this.merchantuser.pwd)
  console.log(this.merchantuser.cfmpwd)
   if(this.merchantuser.pwd == this.merchantuser.cfmpwd){
    this.http.post('http://165.22.50.213:3001/resetpwd', this.merchantuser).subscribe(res => {
      console.log(res);
      this.message = res;
      if(this.message['success']== true){
        alert("Successfully changed");
        window.location.href="/signin"
      }
    });
   }
   else{
     alert("Pls check your password")
   }

}

}
