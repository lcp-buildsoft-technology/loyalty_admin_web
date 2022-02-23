import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resetpw',
  templateUrl: './resetpw.component.html',
  styleUrls: ['./resetpw.component.scss']
})
export class ResetpwComponent implements OnInit {

  email:any
  message:any

  constructor(private http: HttpClient, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    var url= document.URL;
    const myArray = url.split("=");
    this.email = myArray[1];
  }

  public user = {
    email: '',
    password: '',
    confirmpwd: '',
  }

  sendData99(){
    this.updatepassword(this.user)
  }

  updatepassword(user:any){
    this.user.email = this.email;
     if(this.user.password == this.user.confirmpwd){
      this.http.post('http://165.22.50.213:3001/resetpassword', this.user).subscribe(res => {
        this.message = res;
        if(this.message['success']== true){
          alert("Successfully changed");
          this.router.navigate(['/login']);
        }
        
      });
     }
     else{
       alert("Pls check your password")
     }
  
  }

}
