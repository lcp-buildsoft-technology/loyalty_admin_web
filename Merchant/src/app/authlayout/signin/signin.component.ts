import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  message: any;
  merchantid:any;
  mloginArr = [];
  constructor(private modalService: NgbModal, private http: HttpClient, private router: Router, private route: ActivatedRoute)  { }
moutletarr=[]
  ngOnInit(): void {
    var tooltiptriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltiptriggerList.map(function (e:any) {
      return new bootstrap.Tooltip(e)
    });
  }
  public mlogin={

    email:'',
    pwd: '',
    merchantid:''
  
     };

  sendData(){
    this.loginuser(this.mlogin);
    console.log(this.mlogin)
  }
  loginuser(mlogin:any){
   this.http.post('http://165.22.50.213:3001/getmlogin', mlogin).subscribe((res:any) =>{
       console.log(res);
       console.log(res['data'])
        this.message = res
        if(this.message['success']== false){
          alert("Please check your email and password");
        }
       this.mlogin.email = res['data'][0]['email']
       this.mlogin.pwd = res['data'][0]['pwd']
       this.mlogin.merchantid = res['data'][0]['merchantid']
       console.log(res['data'][0]['merchantid'])

       if(this.message['success']== false){
         alert("Please check your email and password");
       }
       else{
        localStorage.setItem("Mlogin", JSON.stringify(this.mlogin));
   

        this.http.post('http://165.22.50.213:3001/getmoutlet',this.mlogin).subscribe((res:any) => {
          console.log(res)
          this.moutletarr = res['data'] ;
          console.log(this.moutletarr)
          var x =this.moutletarr[0]
          if(res['data'].length == 0){
            this.router.navigate(['/addfirstoutlet'])
          }
         else{
          localStorage.setItem("Moutlet", JSON.stringify(x));
          this.router.navigate(['/home'])
         }
          
        });
        
       }
   });
}



}
