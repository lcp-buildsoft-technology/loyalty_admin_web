import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var angular:any;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  message: any;

  mregisterArr = [];
  public srch =[];
  constructor(private modalService: NgbModal, private http: HttpClient) {
    this.srch = [...this.mregisterArr];
  }
  public mregister={

    email:'',
    password: '',
    cpassword:'',
  
     };

  ngOnInit(): void {
    var tooltiptriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltiptriggerList.map(function (e) {
      return new bootstrap.Tooltip(e)
    });
    

  }
  sendData(){
    this.registeruser(this.mregister);
  }

  registeruser(mregister:any){
    console.log(mregister);
   this.http.post('http://165.22.50.213:3001/addmregister', mregister).subscribe(res =>{
       console.log(res);
       this.message = res;
   });
}


}
