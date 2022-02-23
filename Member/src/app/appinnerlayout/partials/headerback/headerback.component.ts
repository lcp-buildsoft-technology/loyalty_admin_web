import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-headerback',
  templateUrl: './headerback.component.html',
  styleUrls: ['./headerback.component.scss']
})
export class HeaderbackComponent implements OnInit {

  message:any;
  public id:any;
  registerArr = [];
    
  public register ={
    _id:'',
    phonenumber:'', 
    name:'',
    password:'',
    birthdate:'',
    tierlevel:'',
    pointscollect:'',
    pointsredeem:'',
    confirmpwd:'',
    email:'',
    username:'',
    thumbnail:'',
    address1:'',
    address2:'',
    address3:'',
    state:'',
    city:'',
    postcode:'',
    status:'',
    createdat:'',
    totalpoints:''
  }
  
  constructor(private http: HttpClient,) { }

  ngOnInit(): void {
    this.getRegister();

    var url= document.URL;
    // console.log(url)
    const myArray = url.split("=");
    this.id = myArray[1];
    // console.log(this.id);
  }

  lol = [];
  public currentmemberid: any;

  getRegister()
  {
    this.http.get('http://165.22.50.213:3001/getregister').subscribe((res:any) => 
    {
      this.lol = res['data'];
      var memberid = JSON.parse(localStorage.getItem('Memberlogin')!);
      this.currentmemberid = memberid[0]._id
      for (let i = 0; i < this.lol.length; i++) {
        if (this.currentmemberid == this.lol[i]['_id']) {
          this.registerArr[0] = this.lol[i];
        }
      }
    });
    // this.getremainingpoints();
    // this.getpointscollected();
  }

  backnav() {
    window.history.back();
    return false;
  }

  open(){    
    window.location.href="/profile?id=" + this.registerArr[0]['_id'];
  }


}
