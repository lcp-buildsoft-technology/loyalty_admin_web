import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Buffer } from 'buffer';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profileqr',
  templateUrl: './profileqr.component.html',
  styleUrls: ['./profileqr.component.scss']
})
export class ProfileqrComponent implements OnInit {
  message:any;
  registerArr = [];
  dataToString:any;
  public id: any;
  onregisterArr: string[] = []

  public register ={
    _id:'',
    name:'',
    tierlevel:'',
    pointscollect:'',
    pointsredeem:'',    
    createdat:'',
    username:'',
    codetype:''
  }

  public onregister: any = {
    _id: '',
    phonenumber: '',
    name: '',
    password: '',
    birthdate: '',
    tierlevel: '',
    pointscollect: '',
    pointsredeem: '',
    confirmpwd: '',
    email: '',
    username: '',
    thumbnail: '',
    address1: '',
    address2: '',
    address3: '',
    state: '',
    city: '',
    postcode: '',
    status: '',
    createdat: '',
    totalpoints: '',
    thumbnailType: ''
  }

  lol = [];
  public currentmemberid: any;
  
  constructor(private http: HttpClient, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getRegister();
  }

  getRegister() {
    this.http.get('http://165.22.50.213:3001/getregister').subscribe((res: any) => {
      this.lol = res['data'];
      var memberid = JSON.parse(localStorage.getItem('Memberlogin')!);
      this.currentmemberid = memberid[0]._id
      for (let i = 0; i < this.lol.length; i++) {
        if (this.currentmemberid == this.lol[i]['_id']) {
          this.registerArr[0] = this.lol[i];
        }
      }

      for (var i = 0; i < this.lol.length; i++) {
        console.log(this.lol[i]['_id']);
        if (this.lol[i]['_id'] == this.currentmemberid) {
          this.register = {
            _id: this.lol[i]['_id'],
            name: this.lol[i]['name'],
            username: this.lol[i]['username'],
            tierlevel: this.lol[i]['tierlevel'],
            pointscollect: this.lol[i]['pointscollect'],
            pointsredeem: this.lol[i]['pointsredeem'],
            createdat: this.lol[i]['createdat'],
            codetype: this.lol[i]['codetype']
          }
          this.dataToString = JSON.stringify(this.register);
          console.log(this.register)
        }
        else { }
      }
    });
  }

  acc(){    
    const purl = "/profile?id=" + this.registerArr[0]['_id'];
    console.log(purl)
    this.router.navigateByUrl(purl)
  }

}
